# Personal Portfolio Website

A modern, responsive, high-performance personal portfolio website built with HTML5, CSS3, and JavaScript.

## 🚀 Live Preview / How to Run

1. Simply double-click `index.html` to open it in your default browser (Chrome, Edge, Firefox, Brave, Safari).
2. Or use VS Code with the **Live Server** extension, or run a simple local HTTP server:
   ```bash
   # In PowerShell / Command Prompt inside the portfolio folder:
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your browser.

---

## ✨ Features

- 🌓 **Dark & Light Mode**: Seamless theme toggle with persistence in `localStorage` and system preference detection.
- ⌨️ **Dynamic Typewriter Effect**: Rotating job titles in the hero greeting.
- 📱 **Fully Responsive Layout**: Designed for mobile, tablet, laptop, and ultra-wide screens.
- 🍔 **Mobile Drawer Menu**: Smooth hamburger navigation on smaller screens.
- 📊 **Animated Skill Progress Bars**: Automatically animate into view as you scroll down.
- 🔢 **Animated Stat Counters**: Smooth counting animations for years of experience, projects, etc.
- 🔍 **Interactive Project Filtering**: Instant filtering by category (All, Full Stack, Frontend, UI/UX).
- 🪟 **Project Detail Modal**: Click "Quick View" to inspect project details, tech tags, and links.
- ✉️ **Working Contact Form**: Client-side validation, error cues, and simulated submission feedback.
- 🚀 **Zero External Dependencies**: Fast load times with pure native HTML, CSS, and vanilla JS.

---

## 🛠️ How to Customize

### 1. Change Your Name, Bio & Social Links
Open `index.html`:
- Replace `Alex Morgan` with your actual name.
- Update the `<title>` tag and meta description in `<head>`.
- In the `<section id="hero">`, edit your bio paragraph and social links (`href="https://github.com/yourusername"`).
- In `script.js`, edit the `roles` array to customize your titles:
  ```js
  const roles = [
    'Full Stack Developer',
    'Frontend Specialist',
    'UI/UX Enthusiast',
    'Creative Problem Solver'
  ];
  ```

### 2. Update Your Skills
In `index.html` under `<section id="skills">`:
- Modify skill names, percentages, and progress bar widths (`data-width="95%"`).
- Add or remove tags in the tech badges cloud.

### 3. Add or Edit Projects
In `index.html` under `<section id="projects">`:
- Duplicate or edit the `<article class="project-card">` elements.
- Set `data-category="fullstack"`, `frontend`, or `uiux`.
- Update project title, description, tags, demo URL, and GitHub repository URL.

### 4. Update Experience & Timeline
In `index.html` under `<section id="experience">`:
- Edit company names, job titles, years, and milestone descriptions.

### 5. Connect Your Contact Form to Real Emails
To receive real emails from visitors, you can integrate [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 🌐 Deploy to the Web (Free)

### Option 1: GitHub Pages
1. Create a new repository on GitHub named `portfolio` (or `<your-username>.github.io`).
2. Push your files (`index.html`, `style.css`, `script.js`) to the repository.
3. Go to **Settings > Pages > Branch: main > Save**.
4. Your site will be live at `https://<your-username>.github.io/portfolio`.

### Option 2: Vercel / Netlify
1. Drag and drop the `portfolio` folder onto [Netlify Drop](https://app.netlify.com/drop) or import into [Vercel](https://vercel.com).
2. Get a free SSL-secured `.vercel.app` or `.netlify.app` URL instantly.
