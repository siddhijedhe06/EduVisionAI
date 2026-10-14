-- EduVision AI Database Schema
-- Supports Knowledge Graph, Topic Relationships, Socratic AI Tutor, Smart Notes, and Progress Tracking

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    grade_level VARCHAR(20) DEFAULT 'Class 9',
    preferred_learning_style VARCHAR(40) DEFAULT 'visual',
    streak_days INTEGER DEFAULT 3,
    xp INTEGER DEFAULT 450,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    icon VARCHAR(40) NOT NULL,
    color VARCHAR(40) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0
);

-- 3. Topics / Concepts Table
CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(64) PRIMARY KEY,
    subject_id VARCHAR(64) REFERENCES subjects(id),
    title VARCHAR(150) NOT NULL,
    category VARCHAR(80),
    level VARCHAR(40) DEFAULT 'Intermediate',
    summary TEXT,
    visual_type VARCHAR(50), -- 'circuit_simulation', 'pipe_analogy', 'interactive_graph', etc.
    real_world_analogy TEXT,
    formula VARCHAR(150),
    key_takeaways TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Topic Relationships (Knowledge Graph: PREREQUISITE, RELATED, NEXT, PART_OF)
CREATE TABLE IF NOT EXISTS topic_relationships (
    id VARCHAR(64) PRIMARY KEY,
    topic_id VARCHAR(64) REFERENCES topics(id),
    related_topic_id VARCHAR(64) REFERENCES topics(id),
    relationship_type VARCHAR(40) NOT NULL -- 'PREREQUISITE', 'RELATED', 'NEXT', 'PART_OF'
);

-- 5. Student Progress
CREATE TABLE IF NOT EXISTS student_progress (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    topic_id VARCHAR(64) REFERENCES topics(id),
    completion_percentage INTEGER DEFAULT 0,
    mastery_status VARCHAR(40) DEFAULT 'in_progress', -- 'not_started', 'in_progress', 'mastered'
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_spent_seconds INTEGER DEFAULT 0
);

-- 6. Smart Personal Notes
CREATE TABLE IF NOT EXISTS notes (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    topic_id VARCHAR(64) REFERENCES topics(id),
    title VARCHAR(180) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(60) DEFAULT 'personal', -- 'personal', 'formula', 'ai_summary', 'flashcard'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Practice Questions & Quizzes
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(64) PRIMARY KEY,
    topic_id VARCHAR(64) REFERENCES topics(id),
    question_text TEXT NOT NULL,
    options JSON NOT NULL,
    correct_option_index INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 50,
    difficulty VARCHAR(30) DEFAULT 'medium'
);

-- 8. Quiz Attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    topic_id VARCHAR(64) REFERENCES topics(id),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    xp_earned INTEGER DEFAULT 0,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. AI Tutor Chat History
CREATE TABLE IF NOT EXISTS ai_conversations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    topic_id VARCHAR(64) REFERENCES topics(id),
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant'
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
