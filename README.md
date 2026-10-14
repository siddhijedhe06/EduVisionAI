# 🌈 EduVision AI
### *Learn it. Visualize it. Explore it. Master it.*

EduVision AI is a concept-first, visual learning platform for Classes 6–12. It moves beyond rote memorization through interactive physical simulations, an interconnected concept knowledge graph, an analogical Socratic AI Tutor, smart notebooks with auto-generated flashcards, and gamified micro-challenges.

---

## 🚀 Live Services Status
- **Frontend App**: `http://localhost:5173/` (Vite + React 19 + Tailwind CSS v4)
- **FastAPI Core Backend**: `http://localhost:8000/` (FastAPI + Socratic AI Engine)
- **Interactive API Docs**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/api/health`

---

## ⚡ RescueVerse AI: Final Feature List Implemented

### 1. Core
- **Student Profile**: Customize Class (6–12), Board (CBSE, ICSE, State, IB), Target Subject, and Preferred Language (English, Hindi, Hinglish, Marathi) with persistent modal controls.
- **Dashboard**: Minimalist overview with active missions, upcoming exam countdowns, streak counter, and mastery progress.
- **AI Study Buddy**: Multilingual explanations in English, हिंदी, Hinglish, and मराठी with instant follow-ups.
- **Practice Quiz Generator**: Chapter selection, difficulty tiers (Foundation, Standard, Challenge/Olympiad), toggleable hints, and in-depth step-by-step explanations.
- **Deadline Doctor**: Homework and exam countdowns with live Days Left counters and auto-generated daily rescue schedules.
- **Quest Mode**: XP progression, student level titles, achievement badges, and curriculum domain mastery bars.

### 2. Winning Features
- **Rescue Loop**: Quiz mistakes dynamically update and populate the student's daily study schedule with targeted recovery drills.
- **Weak Topic Detector**: Flags weak areas (Critical, Medium, Low), explains the common slip pattern, and provides 1-click rescue drills.
- **Mistake Type Detector**: Distinguishes between **Concept Gap**, **Careless Mistake**, and **Misread Question** with tailored remedies.
- **Prerequisite Gap Finder**: Traces Class 10 concepts back through earlier classes (Class 8: Inverse Proportions root gap; Class 6/7) with an interactive 1-minute fraction bridge slider.
- **Explain in My Way**: Students select their preferred intuitive analogy:
  - 🏏 **Cricket Analogy** (Turf friction, fast bowling, outfield gaps)
  - 👶 **Explain Like I'm 5** (Simple garden hose / water slide metaphors)
  - 🎬 **Superhero Story** (Electron squad infiltrating crystal fortress)
  - 🔬 **Step-by-Step Lab** (Crisp experimental protocol bullets)
  - ⚡ **Formula Intuition** (Pure mathematical derivations & limits)
- **2-Hour Rescue Mode**: Emergency 120-minute digital sprint with 4 high-yield phases (Formulas Cheatsheet ➔ Top 3 Derivations ➔ Pitfalls & Traps ➔ Calm Recall Checklist).

### 3. Extras
- **Notes Simplifier**: Upload or paste notes to generate a 3-bullet core summary, extracted formulas, and interactive Active Recall practice questions.
- **Healthy Gamification**: Focus on personal growth and Improvement XP with **ZERO public leaderboards**.
- **Weekly "You vs. Last Week" Report**: Self-comparison analytics showing study hours (+60.7%), quiz accuracy (+16%), and careless mistakes reduced (-66.7%).
- **Exam Countdown Reminders**: Persistent reminder pills and deadline alerts for approaching tests.

```text
EduVisionAI/
├── frontend/                     # React 19 + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation, level indicator, XP & streak stats
│   │   │   ├── Sidebar.jsx       # Navigation drawer with active deep dive spotlight
│   │   │   ├── DashboardView.jsx # Personalized student hub & recommendations
│   │   │   ├── SubjectExplorer.jsx # Board-independent curriculum hierarchy
│   │   │   ├── ConceptGraph.jsx  # Interactive SVG concept knowledge graph
│   │   │   ├── Visualizer.jsx    # Dual-mode simulation: Water Pipe & Electron Circuit
│   │   │   ├── AITutor.jsx       # Socratic AI chat with analogy & visual hooks
│   │   │   ├── SmartNotes.jsx    # Notes log, flip flashcards, and AI synthesis
│   │   │   └── PracticeQuiz.jsx  # Retrieval practice MCQs & Daily Speed Challenge
│   │   ├── services/
│   │   │   └── api.js            # Axios client with proxy routing
│   │   ├── App.jsx               # Application root
│   │   ├── main.jsx              # Vite entrypoint
│   │   └── index.css             # Tailwind v4 styles, glassmorphism, animations
│   ├── vite.config.js            # Vite configuration with @tailwindcss/vite & API proxy
│   └── package.json
│
├── backend/                      # Python + FastAPI
│   ├── app/
│   │   ├── main.py               # REST API endpoints & CORS configuration
│   │   ├── services/
│   │   │   └── ai_service.py     # Hybrid Socratic educator logic + Gemini/OpenAI hooks
│   │   └── database/
│   │       └── data.py           # In-memory store & rich Class 6-12 seed data
│   └── requirements.txt          # Python dependencies
│
├── database/
│   ├── schema.sql                # Complete relational schema (Users, Topics, Graph)
│   └── seed_data.sql             # SQL seed dataset for science & math concepts
│
└── docs/
    └── architecture.md           # 3-Tier architecture & pedagogical design
