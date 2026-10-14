# 🌈 EduVision AI Architecture Document

*Learn it. Visualize it. Explore it. Master it.*

## 1. System Vision & Overview
EduVision AI reimagines secondary education (Classes 6–12) through a board-independent, concept-first visual knowledge graph. Instead of rote memorization by chapter index, students navigate topics through causal and prerequisite relationships, simulate physical laws interactively, query a contextual Socratic AI Tutor, and track mastery with gamified micro-challenges.

---

## 2. High-Level 3-Tier Architecture

```text
 ┌────────────────────────────────────────────────────────┐
 │                   STUDENT INTERACTION                  │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │              REACT 19 + VITE FRONTEND                  │
 │                                                        │
 │  • Dashboard (Streak, XP, Progress, Daily Challenge)   │
 │  • Concept Knowledge Graph (Dynamic Node Navigation)   │
 │  • Interactive Simulations (Pipe vs Circuit, Ohm's)    │
 │  • Socratic AI Tutor with contextual memory            │
 │  • Smart Notes with AI summarization & flashcards      │
 │  • Micro-Games & Quizzes with instantaneous feedback   │
 └───────────────────────────┬────────────────────────────┘
                             │ REST API (JSON)
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │               FASTAPI PYTHON BACKEND                   │
 │                                                        │
 │  • /api/health          - Health check status          │
 │  • /api/subjects        - Subject hierarchy            │
 │  • /api/topics          - Topic retrieval & knowledge  │
 │  • /api/knowledge-graph - Node & edge graph data       │
 │  • /api/ai/chat         - Socratic multi-turn tutor    │
 │  • /api/notes           - Note capture & AI flashcards │
 │  • /api/quizzes         - Dynamic questions & XP       │
 │  • /api/progress        - Student mastery metrics      │
 └───────────────────────────┬────────────────────────────┘
                             │
           ┌─────────────────┼──────────────────┐
           ▼                 ▼                  ▼
   ┌───────────────┐  ┌───────────────┐  ┌──────────────┐
   │ SQLite /      │  │ Seed Data &   │  │ Hybrid AI    │
   │ PostgreSQL    │  │ Graph Engine  │  │ Socratic     │
   │               │  │               │  │ Reasoning +  │
   │ Student Data  │  │ Prereqs &     │  │ LLM fallback │
   │ Notes & Quizzes  │ Causal Links  │  │ (Gemini/OAI) │
   └───────────────┘  └───────────────┘  └──────────────┘
```

---

## 3. The Resistance & Electricity Vertical Slice
- **Concept**: Resistance ($R = V / I = \rho L / A$)
- **Visuals**:
  1. Water Pipe Constriction Analogy (wide vs constricted pipe)
  2. Electron Drift Circuit (interactive voltage and resistor slider)
- **AI Tutor Hook**: Injects topic context, prerequisite status, and student's current confusion to reply Socratically.
- **Smart Notebook**: Formula cheatsheets, student notes, AI summary flashcards.
- **Playful Challenge**: Speed/Ohm's law calculation with instant XP reward.
