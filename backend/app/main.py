from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uuid

from app.database.data import (
    INITIAL_SUBJECTS,
    INITIAL_TOPICS,
    KNOWLEDGE_GRAPH_NODES,
    KNOWLEDGE_GRAPH_EDGES,
    INITIAL_NOTES,
    INITIAL_QUIZZES,
    USER_PROFILE,
    INITIAL_DEADLINES,
    INITIAL_WEAK_TOPICS,
    PREREQUISITE_TRACES,
    RESCUE_MODE_2HOUR,
    WEEKLY_REPORT,
    INITIAL_RESCUE_PLAN,
    CHAPTER_QUIZZES
)
from app.services.ai_service import generate_tutor_response, simplify_notes_ai

app = FastAPI(
    title="RescueVerse AI API (EduVision AI)",
    description="Intelligent Socratic Learning, Exam Rescue & Visual Science Engine for Classes 6-12",
    version="2.0.0"
)

# Enable CORS for local Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory dynamic stores for user session
user_notes = list(INITIAL_NOTES)
user_profile_state = dict(USER_PROFILE)
deadlines_state = list(INITIAL_DEADLINES)
rescue_plan_state = list(INITIAL_RESCUE_PLAN)
weak_topics_state = list(INITIAL_WEAK_TOPICS)

# Models
class ChatRequest(BaseModel):
    query: str
    topic_id: Optional[str] = "topic-resistance"
    student_name: Optional[str] = "Siddhi"
    history: Optional[List[Dict[str, str]]] = []
    language: Optional[str] = "English"
    style: Optional[str] = "cricket"

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    class_level: Optional[str] = None
    board: Optional[str] = None
    target_subject: Optional[str] = None
    language: Optional[str] = None
    explanation_style: Optional[str] = None

class DeadlineCreate(BaseModel):
    title: str
    type: str # 'exam' | 'homework'
    subject: str
    target_date: str
    days_left: int
    urgency: Optional[str] = "approaching"
    weightage: Optional[str] = "School Assessment"
    daily_rescue_plan: Optional[str] = "Review core definitions and solve 2 practice problems"
    syllabus: Optional[List[str]] = []

class QuizGenerateRequest(BaseModel):
    chapter: Optional[str] = "topic-resistance"
    difficulty: Optional[str] = "standard"

class QuizSubmission(BaseModel):
    topic_id: str
    question_id: str
    selected_option_index: int

class MistakeAnalysisRequest(BaseModel):
    topic_id: str
    question_id: str
    question_text: str
    selected_option_index: int
    correct_option_index: int
    declared_mistake_type: Optional[str] = None # concept_gap | careless_mistake | misread_question

class NoteCreate(BaseModel):
    topic_id: str
    title: str
    content: str
    category: Optional[str] = "personal"
    tags: Optional[List[str]] = []

class NoteSummarizeRequest(BaseModel):
    topic_id: str
    notes_content: Optional[str] = None

class NotesSimplifyRequest(BaseModel):
    content: str

class ChallengeSubmission(BaseModel):
    selected_index: int

# --- 1. HEALTH CHECK ---
@app.get("/api/health")
def health_check():
    return {
        "status": "success",
        "message": "RescueVerse AI backend is running",
        "version": "2.0.0",
        "vertical_slice": "Physics -> Electricity -> Resistance",
        "features": [
            "student_profile",
            "ai_study_buddy_multilingual",
            "explain_in_my_way",
            "practice_quiz_generator",
            "deadline_doctor",
            "quest_mode",
            "rescue_loop",
            "weak_topic_detector",
            "mistake_type_detector",
            "prerequisite_gap_finder",
            "2hour_rescue_mode",
            "notes_simplifier",
            "healthy_gamification",
            "weekly_you_vs_last_week"
        ]
    }

# --- 2. STUDENT PROFILE & METRICS ---
@app.get("/api/profile")
def get_user_profile():
    return user_profile_state

@app.put("/api/profile")
def update_user_profile(update: ProfileUpdate):
    for key, value in update.model_dump(exclude_unset=True).items():
        if value is not None:
            user_profile_state[key] = value
    return {"status": "success", "profile": user_profile_state}

# --- 3. SUBJECTS & TOPICS ---
@app.get("/api/subjects")
def get_subjects():
    return {"subjects": INITIAL_SUBJECTS}

@app.get("/api/topics/{topic_id}")
def get_topic(topic_id: str):
    if topic_id not in INITIAL_TOPICS:
        raise HTTPException(status_code=404, detail="Topic not found")
    return INITIAL_TOPICS[topic_id]