```

---

## ⚡ Vertical Slice Features Implemented

1. **Student Dashboard**:
   - Personalized greeting (`Siddhi 👋`), Grade level (`Class 8–10`), Streak badge (`4 Days 🔥`), and XP counter (`580 XP ⚡`).
   - Active course tracking with mastery meters and quick-launch action buttons.
   - Today's Speed Challenge preview.

2. **Concept Knowledge Graph**:
   - Interactive SVG node graph visualizing causal relationships:
     `Electricity` ➔ `Current`, `Voltage`, `Resistance` ➔ `Ohm's Law` ➔ `Electric Power`.
   - Node inspection drawer with prerequisite checks and direct simulation launchers.

3. **Visual Simulation Lab**:
   - **Water Pipe Analogy Mode**: Sliders for pipe constriction diameter ($A$) and pump pressure ($V$) dynamically adjusting water flow rate ($I$) and turbulence.
   - **Electron Circuit Lab Mode**: Microscopic electron drift with atomic lattice ions. Sliders for conductor length ($L$), area ($A$), material resistivity ($\rho$), and battery voltage ($V$), with live Joule heating ($P = I^2 R$) and wire temperature color changes.

4. **Socratic AI Tutor**:
   - Context-aware mentor that tailors responses to the current topic, prerequisites, and student level.
   - Real-world physical analogies (water pipes, crowded corridors) + visual triggers.
   - Quick prompt discovery chips.

5. **Smart Notes & Flashcards**:
   - Automated concept notebook with tags and formulas.
   - Interactive flip-cards for active recall testing.
   - One-click AI summarization and revision note generation.

6. **Playful Learning & Practice**:
   - Multiple-choice questions with step-by-step mathematical explanations.
   - Canvas confetti particle effects and XP rewards.
   - Daily Rover Speed Challenge ($v = d/t$).

---

## 🛠️ Running Locally

### 1. Backend Server
```bash
cd EduVisionAI/backend
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Frontend Dev Server
```bash
cd EduVisionAI/frontend
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in any modern browser.

---

## 🐳 Docker & DevOps Deployment

### 1. Multi-Container Orchestration (Docker Compose - Recommended)
Run both frontend (Nginx reverse-proxy) and backend (FastAPI) with a single command:
```bash
docker compose up --build
```
- **Web App**: [http://localhost:80/](http://localhost:80/) or [http://localhost:5173/](http://localhost:5173/)
- **FastAPI API & Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Stop Containers**: `docker compose down`

### 2. Unified Single-Container Build (For Cloud Platforms like Render/Railway/ECS)
```bash
docker build -t eduvision-app .
docker run -p 8000:8000 eduvision-app
```
Access at [http://localhost:8000/](http://localhost:8000/)

### 3. GitHub Actions CI/CD Pipeline
An automated DevOps workflow is included at `.github/workflows/docker-ci.yml`. It triggers on every push and pull request to `main`, validating:
- Multi-stage Docker image builds for backend and frontend.
- Docker Compose configuration syntax and container integrity checks.

