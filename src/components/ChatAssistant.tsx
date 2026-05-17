import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

// Resume context to inject into the AI's system prompt
const RESUME_CONTEXT = `
You are Gerald Balete's personal AI Assistant embedded in his portfolio website.
Your only job is to answer questions about Gerald's resume, experience, skills, and projects. 
Always be polite, professional, and concise. Do not answer questions unrelated to Gerald.

Here is Gerald's background:
- Current roles at Inspire Next Global Inc. (Jan 2026 to Present, BGC, Taguig, Philippines):
  1. Software Developer (Intern): Architected the transition to Version 2.0 of Loopwork platform, focusing on UI/UX of the landing page and dashboard for 16 integrated multitasking tools.
  2. Quality Assurance (QA): Tested Loopwork Version 2.0 using 17+ tools adhering to ISO Standard Software Testing protocols.
  3. Junior Sales Associate (Part-time): Generated 230+ qualified sales leads.
- Certifications: Python Essential 1 & 2 (Cisco), Excel Pro (Microsoft), C# (Sololearn), Understanding WEB 3.0 (DICT Caraga).
- Skills: Modern Web Development, UI/UX, React, JavaScript/TypeScript, Quality Assurance, Sales.
- Awards: First Place C# Software Developer (IT Olympics 2024), Outstanding Programmer (STI College), First Place Python Developer (IT Olympics 2023).
- Projects: Focus on clean, scalable web applications with smooth animations.

If someone asks for contact info, you MUST reply EXACTLY with this phrase and nothing else: "CONTACT_FALLBACK"

CRITICAL RULE: If the user uses ANY bad words, profanity, insults, or inappropriate language in ANY language, you MUST immediately refuse to answer and reply EXACTLY with: "Warning: The use of inappropriate or profane language is a violation of our professional guidelines. Please maintain professionalism."

FORMATTING RULE: DO NOT use markdown formatting, bolding, or asterisks in your responses. Provide plain text only.
`;

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm Gerald's AI assistant. Ask me anything about his experience, skills, or resume!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ENGAGEMENT_LABELS = [
    "What are Gerald's skills? 🚀",
    "What is Gerald's experience? 💼",
    "What are Gerald's top projects? 💻",
    "What is Gerald's educational training? 🎓",
    "What awards has Gerald won? 🏆",
    "What is Gerald's contact info? 📬"
  ];
  const [labelIndex, setLabelIndex] = useState(0);

  // Randomly select 3 questions on component mount so the user isn't bombarded
  const suggestedQuestions = React.useMemo(() => {
    return [...ENGAGEMENT_LABELS].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % ENGAGEMENT_LABELS.length);
    }, 5000); // Change label every 5 seconds
    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (forcedInput?: string) => {
    const textToSend = forcedInput || input;
    if (!textToSend.trim() || isLoading) return;

    // Stop any ongoing read aloud when sending a new message
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const userMessage = textToSend.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    if (!forcedInput) setInput('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "ERROR_FALLBACK" 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Free forever tier API call using standard fetch
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: RESUME_CONTEXT }]
          },
          contents: [
            // Filter out the initial greeting to avoid role sequence errors (user -> model)
            ...messages
              .filter(m => m.content !== "Hi! I'm Gerald's AI assistant. Ask me anything about his experience, skills, or resume!")
              .map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content === "ERROR_FALLBACK" ? "I encountered a technical error." : m.content === "CONTACT_FALLBACK" ? "You can reach him via the Contact section on this website." : m.content }]
              })),
            { role: 'user', parts: [{ text: userMessage }] }
          ]
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Gemini API Error:", errData);
        throw new Error(errData.error?.message || 'API Error');
      }

      const data = await response.json();
      
      let botReply = "Sorry, I couldn't process that request.";
      if (data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason === 'SAFETY') {
        botReply = "Warning: The use of inappropriate or profane language is a violation of our professional guidelines. Please maintain professionalism.";
      } else if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        botReply = data.candidates[0].content.parts[0].text.replace(/\*/g, ''); // Strip all markdown asterisks
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);

      // Read aloud the AI response (skip if it's an error)
      if ('speechSynthesis' in window && botReply !== "ERROR_FALLBACK") {
        window.speechSynthesis.cancel(); // Stop any previous speech
        const textToSpeak = botReply === "CONTACT_FALLBACK" ? "You can reach him via the Contact section on this website." : botReply;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: "ERROR_FALLBACK" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button Container */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        pointerEvents: isOpen ? 'none' : 'auto',
      }}>
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), #004d99)',
            color: 'white',
            border: 'none',
            boxShadow: '0 10px 25px rgba(0, 102, 204, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <MessageCircle size={28} />
          </motion.div>
        </motion.button>

        {/* Animated Engagement Label */}
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key={labelIndex}
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              style={{
                background: 'white',
                padding: '0.8rem 1.2rem',
                borderRadius: '20px',
                borderBottomLeftRadius: '4px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.05)',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setIsOpen(true)}
            >
              {ENGAGEMENT_LABELS[labelIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '2rem',
              width: '350px',
              height: '500px',
              maxWidth: 'calc(100vw - 4rem)',
              maxHeight: 'calc(100vh - 4rem)',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '24px',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 100,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.2rem',
              background: 'linear-gradient(135deg, var(--primary), #004d99)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>AI Assistant</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Ask about my resume</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  opacity: 0.8,
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  gap: '0.5rem',
                  alignItems: 'flex-end'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: msg.role === 'user' ? 'var(--bg-main)' : 'var(--primary)',
                    color: msg.role === 'user' ? 'var(--text-main)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div style={{
                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                    padding: '0.8rem 1rem',
                    borderRadius: '16px',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                    maxWidth: '80%',
                    fontSize: '0.95rem',
                    lineHeight: 1.4,
                    boxShadow: msg.role === 'user' ? '0 4px 15px rgba(0, 102, 204, 0.2)' : 'none'
                  }}>
                    {msg.content === "ERROR_FALLBACK" ? (
                      <span>
                        We are currently facing issues right now. We will get back to you soon. Thank you for your patience, or message directly to <a href="#contact" style={{ color: '#0066cc', textDecoration: 'underline', fontWeight: 500 }}>Gerald</a> under contact.
                      </span>
                    ) : msg.content === "CONTACT_FALLBACK" ? (
                      <span>
                        You can reach him via the <a href="#contact" onClick={() => setIsOpen(false)} style={{ color: '#0066cc', textDecoration: 'underline', fontWeight: 500 }}>Contact section</a> on this website.
                      </span>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={16} color="white" />
                  </div>
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.05)', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '0.9rem', color: 'var(--text-muted)' }}
                  >
                    Typing...
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid rgba(0,0,0,0.05)',
              background: 'rgba(255,255,255,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {suggestedQuestions.map((label, idx) => {
                    // Strip emojis for the actual question text
                    const cleanLabel = label.replace(/[👋🚀💼💻🎓🏆📬]/g, '').trim();
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSend(cleanLabel)}
                        style={{
                          background: 'rgba(0, 102, 204, 0.1)',
                          color: 'var(--primary)',
                          border: '1px solid rgba(0, 102, 204, 0.2)',
                          borderRadius: '16px',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(0, 102, 204, 0.1)'; e.currentTarget.style.color = 'var(--primary)'; }}
                      >
                        {cleanLabel}
                      </button>
                    )
                  })}
                </div>
              )}

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  background: 'white',
                  padding: '0.4rem',
                  borderRadius: '24px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my resume..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    fontSize: '0.95rem',
                    color: 'var(--text-main)'
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    background: input.trim() ? 'var(--primary)' : 'var(--bg-main)',
                    color: input.trim() ? 'white' : 'var(--text-muted)',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'all 0.3s',
                    transform: input.trim() ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <Send size={18} style={{ marginLeft: '2px' }} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
