# Intensive Solution Bank: Month 4 (Weeks 13-14)

This document contains the ultra-detailed reference solutions for the final month of Saisha's intensive curriculum, focusing on Professional Workflows.

---

## Week 13: Version Control (Git & GitHub)

### Day 1: Repository Management
#### 1. Initialize a repository (git init)
- **Action**: Run `git init` in the project root.
- **Expected Outcome**: A hidden `.git` folder is created, and the directory is now a Git repo.
```bash
git init
```

#### 2. Stage and commit changes (add, commit)
- **Action**: Stage files and commit with a message.
- **Expected Outcome**: Changes are tracked in the local history.
```bash
git add .
git commit -m "initial commit: project structure"
```

### Week 14: Deployment & Final Launch

#### Day 2: Cloud Deployment (Vercel)
1. **Connect GitHub to Vercel and deploy live**
   - **Action**: In Vercel, click "New Project" -> "Import" your GitHub repo.
   - **Expected Outcome**: Vercel detects the framework, builds the app, and provides a public `.vercel.app` URL.

#### Day 4: Project Polish & SEO
1. **Set up custom names and verify responsiveness**
   - **Action**: Add `<meta>` description tag to `index.html`.
   - **Expected Outcome**: Search engines and social shares show the correct product description.
```html
<meta name="description" content="Saisha's Professional Product Portfolio">
```
