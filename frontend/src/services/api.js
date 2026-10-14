import axios from 'axios';

const API_BASE = '/api';

export const checkHealth = async () => {
  try {
    const res = await axios.get(`${API_BASE}/health`);
    return res.data;
  } catch (err) {
    console.error('Health check failed:', err);
    return { status: 'fallback', message: 'Local Offline Engine', version: '2.0.0' };
  }
};

export const getUserProfile = async () => {
  try {
    const res = await axios.get(`${API_BASE}/profile`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    return {
      name: 'Siddhi',
      class_level: 'Class 10',
      board: 'CBSE',
      target_subject: 'Physics',
      language: 'English',
      explanation_style: 'cricket',
      streak_days: 4,
      streak_shield: true,
      xp: 580,
      level: 3,
      level_title: 'Circuit Conqueror',
      next_level_xp: 800,
      missions: [
        { id: 'm1', title: 'Complete 1 Practice Quiz on Resistance', xp: 40, completed: false, category: 'quiz' },
        { id: 'm2', title: 'Review 1 Weak Topic in Rescue Loop', xp: 35, completed: false, category: 'rescue' },
        { id: 'm3', title: 'Check Prerequisite Gap: Class 8 Inverse Proportions', xp: 25, completed: true, category: 'prereq' }
      ],
      badges: [
        { id: 'b-1', title: 'Hydraulic Mind', desc: 'Understood Voltage as Water Pressure', icon: 'Droplets', unlocked: true, date: 'Yesterday' },
        { id: 'b-2', title: 'Mistake Detective', desc: 'Analyzed and recovered from 3 quiz misreads', icon: 'CheckCircle2', unlocked: true, date: '2 days ago' },
        { id: 'b-3', title: 'Night Rescue Hero', desc: 'Completed a 2-Hour Emergency Rescue sprint', icon: 'Flame', unlocked: true, date: 'Last week' },
        { id: 'b-4', title: 'Ohm\'s Master', desc: 'Scored 100% on Circuit Mastery quiz', icon: 'Zap', unlocked: false, progress: '2/3 quests done' }
      ]
    };
  }
};

export const updateUserProfile = async (updateData) => {
  try {
    const res = await axios.put(`${API_BASE}/profile`, updateData);
    return res.data.profile;
  } catch (err) {
    console.warn('Backend offline, applying profile update locally:', err);
    return updateData;
  }
};

export const getSubjects = async () => {
  try {
    const res = await axios.get(`${API_BASE}/subjects`);
    return res.data.subjects;
  } catch (err) {
    console.error('Failed to fetch subjects:', err);
    return [];
  }
};

export const getTopicDetail = async (topicId) => {
  try {
    const res = await axios.get(`${API_BASE}/topics/${topicId}`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch topic:', err);
    return null;
  }
};

export const getKnowledgeGraph = async () => {
  try {
    const res = await axios.get(`${API_BASE}/knowledge-graph`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch knowledge graph:', err);
    return null;
  }
};

export const sendAIChat = async (query, topicId = 'topic-resistance', history = [], language = 'English', style = 'cricket') => {
  try {
    const res = await axios.post(`${API_BASE}/ai/chat`, {
      query,
      topic_id: topicId,
      student_name: 'Siddhi',
      history,
      language,
      style
    });
    return res.data;
  } catch (err) {
    console.warn('AI chat falling back locally:', err);
    const langLower = (language || '').toLowerCase();
    if (langLower.includes('hinglish')) {
      return {
        response: `Arre Siddhi! 🏏 Cricket pitch se samjho: Resistance ek geeli rough pitch hai jo fast ball (Current) ko slow down karti hai. Wire jitni lambi hogi (L), utna zyada resistance. Formula: R = ρ · (L / A).`,
        language: 'Hinglish',
        style: 'cricket',
        source: 'local_fallback'
      };
    } else if (langLower.includes('hindi')) {
      return {
        response: `नमस्ते सिद्धी! 🏏 प्रतिरोध (Resistance) तार में इलेक्ट्रॉनों के प्रवाह का विरोध है, ठीक वैसे ही जैसे पिच की घास क्रिकेट गेंद को रोकती है: R = ρ · (L / A)।`,
        language: 'Hindi',
        style: 'cricket',
        source: 'local_fallback'
      };
    } else if (langLower.includes('marathi')) {
      return {
        response: `नमस्कार सिद्धी! 🏏 विद्युत रोध (Resistance) म्हणजे वाहकामधून वाहणाऱ्या विद्युत प्रभाराला होणारा विरोध. लांब खेळपट्टीवर चेंडूचा वेग जसा मंदावतो, तसेच: R = ρ · (L / A)।`,
        language: 'Marathi',
        style: 'cricket',
        source: 'local_fallback'
      };
    }
    return {
      response: `Hey Siddhi! 🏏 Think of electric current as a cricket ball speeding across the outfield. Turf friction from rough grass is Resistance (R) slowing it down! Long wire = big outfield (more resistance). Formula: R = ρ(L/A).`,
      language: 'English',
      style: 'cricket',
      source: 'local_fallback'
    };
  }
};

// --- PRACTICE QUIZ GENERATOR ---
export const generateQuiz = async (chapter = 'topic-resistance', difficulty = 'standard') => {
  try {
    const res = await axios.post(`${API_BASE}/quizzes/generate`, { chapter, difficulty });
    return res.data;
  } catch (err) {
    console.warn('Failed to generate dynamic quiz, using fallback:', err);
    return {
      chapter,
      chapter_title: 'Electricity: Resistance & Ohm\'s Law',
      difficulty,
      questions: [
        {
          id: 'q-res-s1',
          question: 'What happens to the resistance of a cylindrical copper wire if its length is doubled and its radius is halved?',
          options: [
            'Resistance increases by 2 times',
            'Resistance increases by 4 times',
            'Resistance increases by 8 times',
            'Resistance remains unchanged'
          ],
          correct_index: 2,
          hint: 'Area A = π·r². If radius halves, Area becomes 1/4th. Combine with doubling length!',
          mistake_types: { 0: 'concept_gap', 1: 'careless_mistake', 3: 'concept_gap' },
          explanation: 'R = ρ(L/A). Doubling length gives 2L. Halving radius makes Area = π(r/2)² = A/4. So R\' = ρ(2L / (A/4)) = 8 × (ρL/A) = 8 times greater!',
          xp: 50
        },
        {
          id: 'q-res-s2',
          question: 'A 12 Ω resistor is connected across a 24 V battery. What is the current flowing?',
          options: ['0.5 A', '2.0 A', '288 A', '12 A'],
          correct_index: 1,
          hint: 'Apply Ohm\'s Law: V = I × R, so I = V / R.',
          mistake_types: { 0: 'careless_mistake', 2: 'careless_mistake', 3: 'misread_question' },
          explanation: 'From Ohm\'s Law, I = V / R = 24 V / 12 Ω = 2.0 Amperes.',
          xp: 45
        }
      ]
    };
  }
};

export const getQuiz = async (topicId) => {
  try {
    const res = await axios.get(`${API_BASE}/quizzes/${topicId}`);
    return res.data.questions;
  } catch (err) {
    console.error('Failed to get quiz:', err);
    return [];
  }
};

export const submitQuizAnswer = async (topicId, questionId, selectedOptionIndex) => {
  try {
    const res = await axios.post(`${API_BASE}/quizzes/submit`, {
      topic_id: topicId,
      question_id: questionId,
      selected_option_index: selectedOptionIndex,
    });
    return res.data;
  } catch (err) {
    console.error('Failed to submit quiz answer:', err);
    const isCorrect = (selectedOptionIndex === 2);
    return {
      is_correct: isCorrect,
      correct_index: 2,
      explanation: 'Resistance is R ∝ L / A. When radius is halved, area becomes 1/4th, making resistance 8 times greater.',
      mistake_type: isCorrect ? null : 'concept_gap',
      xp_earned: isCorrect ? 50 : 15,
      total_xp: 630,
      rescue_loop_updated: !isCorrect
    };
  }
};

// --- RESCUE LOOP & MISTAKE TYPE DETECTOR ---
export const getRescuePlan = async () => {
  try {
    const res = await axios.get(`${API_BASE}/rescue/plan`);
    return res.data.rescue_plan;
  } catch (err) {
    return [
      {
        id: 'rp-1',
        title: 'Wire Geometry & Radius-Squared Rule',
        reason: 'Recent quiz error: confused wire diameter with wire area',
        mistake_type: 'concept_gap',
        suggested_action: 'Review 2-minute formula drill: Area A = π·r²',
        estimated_minutes: 10,
        completed: false,
        urgency: 'high'
      },
      {
        id: 'rp-2',
        title: 'Unit Prefix Conversion: mm² to m²',
        reason: 'Careless calculation error in resistivity numericals',
        mistake_type: 'careless_mistake',
        suggested_action: 'Solve 2 rapid practice items on 10⁻⁶ area multiplier',
        estimated_minutes: 8,
        completed: false,
        urgency: 'medium'
      }
    ];
  }
};

export const completeRescueItem = async (itemId) => {
  try {
    const res = await axios.post(`${API_BASE}/rescue/plan/complete/${itemId}`);
    return res.data;
  } catch (err) {
    return { status: 'success', itemId };
  }
};

export const analyzeMistake = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/rescue/analyze-mistake`, data);
    return res.data;
  } catch (err) {
    return {
      mistake_type: data.declared_mistake_type || 'concept_gap',
      diagnosis: 'Identified Concept Gap',
      remedy: 'Review visual simulation or ask AI Buddy with Cricket analogy.',
      rescue_loop_updated: true
    };
  }
};

// --- WEAK TOPIC DETECTOR ---
export const getWeakTopics = async () => {
  try {
    const res = await axios.get(`${API_BASE}/weak-topics`);
    return res.data.weak_topics;
  } catch (err) {
    return [
      {
        id: 'wt-1',
        topic: 'Resistivity (ρ) vs Resistance (R)',
        subject: 'Physics',
        mastery: 38,
        severity: 'critical',
        common_mistake: 'Believing cutting a wire changes its intrinsic resistivity ρ.',
        quick_fix_tip: 'Resistance depends on geometry (L and A); Resistivity ρ is material identity.'
      },
      {
        id: 'wt-2',
        topic: 'Wire Stretching & Radius-Squared Rule',
        subject: 'Physics',
        mastery: 45,
        severity: 'medium',
        common_mistake: 'Forgetting that Area A = π·r², so halving radius reduces area by 4×!',
        quick_fix_tip: 'When radius is halved, area becomes 1/4th, making resistance 4× higher.'
      }
    ];
  }
};

export const rescueWeakTopic = async (topicId) => {
  try {
    const res = await axios.post(`${API_BASE}/weak-topics/rescue/${topicId}`);
    return res.data;
  } catch (err) {
    return { status: 'success', total_xp: 620 };
  }
};

// --- PREREQUISITE GAP FINDER ---
export const getPrerequisites = async (topicId = 'topic-resistance') => {
  try {
    const res = await axios.get(`${API_BASE}/prerequisites/${topicId}`);
    return res.data;
  } catch (err) {
    return {
      target_concept: 'Class 10: Resistance of Conductors & Factors (R = ρ·L/A)',
      ladder: [
        {
          grade: 'Class 10',
          concept: 'Electrical Resistance & Ohm\'s Law (V = IR)',
          status: 'in_progress',
          summary: 'Opposition to electron drift caused by metallic lattice ion vibrations.'
        },
        {
          grade: 'Class 8',
          concept: 'Direct & Inverse Proportions (Math)',
          status: 'gap_detected',
          warning: 'Root Gap Detected Here! If denominator (Area) increases, ratio decreases.',
          remedy: 'Interactive 1-minute slider: watch R drop as denominator A grows.'
        },
        {
          grade: 'Class 7',
          concept: 'Electric Currents & Closed Circuits',
          status: 'mastered',
          summary: 'Charges require unbroken conductive loops to circulate.'
        },
        {
          grade: 'Class 6',
          concept: 'Conductors vs Insulators',
          status: 'mastered',
          summary: 'Metals permit free electron drift; rubber and glass bind charges tightly.'
        }
      ]
    };
  }
};

// --- DEADLINE DOCTOR ---
export const getDeadlines = async () => {
  try {
    const res = await axios.get(`${API_BASE}/deadlines`);
    return res.data.deadlines;
  } catch (err) {
    return [
      {
        id: 'dl-1',
        title: 'Physics Midterm Board Exam',
        type: 'exam',
        subject: 'Physics',
        target_date: '2026-10-26T09:00:00',
        days_left: 12,
        urgency: 'critical',
        weightage: '40% Marks',
        syllabus: ['Electricity & Circuits', 'Ohm\'s Law & Resistance', 'Heating Effects & Power'],
        daily_rescue_plan: '35 mins: Revise R = ρ(L/A) derivations + 1 practice check'
      },
      {
        id: 'dl-2',
        title: 'Maths Quadratic Equations Assignment',
        type: 'homework',
        subject: 'Mathematics',
        target_date: '2026-10-18T18:00:00',
        days_left: 4,
        urgency: 'approaching',
        weightage: 'School Internal',
        syllabus: ['Roots of Quadratic', 'Discriminant Method', 'Word Problems'],
        daily_rescue_plan: '20 mins: Solve 4 discriminant and root nature questions'
      }
    ];
  }
};

export const createDeadline = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/deadlines`, data);
    return res.data.deadline;
  } catch (err) {
    return { ...data, id: `dl-${Date.now()}` };
  }
};

