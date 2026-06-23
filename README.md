# Autonomous AI Studio 🧠🚀

Welcome to the **Autonomous AI Studio** dashboard! This is a state-of-the-art, "God-Tier" mission control center designed to monitor, orchestrate, and visualize high-performance AI agent pipelines. It tracks LangGraph state execution, GPU telemetry, and financial projections in real time.

For a comprehensive look at the system design, architecture, state management, and real-time data flows, please see the [Architecture Document](docs/ARCHITECTURE.md).

For detailed UI interaction features and token structures, see the [UI Features](docs/UI_FEATURES.md).

## Testing & QA
This project is configured with a rigorous **Vitest** + **React Testing Library** suite to verify component rendering and `Zustand` state logic.

```bash
# Run the test suite
npm run test
```

## Running the Application

Built with an unparalleled focus on interactivity and a cyberpunk-inspired glassmorphism aesthetic, this dashboard serves as the ultimate frontend for enterprise AI orchestration.

## ✨ Core Features

- **Interactive LangGraph Visualization**: A dynamic node-based canvas (`PipelineCanvas`) for inspecting the architectural flow of your active AI agents.
- **Agent Trace Explorer**: A deep-dive JSON explorer (`AgentTraceView`) with structured step-by-step trace logs of agent execution.
- **FinOps & GPU Telemetry**: Real-time graphs (`FinOpsDashboard`) tracking cloud expenditure, daily budget consumption, and VRAM/GPU load.
- **Command Palette (`Ctrl+K`)**: Global search and quick-actions interface.

## 🚀 Recent Upgrades

- **Theming System**: Seamlessly switch between the dark "Cyberpunk" theme and a clean, high-contrast "Light" theme.
- **Cyberpunk Boot Sequence**: A 2.5-second terminal-style loading animation sets the immersive matrix-style mood upon entering.
- **Global Notification System**: Integrated, animated Toast notifications for real-time feedback on user actions.
- **Generative Audio Engine**: 
  - **Cyberpunk Ambient Music**: Uses the Web Audio API to synthesize a continuous, low-frequency, breathing ambient drone.
  - **Context-Aware Sonic Feedback**: Distinct synthesizers for tab clicks, menu clicks, node selections, and event processing.
  - *Note: All audio can be globally toggled in Settings.*
- **Data Exporting**: 1-click export of Financial Telemetry (CSV) and Agent Traces (JSON).
- **Interactive MiniMap**: Embedded within the LangGraph canvas for navigating massive agent clusters. Active nodes pulse with CSS keyframe glows.
- **RBAC Authentication**: A secure login gate preventing unauthorized execution of orchestration pipelines.
- **Error Boundaries**: Hardened React tree to prevent single-component crashes from taking down the entire dashboard.
- **Mobile Responsive**: Flexbox and CSS grid logic adapts the complex dashboard layouts down to tablet and mobile screens.

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Global State**: Zustand
- **Animations**: Framer Motion
- **Visualizations**: Recharts
- **Icons**: Lucide React
- **Audio**: Native Web Audio API

## 🚦 Installation & Setup

Before you begin, ensure you have **Node.js** (v18+) installed.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-studio-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to the Local URL provided in your terminal (usually `http://localhost:5173`).

---

