import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Octahedron, PerspectiveCamera, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveShapes = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const { pointer, viewport } = useThree();

    useFrame(() => {
        // Smooth parallax effect based on mouse hover
        const targetX = (pointer.x * viewport.width) / 10;
        const targetY = (pointer.y * viewport.height) / 10;

        // Use lerp for smooth follow
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    });

    // Premium frosted glass material properties
    const glassMaterialProps = {
        thickness: 0.5,
        roughness: 0.4,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transmission: 0.9,
        ior: 1.2,
        transparent: true,
        opacity: 0.8,
    };

    return (
        <group ref={groupRef}>
            <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1} position={[-2.5, 1, -3]}>
                <Icosahedron args={[1.2, 0]}>
                    <MeshTransmissionMaterial {...glassMaterialProps} color="#ffffff" />
                </Icosahedron>
            </Float>

            <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={[3, -1.5, -5]}>
                <Torus args={[1, 0.3, 16, 32]}>
                    <MeshTransmissionMaterial {...glassMaterialProps} color="#e2e8f0" />
                </Torus>
            </Float>

            <Float speed={3} rotationIntensity={0.8} floatIntensity={1.2} position={[1, 2, -6]}>
                <Octahedron args={[1.5, 0]}>
                    <MeshTransmissionMaterial {...glassMaterialProps} color="#f8fafc" />
                </Octahedron>
            </Float>
        </group>
    );
};

const SubtleGrid: React.FC<{ count?: number }> = ({ count = 2000 }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
        }
        return p;
    }, [count]);

    const mesh = useRef<THREE.Points>(null!);
    const { pointer } = useThree();

    useFrame((state) => {
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        // Subtle interaction with particles
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.y * 0.1, 0.05);
        mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, pointer.x * 0.1, 0.05);
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.015} color="#94a3b8" transparent opacity={0.3} sizeAttenuation={true} />
        </points>
    );
};

const Background3D: React.FC = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas eventSource={document.getElementById('root') || undefined} eventPrefix="client">
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
                <InteractiveShapes />
                <SubtleGrid />
            </Canvas>
        </div>
    );
};

export default Background3D;
