<h1 align="center">🧠 InfraMind Frontend</h1>

<p align="center">
  <em>The modern, high-performance user interface for the InfraMind platform.</em>
</p>

---

## 📖 About The Project

**InfraMind Frontend** is the client-side application for the InfraMind ecosystem. It is designed with a focus on speed, scalability, and a seamless developer-to-user experience. 

Built on top of a modern JavaScript tooling ecosystem, this project utilizes a lightning-fast build tool, utility-first CSS for rapid styling, and a modular component architecture to deliver a highly interactive and responsive web interface.

## ✨ Key Features

* **Lightning-Fast HMR & Builds:** Powered by Vite, ensuring instant server starts and ultra-fast hot module replacement during development.
* **Utility-First Styling:** Beautiful, responsive, and maintainable styles built entirely with Tailwind CSS.
* **Modular UI Components:** Integrated with `components.json`, indicating a highly reusable, accessible, and customizable component system (likely powered by Shadcn UI or Radix).
* **Robust Code Quality:** Configured with modern ESLint rules (`eslint.config.js`) to maintain consistent and error-free JavaScript.
* **Optimized Routing & Assets:** Clean asset management and absolute import pathing resolved via `jsconfig.json`.

## 🛠️ Built With

* **[React.js](https://reactjs.org/)** - UI Library (Inferred)
* **[Vite](https://vitejs.dev/)** - Frontend Tooling & Bundler
* **[Tailwind CSS](https://tailwindcss.com/)** - CSS Framework
* **[Shadcn UI](https://ui.shadcn.com/)** - UI Component Architecture (via `components.json`)
* **JavaScript (ES6+)** - Core Language

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/satyam-v3/InfraMind_Frontend.git](https://github.com/satyam-v3/InfraMind_Frontend.git)

2. Navigate into the project directory:
  cd InfraMind_Frontend

3. Install the dependencies:
  npm install

4. Start the development server:
  npm run dev
The application will typically be available at http://localhost:5173/.

## 📁 Project Structure
```text
InfraMind_Frontend/
├── public/               # Static assets that bypass the bundler
├── src/                  # Application source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application routes/views
│   ├── lib/              # Utility functions and configurations
│   ├── assets/           # Bundled assets (images, fonts, etc.)
│   └── main.jsx/js       # Application entry point
├── components.json       # UI Component library configuration
├── eslint.config.js      # Linter rules and configuration
├── jsconfig.json         # JavaScript paths and compiler options
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite bundler settings
└── package.json          # Project metadata and scripts