# --- 4. KNOWLEDGE GRAPH ---
@app.get("/api/knowledge-graph")
def get_knowledge_graph():
    return {
        "nodes": KNOWLEDGE_GRAPH_NODES,
        "edges": KNOWLEDGE_GRAPH_EDGES,
        "active_topic": "topic-resistance"
    }

# --- 5. AI STUDY BUDDY (MULTILINGUAL + EXPLAIN IN MY WAY) ---
@app.post("/api/ai/chat")
async def chat_with_tutor(req: ChatRequest):
    # Use preference from request or profile
    chosen_lang = req.language or user_profile_state.get("language", "English")
    chosen_style = req.style or user_profile_state.get("explanation_style", "cricket")
    
    result = await generate_tutor_response(
        query=req.query,
        topic_id=req.topic_id,
        student_name=req.student_name or user_profile_state.get("name", "Siddhi"),
        chat_history=req.history,
        language=chosen_lang,
        style=chosen_style
    )
    return result

# --- 6. PRACTICE QUIZ GENERATOR (CHAPTER, DIFFICULTY, HINTS, EXPLANATIONS) ---
@app.post("/api/quizzes/generate")
def generate_quiz(req: QuizGenerateRequest):
    chapter_key = req.chapter if req.chapter in CHAPTER_QUIZZES else "topic-resistance"
    chapter_data = CHAPTER_QUIZZES.get(chapter_key, CHAPTER_QUIZZES["topic-resistance"])
    difficulty_key = req.difficulty if req.difficulty in chapter_data else "standard"
    
    questions = chapter_data.get(difficulty_key, chapter_data.get("standard", []))
    return {
        "chapter": chapter_key,
        "chapter_title": chapter_data.get("title", "Practice Quiz"),
        "difficulty": difficulty_key,
        "questions": questions
    }

@app.get("/api/quizzes/{topic_id}")
def get_quiz(topic_id: str):
    if topic_id in CHAPTER_QUIZZES:
        all_q = (
            CHAPTER_QUIZZES[topic_id].get("foundation", []) +
            CHAPTER_QUIZZES[topic_id].get("standard", []) +
            CHAPTER_QUIZZES[topic_id].get("challenge", [])
        )
        return {"topic_id": topic_id, "questions": all_q}
    quizzes = INITIAL_QUIZZES.get(topic_id, [])
    return {"topic_id": topic_id, "questions": quizzes}

@app.post("/api/quizzes/submit")
def submit_quiz_answer(sub: QuizSubmission):
    # Search in CHAPTER_QUIZZES first
    target_q = None
    if sub.topic_id in CHAPTER_QUIZZES:
        for diff in ["foundation", "standard", "challenge"]:
            for q in CHAPTER_QUIZZES[sub.topic_id].get(diff, []):
                if q["id"] == sub.question_id:
                    target_q = q
                    break
            if target_q:
                break
    
    if not target_q:
        quizzes = INITIAL_QUIZZES.get(sub.topic_id, [])
        target_q = next((q for q in quizzes if q["id"] == sub.question_id), None)

    if not target_q:
        raise HTTPException(status_code=404, detail="Question not found")

    is_correct = (sub.selected_option_index == target_q["correct_index"])
    xp_earned = target_q.get("xp", 50) if is_correct else 15
    
    # Mistake Type detection if incorrect
    mistake_type = None
    if not is_correct:
        mistake_map = target_q.get("mistake_types", {})
        mistake_type = mistake_map.get(sub.selected_option_index, "concept_gap")
        
        # Trigger Rescue Loop: add targeted recovery module to study plan!
        new_rescue_item = {
            "id": f"rp-{uuid.uuid4().hex[:5]}",
            "title": f"Review: {target_q.get('question', '')[:45]}...",
            "reason": f"Quiz slip detected ({mistake_type.replace('_', ' ').title()})",
            "mistake_type": mistake_type,
            "suggested_action": f"Review explanation: {target_q.get('explanation', '')[:90]}...",
            "estimated_minutes": 8,
            "completed": False,
            "urgency": "high"
        }
        rescue_plan_state.insert(0, new_rescue_item)
        if len(rescue_plan_state) > 6:
            rescue_plan_state.pop()

    # Reward XP
    user_profile_state["xp"] += xp_earned
    
    return {
        "is_correct": is_correct,
        "correct_index": target_q["correct_index"],
        "explanation": target_q.get("explanation", ""),
        "mistake_type": mistake_type,
        "xp_earned": xp_earned,
        "total_xp": user_profile_state["xp"],
        "rescue_loop_updated": not is_correct
    }

