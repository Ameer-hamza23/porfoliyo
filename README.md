# 🚀 Interactive Portfolio Website

A cutting-edge, multi-view portfolio website showcasing three distinct viewing experiences: **Terminal Interface**, **Graphical View**, and **3D Interactive Scene**. Built with Next.js, React, TypeScript, and modern web technologies.

![Portfolio Preview](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🖥️ Terminal View (`/terminal`)
- **Interactive Command-Line Interface** - Navigate using Unix-like commands
- **Real-time Binary Matrix Background** - Continuous falling 0s and 1s with professional hacker aesthetic
- **Command System** - Explore projects, skills, and contact info through commands:
  - `help` - Show available commands
  - `about` / `a` - Display personal information
  - `skills` / `s` - Show technical skills
  - `projects` / `p` - List all projects
  - `projects [name|id|#]` - View detailed project information
  - `contact` / `c` - Get contact information
  - `clear` - Clear terminal history
  - `graphical` / `g` - Navigate to graphical view
  - `3d` - Navigate to 3D view
- **Project Detail View** - Interactive project exploration with images and descriptions
- **Mobile-Optimized** - Fully responsive with mobile-friendly input handling

### 🎨 Graphical View (`/graphical`)
- **Traditional Portfolio Layout** - Clean, modern design
- **Hero Section** - Animated typing effect with professional introduction
- **Technologies Showcase** - Interactive tech stack display
- **Projects Grid** - Featured projects with hover effects
- **Smooth Animations** - Powered by Framer Motion

### 🌟 3D Interactive View (`/3d`)
- **Three.js Powered Scene** - Immersive 3D experience
- **Floating Project Cards** - Interactive 3D project cards with hover effects
- **Rotating Skill Orbs** - Animated skill representations in 3D space
- **Orbit Controls** - Interactive camera controls for exploration
- **Info Panels** - Tabbed interface for About, Projects, and Skills
- **Stars Background** - Dynamic starfield backdrop
- **Auto-Rotation** - Smooth automatic scene rotation

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library

### 3D Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Icons & UI
- **React Icons** - Icon library

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ameer-hamza23/porfoliyo.git
cd porfoliyo
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
portfoliyo_/
├── app/
│   ├── _component/          # React components
│   │   ├── TerminalView2.tsx # Interactive terminal component
│   │   ├── Portfolio3D.tsx   # 3D scene component
│   │   ├── HeadSection.tsx   # Hero section
│   │   ├── BodySection.tsx   # Projects & skills section
│   │   └── ...
│   ├── terminal/             # Terminal view page
│   ├── graphical/            # Graphical view page
│   ├── 3d/                   # 3D view page
│   ├── data.ts               # Portfolio data (projects, skills, etc.)
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── public/                   # Static assets
└── package.json
```

## 🎯 Key Features

- ✅ **Three Distinct View Modes** - Terminal, Graphical, and 3D
- ✅ **Interactive Terminal** - Command-based navigation
- ✅ **Real-time Binary Background** - Professional hacker aesthetic
- ✅ **3D Interactive Scene** - Immersive Three.js experience
- ✅ **Fully Responsive** - Works on all devices
- ✅ **Type-Safe** - Built with TypeScript
- ✅ **Modern Animations** - Smooth transitions and effects
- ✅ **Project Showcase** - Detailed project information with images

## 🌐 Live Demo

Visit the live portfolio: [Your Live URL Here]

## 👤 Author

**Rao Ameer Hamza**
- Full Stack MERN Developer
- 📧 Email: ameerhamza.developer23@gmail.com
- 🔗 GitHub: [@Ameer-hamza23](https://github.com/Ameer-hamza23)
- 💼 LinkedIn: [Ameer Hamza](https://www.linkedin.com/in/ameer-hamza-cs/)
- 📍 Location: Pakistan

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Ameer-hamza23/porfoliyo/issues).

## ⭐ Show Your Support

Give a ⭐ if you like this project!

---

Built with ❤️ by [Rao Ameer Hamza](https://github.com/Ameer-hamza23)
