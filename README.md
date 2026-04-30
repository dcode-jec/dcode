# DCODE - Jorhat Engineering College Coding Club

The official web platform for **DCODE**, the coding community of Jorhat Engineering College. Built with a premium, terminal-inspired aesthetic focusing on technical excellence and community engagement.

---

## 🚀 Key Features

- **Terminal-Style UI**: Navigation headers, command-line filters (`--filter`), and cursor-blink animations for an authentic developer experience.
- **Glassmorphism Design**: High-end visual aesthetic with depth, blur effects, and smooth Framer Motion transitions.
- **Event Archive System**: A comprehensive "Previous Events" repository showcasing past flagship contests like *Mind Maze*, *Code Clash*, and *Hackvita*.
- **Full Team Directory**: Dynamic mapping of faculty, core leads, and multiple departments (Technical, Management, PR, Design) with integrated social connectivity.
- **Production-Ready Contact System**: Secure lead generation powered by EmailJS integration.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Theme)
- **Animations**: Framer Motion
- **Icons**: Google Material Symbols & FontAwesome 6
- **Deployment**: GitHub Pages (`gh-pages`)
- **API**: EmailJS (@emailjs/browser)

---

## 📈 Recent Major Updates (Session 2025-26)

### 🗓 Events System Refinement
- **Rebranding**: Transitioned from a "System Events" model to a retrospective "Previous Events" archival system.
- **Asset Integration**: Full integration of `Mind Maze 3.0` assets and archival data.
- **Logic Overhaul**: Implemented dynamic flagging (Flagship vs. Regular) and removed interactive registration elements for past logs.

### 👥 Team Directory Expansion
- **Member Mapping**: Populated 30+ team members with accurate roles, specific social media profiles (Instagram, LinkedIn), and institutional emails.
- **Structural Updates**: Refined the hierarchy to include Faculty-in-Charge and Founder sections with dedicated profiles.

### 🔌 System Integrations
- **EmailJS Configuration**: Successfully linked production service keys for the Contact Page, enabling real-time communication.
- **UI Optimization**: Enhanced Footer alignment, enlarged institutional branding, and implemented `target="_blank"` security protocols for all external links.

---

## 💻 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/tasdeequeruhani/dcode_official_developer_hub.git

# Install dependencies
npm install
```

### Development
```bash
# Start development server with HMR
npm run dev
```

### Deployment
The project is configured for automated deployment to GitHub Pages.
```bash
# Build and publish to gh-pages branch
npm run deploy
```

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/       # Media assets (Team, Gallery, Events)
│   ├── components/   # Modular UI elements (Navbar, Footer, Hero)
│   ├── pages/        # Main route pages (Home, Team, Events, Gallery, Contact)
│   ├── App.jsx       # Routing & Theme management
│   └── index.css     # Global styles & Tailwind layers
├── index.html        # Main entry point
└── vite.config.js    # Build & Deployment configuration
```

---

## 📜 License

This project is the property of **DCODE - JEC**. All rights reserved.
Built with love and code by **Tasdeeque Ruhani** and the DCODE Team.