# --- 7. RESCUE LOOP & MISTAKE TYPE DETECTOR ---
@app.get("/api/rescue/plan")
def get_rescue_plan():
    return {
        "rescue_plan": rescue_plan_state,
        "active_count": len([i for i in rescue_plan_state if not i["completed"]])
    }

@app.post("/api/rescue/plan/complete/{item_id}")
def complete_rescue_item(item_id: str):
    for item in rescue_plan_state:
        if item["id"] == item_id:
            item["completed"] = True
            user_profile_state["xp"] += 25  # Improvement XP!
            return {"status": "success", "item": item, "total_xp": user_profile_state["xp"]}
    raise HTTPException(status_code=404, detail="Rescue item not found")

@app.post("/api/rescue/analyze-mistake")
def analyze_mistake(req: MistakeAnalysisRequest):
    # Classifies mistake: concept gap vs careless mistake vs misread question
    m_type = req.declared_mistake_type or "concept_gap"
    remedy = {
        "concept_gap": "We recommend reviewing the water pipe simulation or asking AI Buddy with 'Explain In My Way'.",
        "careless_mistake": "Pro Tip: Underline units and write down the formula before plugging in values.",
        "misread_question": "Pro Tip: Circle words like 'NOT', 'EXCEPT', 'DOUBLED', or 'HALVED' before choosing your answer."
    }.get(m_type, "Practice similar numericals to build intuition.")

    # Add to dynamic rescue plan
    rescue_plan_state.insert(0, {
        "id": f"rp-{uuid.uuid4().hex[:5]}",
        "title": f"Mistake Recovery: {req.question_text[:40]}...",
        "reason": f"Flagged as {m_type.replace('_', ' ').title()}",
        "mistake_type": m_type,
        "suggested_action": remedy,
        "estimated_minutes": 7,
        "completed": False,
        "urgency": "medium"
    })

    return {
        "mistake_type": m_type,
        "diagnosis": f"Identified {m_type.replace('_', ' ').title()}",
        "remedy": remedy,
        "rescue_loop_updated": True
    }

# --- 8. WEAK TOPIC DETECTOR ---
@app.get("/api/weak-topics")
def get_weak_topics():
    return {"weak_topics": weak_topics_state}

