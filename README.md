# FreelanceHub 🚀

> **A trusted freelance marketplace connecting innovative teams with verified engineers, designers, and specialists under 100% protected milestone escrows.**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![Escrow](https://img.shields.io/badge/Escrow-100%25%20Guaranteed-indigo?style=flat-square)](#-milestone-escrow-security)

---

## 🌟 Overview

**FreelanceHub** is a modern freelance platform designed to eliminate payment disputes and high agency markups. With upfront milestone deposits, transparent low fees, and real-time collaboration, FreelanceHub empowers independent talent and ambitious businesses to build together with complete confidence.

---

## ✨ Key Features

### 🛡️ 100% Milestone Escrow Security
- Clients deposit project funds into an encrypted escrow before work commences.
- Freelancers deliver work with zero payment uncertainty.
- Funds are only unlocked upon explicit milestone review and client satisfaction.

### 💳 Transparent, Predictable Pricing
- **Starter Plan (Free)**: Flat 5% escrow fee, unlimited proposals, standard 48-hour payouts.
- **Professional ($24/mo)**: Reduced 3% platform fee, Verified Talent profile boost, priority 24-hour withdrawals.
- **Enterprise ($79/mo)**: Custom 1.5% rate, instant automated milestone payouts, dedicated talent concierge, and custom MSA contracts.

### 🔄 Simple & Transparent 4-Step Process
All four core workflow steps enclosed in a single unified process box:
1. **Post a Project or Send a Proposal**: Define deliverables, milestone budgets, and timelines.
2. **Fund Secure Milestones**: Upfront deposits held safely in escrow.
3. **Collaborate & Iterate**: Unified communications, asset exchange, and draft reviews.
4. **Approve Deliverables & Release Payout**: Instant release with mutual 5-star ratings.

### 📱 Interactive Direct Inquiries Chassis
- Styled with a realistic modern mobile device frame with responsive hardware buttons, dynamic island, and direct inquiry messaging.

### 🤖 Floating AI Chatbot Concierge
- Integrated floating action assistant in the bottom-right corner.
- Provides instant answers regarding escrow mechanics, subscription tiers, platform fee structures, and project posting.
- Features quick-prompt inquiry pills, animated typing indicators, and conversation resets.

### 👥 Seamless Multi-Role Experience
- Switch fluidly between **Client Persona** (post jobs, fund milestones, review deliverables) and **Freelancer Persona** (browse projects, send proposals, track earnings).

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism & dark theme design system
- **Iconography**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`AuthContext`, `JobContext`)

---

## 📂 Project Structure

```text
freelance-hub/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AIChatbot.jsx       # Floating AI Concierge widget
│   │   ├── AuthModal.jsx       # Authentication modal
│   │   ├── ContactSection.jsx  # Interactive smartphone contact form
│   │   ├── FAQSection.jsx      # Accordion FAQ with emerald branding
│   │   ├── HeroBanner.jsx      # Dynamic gradient hero banner
│   │   ├── HowItWorks.jsx      # Unified 4-step workflow box
│   │   ├── JobCard.jsx         # Project opening card
│   │   ├── Navbar.jsx          # Glassmorphism navigation
│   │   ├── PostJobModal.jsx    # Project creation modal
│   │   ├── PricingSection.jsx  # Tiered subscription plans
│   │   ├── ProposalModal.jsx   # Freelancer bid submission
│   │   └── UserProfileCard.jsx # Verified profile viewer
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx     # User authentication & role state
│   │   └── JobContext.jsx      # Job listings & proposals state
│   ├── App.jsx             # Main application container
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global typography & Tailwind directives
├── .env.example            # Environment variable template
├── .gitignore              # Ignored files (protects .env secrets)
└── package.json            # Dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShivamChaturvedi54/Freelance-hub.git
   cd Freelance-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```
   Add your API keys to `.env` (note: `.env` is ignored by Git to keep your keys safe):
   ```env
   VITE_API_KEY=your_api_key_here
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔒 Security & Privacy

- All sensitive credentials and API tokens are kept strictly in local `.env` files.
- The `.gitignore` configuration prevents any environment files (`.env`, `.env.*`) from ever being committed or exposed on public repositories.

---

## 📄 License

This project is licensed under the MIT License.