export const deleteDeadline = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/deadlines/${id}`);
    return res.data;
  } catch (err) {
    return { status: 'success' };
  }
};

// --- 2-HOUR RESCUE MODE ---
export const get2HourRescuePlan = async () => {
  try {
    const res = await axios.get(`${API_BASE}/rescue-mode/2hour`);
    return res.data;
  } catch (err) {
    return {
      title: '⚡ 2-Hour Emergency Exam Rescue Plan',
      subtitle: 'High-yield, zero-fluff emergency sprint for upcoming tests',
      total_minutes: 120,
      phases: [
        {
          id: 'p1',
          phase: 'Phase 1: 0 – 30 mins',
          title: 'Must-Know Formula & Units Cheatsheet',
          badge: '30 mins',
          color: 'cyan',
          items: [
            'Ohm\'s Law: V = I · R (SI: Volts = Amperes × Ohms)',
            'Conductor Resistance: R = ρ · (L / A) (SI of ρ: Ω·m)',
            'Joule\'s Heating Law: H = I² · R · t',
            'Electrical Power: P = V · I = I² · R = V² / R (SI: Watts)'
          ]
        },
        {
          id: 'p2',
          phase: 'Phase 2: 30 – 75 mins',
          title: 'Top 3 High-Probability Derivations',
          badge: '45 mins',
          color: 'amber',
          items: [
            'Derivation: Equivalent resistance for resistors in parallel (1/Rp = 1/R1 + 1/R2)',
            'Classic Exam Problem: Wire stretched to double length with volume conservation (R becomes 4×)',
            'Experimental Verification: V vs I slope gives resistance R'
          ]
        },
        {
          id: 'p3',
          phase: 'Phase 3: 75 – 105 mins',
          title: 'Common Pitfalls & Trap Avoidance',
          badge: '30 mins',
          color: 'rose',
          items: [
            '⚠️ Pitfall 1: Cutting wire in half cuts length (L/2) so R halves, but resistivity ρ NEVER changes!',
            '⚠️ Pitfall 2: Don\'t forget to convert mm² to m² (1 mm² = 10⁻⁶ m²).',
            '⚠️ Pitfall 3: In parallel, voltage is identical across each resistor; current divides.'
          ]
        },
        {
          id: 'p4',
          phase: 'Phase 4: 105 – 120 mins',
          title: 'Calm Strategy & Final Recall',
          badge: '15 mins',
          color: 'emerald',
          items: [
            'Write units for every single numerical answer (missing \'Ω\' loses 0.5 marks).',
            'Draw circuit diagram with neat battery polarity signs (+ and -).',
            '2 minutes of steady breathing: You\'ve got this!'
          ]
        }
      ]
    };
  }
};

// --- NOTES SIMPLIFIER ---
export const simplifyNotesText = async (content) => {
  try {
    const res = await axios.post(`${API_BASE}/notes/simplify`, { content });
    return res.data;
  } catch (err) {
    return {
      summary_bullets: [
        'Electric resistance (R) represents the microscopic collision opposition that vibrating metal ions exert on drifting conduction electrons.',
        'Resistance scales directly with conductor length (R ∝ L) and inversely with cross-sectional area (R ∝ 1/A), governed by R = ρ(L/A).',
        'In all ohmic circuits at constant temperature, Voltage, Current, and Resistance remain coupled through Ohm\'s Law: V = I × R.'
      ],
      key_formulas: [
        { name: 'Conductor Resistance', formula: 'R = ρ · (L / A)', unit: 'Ohms (Ω)' },
        { name: 'Ohm\'s Law', formula: 'V = I · R', unit: 'V in Volts, I in Amps, R in Ω' },
        { name: 'Joule\'s Thermal Dissipation', formula: 'P = I² · R = V · I', unit: 'Watts (W)' }
      ],
      practice_questions: [
        {
          question: 'If a copper wire is cut into two equal halves, what happens to its resistivity (ρ)?',
          options: ['It halves', 'It doubles', 'It remains strictly unchanged', 'It becomes zero'],
          correct_index: 2,
          explanation: 'Resistivity (ρ) is an intrinsic material property. Cutting a wire alters its resistance, but copper remains copper, so ρ is unchanged.'
        },
        {
          question: 'A cylindrical conductor has its diameter doubled while length is fixed. New resistance will be:',
          options: ['1/2 of original', '1/4 of original', '2 times original', '4 times original'],
          correct_index: 1,
          explanation: 'Area is proportional to diameter squared (A ∝ d²). Doubling diameter quadruples area (4×), which cuts resistance to 1/4th.'
        }
      ]
    };
  }
};

// --- WEEKLY "YOU VS. LAST WEEK" REPORT ---
export const getWeeklyReport = async () => {
  try {
    const res = await axios.get(`${API_BASE}/reports/weekly`);
    return res.data;
  } catch (err) {
    return {
      student_name: 'Siddhi',
      period: 'Oct 8 – Oct 14 vs Previous Week',
      metrics: {
        study_hours: { this_week: 4.5, last_week: 2.8, unit: 'hours', change_pct: 60.7, positive: true },
        quiz_accuracy: { this_week: 78, last_week: 62, unit: '%', change_pct: 16.0, positive: true },
        topics_rescued: { this_week: 3, last_week: 1, unit: 'topics', change_pct: 200.0, positive: true },
        careless_mistakes: { this_week: 2, last_week: 6, unit: 'errors', change_pct: -66.7, positive: true },
        xp_earned: { this_week: 580, last_week: 390, unit: 'XP', change_pct: 48.7, positive: true }
      },
      coach_verdict: '🌟 Outstanding Growth, Siddhi! You reduced careless math mistakes by 66% and rescued 3 tough circuit topics. Your personal consistency beats any leaderboard!',
      next_milestone: 'Rescue \'Resistivity vs Resistance\' to reach Level 4 Quantum Scholar.'
    };
  }
};

export const claimQuest = async (questId) => {
  try {
    const res = await axios.post(`${API_BASE}/quests/claim/${questId}`);
    return res.data;
  } catch (err) {
    return { status: 'success', questId, total_xp: 620 };
  }
};

// --- SMART NOTES & LEGACY APIS ---
export const getNotes = async (topicId) => {
  try {
    const res = await axios.get(`${API_BASE}/notes/${topicId}`);
    return res.data.notes;
  } catch (err) {
    return [];
  }
};

export const createNote = async (noteData) => {
  try {
    const res = await axios.post(`${API_BASE}/notes`, noteData);
    return res.data.note;
  } catch (err) {
    return null;
  }
};

export const summarizeNotes = async (topicId, content = '') => {
  try {
    const res = await axios.post(`${API_BASE}/notes/summarize`, {
      topic_id: topicId,
      notes_content: content,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const submitDailyChallenge = async (selectedIndex) => {
  try {
    const res = await axios.post(`${API_BASE}/challenge/submit`, {
      selected_index: selectedIndex,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getReferences = async (topicId = 'topic-resistance') => {
  try {
    const res = await axios.get(`${API_BASE}/references/${topicId}`);
    return res.data;
  } catch (err) {
    return null;
  }
};