@app.post("/api/weak-topics/rescue/{topic_id}")
def rescue_weak_topic(topic_id: str):
    target = next((w for w in weak_topics_state if w["id"] == topic_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Weak topic not found")
    
    target["mastery"] = min(100, target["mastery"] + 25)
    if target["mastery"] >= 70:
        target["severity"] = "low"
    elif target["mastery"] >= 50:
        target["severity"] = "medium"
    
    user_profile_state["xp"] += 40  # Improvement XP
    return {"status": "success", "weak_topic": target, "total_xp": user_profile_state["xp"]}

# --- 9. PREREQUISITE GAP FINDER ---
@app.get("/api/prerequisites/{topic_id}")
def get_prerequisites_ladder(topic_id: str):
    trace = PREREQUISITE_TRACES.get(topic_id, PREREQUISITE_TRACES.get("topic-resistance"))
    return trace

# --- 10. DEADLINE DOCTOR (HOMEWORK, EXAMS, DAILY PLAN, COUNTDOWN) ---
@app.get("/api/deadlines")
def get_deadlines():
    return {"deadlines": deadlines_state}

@app.post("/api/deadlines")
def create_deadline(d: DeadlineCreate):
    new_dl = {
        "id": f"dl-{uuid.uuid4().hex[:5]}",
        "title": d.title,
        "type": d.type,
        "subject": d.subject,
        "target_date": d.target_date,
        "days_left": d.days_left,
        "urgency": d.urgency or ("critical" if d.days_left <= 5 else "approaching"),
        "weightage": d.weightage or "School Assessment",
        "syllabus": d.syllabus or [d.subject],
        "daily_rescue_plan": d.daily_rescue_plan or f"Daily 25m: High-yield practice for {d.title}"
    }
    deadlines_state.append(new_dl)
    return {"status": "success", "deadline": new_dl}

@app.delete("/api/deadlines/{deadline_id}")
def delete_deadline(deadline_id: str):
    global deadlines_state
    deadlines_state = [d for d in deadlines_state if d["id"] != deadline_id]
    return {"status": "success", "remaining_count": len(deadlines_state)}

# --- 11. 2-HOUR RESCUE MODE (LAST-MINUTE EXAM SPRINT) ---
@app.get("/api/rescue-mode/2hour")
def get_2hour_rescue_mode():
    return RESCUE_MODE_2HOUR

# --- 12. NOTES SIMPLIFIER (UPLOAD/PASTE NOTES -> SUMMARY + QUESTIONS) ---
@app.post("/api/notes/simplify")
def simplify_notes_endpoint(req: NotesSimplifyRequest):
    simplified = simplify_notes_ai(req.content)
    return simplified

# --- 13. WEEKLY "YOU VS. LAST WEEK" REPORT & HEALTHY GAMIFICATION ---
@app.get("/api/reports/weekly")
def get_weekly_report():
    return WEEKLY_REPORT

@app.post("/api/quests/claim/{quest_id}")
def claim_quest(quest_id: str):
    missions = user_profile_state.get("missions", [])
    target = next((m for m in missions if m["id"] == quest_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Quest not found")
    
    if not target.get("completed", False):
        target["completed"] = True
        user_profile_state["xp"] += target.get("xp", 30)
    
    return {
        "status": "success",
        "quest": target,
        "total_xp": user_profile_state["xp"]
    }

# --- 14. SMART NOTES (EXISTING COMPATIBILITY) ---
@app.get("/api/notes/{topic_id}")
def get_notes(topic_id: str):
    filtered = [n for n in user_notes if n["topic_id"] == topic_id]
    return {"notes": filtered}

@app.post("/api/notes")
def add_note(note: NoteCreate):
    new_note = {
        "id": f"note-{uuid.uuid4().hex[:6]}",
        "topic_id": note.topic_id,
        "title": note.title,
        "category": note.category or "personal",
        "content": note.content,
        "created_at": "Just now",
        "tags": note.tags or ["Personal"]
    }
    user_notes.append(new_note)
    return {"status": "success", "note": new_note}

@app.post("/api/notes/summarize")
def summarize_notes(req: NoteSummarizeRequest):
    return {
        "summary": (
            "📌 Key Takeaways for Resistance:\n"
            "1. Resistance opposes electron flow through atomic lattice collisions.\n"
            "2. R increases with wire length, decreases with wire thickness: R = ρ(L/A).\n"
            "3. Ohm's Law: V = I × R binds Voltage, Current, and Resistance.\n"
            "4. Dissipated thermal power: P = I²R."
        ),
        "flashcards": [
            {"front": "Formula for Conductor Resistance", "back": "R = ρ · (L / A). R is directly proportional to length L and inversely to area A."},
            {"front": "SI Unit of Resistance & Resistivity", "back": "Resistance = Ohm (Ω), Resistivity (ρ) = Ohm-meter (Ω·m)."},
            {"front": "Water Pipe Analogy for Resistance", "back": "Constricted pipe = High resistance; Wide pipe = Low resistance. Water pressure = Voltage."}
        ]
    }

# --- 15. DAILY CHALLENGE (EXISTING COMPATIBILITY) ---
@app.post("/api/challenge/submit")
def submit_daily_challenge(sub: ChallengeSubmission):
    challenge = user_profile_state["daily_challenge"]
    is_correct = (sub.selected_index == challenge["correct_index"])
    xp = challenge["xp_reward"] if is_correct else 15
    if is_correct:
        user_profile_state["streak_days"] += 1
    user_profile_state["xp"] += xp
    
    return {
        "is_correct": is_correct,
        "explanation": challenge["explanation"],
        "xp_earned": xp,
        "total_xp": user_profile_state["xp"],
        "new_streak": user_profile_state["streak_days"]
    }

# --- 16. REFERENCE SOURCES ---
@app.get("/api/references/{topic_id}")
def get_references(topic_id: str):
    topic = INITIAL_TOPICS.get(topic_id)
    if not topic or "references" not in topic:
        return INITIAL_TOPICS.get("topic-resistance", {}).get("references", {})
    return topic["references"]

# --- 17. STATIC FILES (FOR SINGLE-CONTAINER DEPLOYMENTS) ---
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_dist = os.path.join(os.getcwd(), "frontend", "dist")
if not os.path.exists(frontend_dist):
    frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))

if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        # Don't intercept API routes or docs
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            raise HTTPException(status_code=404, detail="Not found")
        target_file = os.path.join(frontend_dist, full_path)
        if os.path.isfile(target_file):
            return FileResponse(target_file)
        index_file = os.path.join(frontend_dist, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="Frontend build index not found")

