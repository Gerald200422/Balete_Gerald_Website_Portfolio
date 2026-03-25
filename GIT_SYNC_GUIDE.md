# 🚀 Portfolio Sync Guide (Multi-Account Workflow)

This document contains the step-by-step commands to keep your **Gerald200422** and **chalisterrald** repositories in sync.

---

## 🏗️ Phase 1: Saving Your Work
After you finish editing your code in VS Code, run these commands to save it to your development branch.

```bash
# 1. Stage all your changes
git add .

# 2. Save the changes with a descriptive message
git commit -m "feat: updated projects and fixed modal sizing"

# 3. Push to your main dev branch (Gerald200422 account)
git push origin gerald
```

---

## 🔄 Phase 2: Merging to Main
Now that your dev branch is safe, merge it into your local `main` branch.

```bash
# 1. Switch to your local main branch
git checkout main

# 2. (Optional) Ensure your local main is up to date with GitHub
git pull origin main

# 3. Merge your gerald branch into main
git merge gerald
```

---

## 🌐 Phase 3: Pushing to Primary Account
Update your main GitHub repository (**Gerald200422**).

```bash
# Push the newly merged code to your main account
git push origin main
```

---

## 🚀 Phase 4: Updating Vercel (Chalisterrald Account)
This is the final step that triggers your live website update on Vercel.

```bash
# Push your local 'main' branch to the 'chalisterrald' branch on your second repo
git push second main:chalisterrald -f
```

---

## 📝 Key Reference (Cheat Sheet)

| Remote Name | Account | Target Branch | Purpose |
| :--- | :--- | :--- | :--- |
| `origin` | **Gerald200422** | `gerald` or `main` | Primary Repository / Storage |
| `second` | **chalisterrald** | `chalisterrald` | Vercel Deployment Trigger |

### Common Troubleshooting
*   **"Permission Denied"**: Check that you added your SSH keys to BOTH accounts in GitHub Settings.
*   **"Everything up-to-date"**: Make sure you have committed your changes before trying to push.
*   **"Rejected / Behind"**: Always run `git pull origin main` before starting your merge.

---
*Created for Gerald Balete Portfolio - March 2026*
