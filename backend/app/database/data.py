"""
In-memory store and rich educational data for EduVision AI.
Pre-populated with Class 6-12 content and deep vertical slice for Physics -> Electricity -> Resistance.
"""

INITIAL_SUBJECTS = [
    {
        "id": "sci-physics",
        "title": "Physics",
        "category": "Science",
        "icon": "Zap",
        "color": "#06b6d4",
        "gradient": "from-cyan-500 to-blue-600",
        "description": "Explore forces, energy, circuits, and cosmic mechanics through live visual simulations.",
        "topics_count": 8,
        "mastery": 68
    },
    {
        "id": "sci-chem",
        "title": "Chemistry",
        "category": "Science",
        "icon": "FlaskConical",
        "color": "#a855f7",
        "gradient": "from-purple-500 to-indigo-600",
        "description": "Demystify atoms, periodic trends, chemical bonding, and acid-base reactions.",
        "topics_count": 6,
        "mastery": 42
    },
    {
        "id": "sci-bio",
        "title": "Biology",
        "category": "Science",
        "icon": "Dna",
        "color": "#10b981",
        "gradient": "from-emerald-500 to-teal-600",
        "description": "Journey through cellular structures, photosynthesis, human genetics, and ecosystems.",
        "topics_count": 7,
        "mastery": 80
    },
    {
        "id": "math-algebra",
        "title": "Mathematics",
        "category": "Mathematics",
        "icon": "Compass",
        "color": "#f59e0b",
        "gradient": "from-amber-500 to-orange-600",
        "description": "Conquer linear equations, quadratic polynomials, trigonometry, and coordinate geometry.",
        "topics_count": 9,
        "mastery": 55
    },
    {
        "id": "cs-code",
        "title": "Computer Science",
        "category": "Technology",
        "icon": "Code2",
        "color": "#6366f1",
        "gradient": "from-indigo-500 to-violet-600",
        "description": "Grok binary logic, algorithms, loops, and computational thinking step-by-step.",
        "topics_count": 5,
        "mastery": 30
    }
]

INITIAL_TOPICS = {
    "topic-resistance": {
        "id": "topic-resistance",
        "subject_id": "sci-physics",
        "title": "Resistance & Resistivity",
        "subject_name": "Physics",
        "category": "Electromagnetism",
        "level": "Classes 8–10 (Intermediate)",
        "summary": "Resistance is the inherent opposition a material offers against the flow of electric charges. It converts electrical energy into thermal energy through microscopic electron-ion collisions.",
        "visual_type": "pipe_circuit_hybrid",
        "formula": "R = V / I = ρ · (L / A)",
        "unit": "Ohm (Ω)",
        "prerequisites": [
            {"id": "topic-current", "title": "Electric Current (I)", "status": "completed"},
            {"id": "topic-voltage", "title": "Electric Potential / Voltage (V)", "status": "completed"}
        ],
        "related": [
            {"id": "topic-ohms-law", "title": "Ohm's Law (V = I·R)", "relationship": "NEXT CONCEPT"},
            {"id": "topic-electric-power", "title": "Joule Heating & Power (P = I²R)", "relationship": "APPLICATION"}
        ],
        "key_factors": [
            {"name": "Length of Conductor (L)", "effect": "R ∝ L", "desc": "Doubling length doubles resistance as electrons endure more atomic collisions."},
            {"name": "Cross-Sectional Area (A)", "effect": "R ∝ 1/A", "desc": "Thicker wires provide more parallel pathways, drastically cutting down resistance."},
            {"name": "Nature of Material (ρ)", "effect": "Resistivity", "desc": "Copper and Silver have ultra-low resistivity (~10⁻⁸ Ω·m); Nichrome and Rubber have high resistivity."},
            {"name": "Temperature (T)", "effect": "R increases with T in metals", "desc": "Thermal vibrations in the metal lattice cause more frequent electron scattering."}
        ],
        "real_world_analogy": {
            "title": "The Water Pipe Constriction Analogy",
            "wide_pipe": "A wide, smooth pipe allows huge volumes of water to surge freely with minimal resistance.",
            "narrow_pipe": "A constricted or pebble-filled pipe chokes the flow, creating back-pressure and requiring immense effort to pass liquid.",
            "conclusion": "Voltage is the water pressure, current is the flow rate of water, and resistance is the pipe's narrow constriction!"
        },
        "practice_challenge": {
            "title": "⚡ Micro-Lab: The Nichrome Resistor",
            "prompt": "A heating wire of length L and area A has resistance 10 Ω. If you stretch it to twice its length (2L) keeping volume constant, its area halves (A/2). What is its new resistance?",
            "options": ["10 Ω", "20 Ω", "40 Ω", "5 Ω"],
            "correct_index": 2,
            "explanation": "Since R = ρ(L/A), new R' = ρ(2L / (A/2)) = 4 · [ρ(L/A)] = 4 × 10 Ω = 40 Ω! Stretching quadruples resistance."
        },
        "references": {
            "videos": [
                {
                    "id": "vid-1",
                    "title": "How Electricity Actually Works",
                    "channel": "Veritasium",
                    "url": "https://www.youtube.com/watch?v=bHIhgxav9LY",
                    "duration": "14 mins",
                    "type": "Intuitive Visual",
                    "desc": "Mind-bending visual breakdown of electron fields, wire boundaries, and energy transmission."
                },
                {
                    "id": "vid-2",
                    "title": "Electric Current, Resistance & Resistivity",
                    "channel": "Khan Academy",
                    "url": "https://www.youtube.com/watch?v=F1p3742G83E",
                    "duration": "11 mins",
                    "type": "Curriculum Lesson",
                    "desc": "Step-by-step mathematical derivation of R = ρ(L/A) with worked numerical problems."
                },
                {
                    "id": "vid-3",
                    "title": "Electric Current: Crash Course Physics #28",
                    "channel": "CrashCourse",
                    "url": "https://www.youtube.com/watch?v=HXOok3mfMLM",
                    "duration": "10 mins",
                    "type": "Animated Overview",
                    "desc": "Fun, high-energy animation explaining charge drift, battery EMF, and circuit flow."
                }
            ],
            "books": [
                {
                    "id": "bk-1",
                    "title": "NCERT Class 10 Science",
                    "chapter": "Chapter 12: Electricity (§12.1 – §12.5)",
                    "author": "NCERT Board",
                    "url": "https://ncert.nic.in/textbook.php?jesc1=12-16",
                    "pages": "pp. 199–209",
                    "recommended_for": "Core Board Syllabus & Standard Exam Problems"
                },
                {
                    "id": "bk-2",
                    "title": "Concepts of Physics (Vol. 2)",
                    "chapter": "Chapter 32: Electric Current in Conductors",
                    "author": "Dr. H.C. Verma",
                    "url": "https://www.google.com/search?q=HC+Verma+Electric+Current+in+Conductors",
                    "pages": "pp. 172–195",
                    "recommended_for": "Deep Microscopic Physics & Conceptual Clarity"
                },
                {
                    "id": "bk-3",
                    "title": "The Feynman Lectures on Physics",
                    "chapter": "Vol II, Chapter 19: The Principle of Least Action",
                    "author": "Richard P. Feynman",
                    "url": "https://www.feynmanlectures.caltech.edu/",
                    "pages": "Online Open Access",
                    "recommended_for": "Advanced Inquisitive Explorers"
                }
            ],
            "websites": [
                {
                    "id": "web-1",
                    "title": "PhET Circuit Construction Kit (DC)",
                    "platform": "University of Colorado Boulder",
                    "url": "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc",
                    "badge": "Interactive Simulator",
                    "desc": "Build virtual series and parallel circuits with real-time ammeters, voltmeters, and resistors."
                },
                {
                    "id": "web-2",
                    "title": "HyperPhysics: Resistance & Resistivity",
                    "platform": "Georgia State University",
                    "url": "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/resis.html",
                    "badge": "Concept Map Portal",
                    "desc": "Comprehensive clickable concept map covering temperature coefficients and material resistivities."
                },
                {
                    "id": "web-3",
                    "title": "Khan Academy Circuits Mastery Unit",
                    "platform": "Khan Academy",
                    "url": "https://www.khanacademy.org/science/physics/circuits-topic",
                    "badge": "Practice & Quizzes",
                    "desc": "Complete guided practice exercises with hint breakdowns and mastery checklists."
                }
            ]
        }
    },
    "topic-electricity": {
        "id": "topic-electricity",
        "subject_id": "sci-physics",
        "title": "Electricity & Electric Circuits",
        "subject_name": "Physics",
        "category": "Electromagnetism",
        "level": "Classes 8–10",
        "summary": "The flow of electrical energy through connected conductive paths driven by potential differences.",
        "visual_type": "circuit_simulation",
        "formula": "I = Q / t",
        "unit": "Ampere (A)"
    },
    "topic-current": {
        "id": "topic-current",
        "subject_id": "sci-physics",
        "title": "Electric Current",
        "subject_name": "Physics",
        "category": "Electromagnetism",
        "level": "Classes 7–9",
        "summary": "The net rate of flow of electric charges through a cross-section of a conductor.",
        "visual_type": "electron_flow",
        "formula": "I = Q / t = n·A·e·v_d",
        "unit": "Ampere (A)"
    },
    "topic-voltage": {
        "id": "topic-voltage",
        "subject_id": "sci-physics",
        "title": "Voltage & Potential Difference",
        "subject_name": "Physics",
        "category": "Electromagnetism",
        "level": "Classes 7–9",
        "summary": "Work done per unit charge in moving an electric charge from one point to another.",
        "visual_type": "pressure_gauge",
        "formula": "V = W / Q",
        "unit": "Volt (V)"
    },
    "topic-ohms-law": {
        "id": "topic-ohms-law",
        "subject_id": "sci-physics",
        "title": "Ohm's Law",
        "subject_name": "Physics",
        "category": "Electromagnetism",
        "level": "Classes 8–10",
        "summary": "Electric current passing through a conductor between two points is directly proportional to voltage across the two points at constant temperature.",
        "visual_type": "interactive_triangle",
        "formula": "V = I × R",
        "unit": "V (Volts)"
    },
    "topic-electric-power": {
        "id": "topic-electric-power",
        "subject_id": "sci-physics",
        "title": "Electric Power & Joule Heating",
        "subject_name": "Physics",
        "category": "Electromagnetism",
        "level": "Classes 9–10",
        "summary": "The rate at which electrical energy is consumed or dissipated as heat in a resistor.",
        "visual_type": "power_gauge",
        "formula": "P = V·I = I²R = V²/R",
        "unit": "Watt (W)"
    }
}

KNOWLEDGE_GRAPH_NODES = [
    {"id": "topic-electricity", "label": "Electricity", "category": "Core Domain", "level": "Level 1", "x": 380, "y": 40, "color": "#06b6d4"},
    {"id": "topic-current", "label": "Electric Current (I)", "category": "Charge Flow", "level": "Prerequisite", "x": 160, "y": 160, "color": "#38bdf8"},
    {"id": "topic-voltage", "label": "Voltage / Potential (V)", "category": "Driving Force", "level": "Prerequisite", "x": 380, "y": 160, "color": "#818cf8"},
    {"id": "topic-resistance", "label": "Resistance (R)", "category": "Opposition", "level": "Focus Concept ⭐", "x": 600, "y": 160, "color": "#f43f5e", "is_focus": True},
    {"id": "topic-ohms-law", "label": "Ohm's Law (V=I·R)", "category": "Governing Law", "level": "Synthesis", "x": 380, "y": 300, "color": "#10b981"},
    {"id": "topic-electric-power", "label": "Electric Power (P=I²R)", "category": "Application", "level": "Mastery", "x": 380, "y": 430, "color": "#f59e0b"}
]

KNOWLEDGE_GRAPH_EDGES = [
    {"id": "e1", "source": "topic-electricity", "target": "topic-current", "label": "manifests as"},
    {"id": "e2", "source": "topic-electricity", "target": "topic-voltage", "label": "driven by"},
    {"id": "e3", "source": "topic-electricity", "target": "topic-resistance", "label": "moderated by"},
    {"id": "e4", "source": "topic-current", "target": "topic-ohms-law", "label": "flows through"},
    {"id": "e5", "source": "topic-voltage", "target": "topic-ohms-law", "label": "pushes through"},
    {"id": "e6", "source": "topic-resistance", "target": "topic-ohms-law", "label": "opposes in"},
    {"id": "e7", "source": "topic-ohms-law", "target": "topic-electric-power", "label": "dissipates as"}
]

INITIAL_NOTES = [
    {
        "id": "note-1",
        "topic_id": "topic-resistance",
        "title": "Key Resistance Formula & Factors",
        "category": "formula",
        "content": "R = ρ · (L / A)\n• Doubling length (L) doubles resistance.\n• Doubling diameter quadruples cross-section area (A), reducing resistance to 1/4!\n• Resistivity (ρ) depends purely on material structure and temperature.",
        "created_at": "Today, 10:15 AM",
        "tags": ["Physics", "Formula", "Exams"]
    },
    {
        "id": "note-2",
        "topic_id": "topic-resistance",
        "title": "Water Pipe Mental Model",
        "category": "personal",
        "content": "Remember: High resistance = narrow, sandy pipe.\nLow resistance = wide, pristine pipe.\nCurrent is water flow rate (liters/sec), Voltage is hydrostatic pressure pump.",
        "created_at": "Today, 10:45 AM",
        "tags": ["Analogy", "Intuition"]
    }
]

INITIAL_QUIZZES = {
    "topic-resistance": [
        {
            "id": "q1",
            "question": "What happens to the resistance of a cylindrical copper wire if its length is doubled and its radius is halved?",
            "options": [
                "Resistance increases by 2 times",
                "Resistance increases by 4 times",
                "Resistance increases by 8 times",
                "Resistance remains unchanged"
            ],
            "correct_index": 2,
            "explanation": "Resistance is R ∝ L / A. When radius is halved, area becomes (1/2)² = 1/4 of original. Thus R' = 2L / (A/4) = 8 × (L/A) = 8 times greater!",
            "difficulty": "hard",
            "xp": 60
        },
        {
            "id": "q2",
            "question": "According to the water-pipe analogy for electrical circuits, what corresponds to electrical 'Voltage'?",
            "options": [
                "The narrowness of the pipe constriction",
                "The water pressure pushing through the pipe",
                "The volume of water exiting per second",
                "The mineral deposits inside the pipe"
            ],
            "correct_index": 1,
            "explanation": "Voltage is electrical potential difference or pressure that drives charges. Water pressure provided by a pump or water tower is the direct hydraulic equivalent.",
            "difficulty": "easy",
            "xp": 40
        },
        {
            "id": "q3",
            "question": "If a resistor of 12 Ω is connected across a 24 V battery, how much electric current flows through it?",
            "options": ["0.5 A", "2.0 A", "288 A", "12 A"],
            "correct_index": 1,
            "explanation": "From Ohm's Law V = I · R, we find I = V / R = 24 V / 12 Ω = 2.0 Amperes.",
            "difficulty": "medium",
            "xp": 50
        }
    ]
}

USER_PROFILE = {
    "name": "Siddhi",
    "avatar": "https://api.dicebear.com/7.x/bottts/svg?seed=Siddhi",
    "class_level": "Class 10",
    "board": "CBSE",
    "target_subject": "Physics",
    "language": "English", # English | Hindi | Hinglish | Marathi
    "explanation_style": "cricket", # cricket | eli5 | story | steps | formula
    "streak_days": 4,
    "streak_shield": True,
    "xp": 580,
    "level": 3,
    "level_title": "Circuit Conqueror",
    "next_level_xp": 800,
    "missions": [
        {
            "id": "m1",
            "title": "Complete 1 Practice Quiz on Resistance",
            "xp": 40,
            "completed": False,
            "category": "quiz"
        },
        {
            "id": "m2",
            "title": "Review 1 Weak Topic in Rescue Loop",
            "xp": 35,
            "completed": False,
            "category": "rescue"
        },
        {
            "id": "m3",
            "title": "Check Prerequisite Gap: Class 8 Inverse Proportions",
            "xp": 25,
            "completed": True,
            "category": "prereq"
        }
    ],
    "badges": [
        {"id": "b-1", "title": "Hydraulic Mind", "desc": "Understood Voltage as Water Pressure", "icon": "Droplets", "unlocked": True, "date": "Yesterday"},
        {"id": "b-2", "title": "Mistake Detective", "desc": "Analyzed and recovered from 3 quiz misreads", "icon": "CheckCircle2", "unlocked": True, "date": "2 days ago"},
        {"id": "b-3", "title": "Night Rescue Hero", "desc": "Completed a 2-Hour Emergency Rescue sprint", "icon": "Flame", "unlocked": True, "date": "Last week"},
        {"id": "b-4", "title": "Ohm's Master", "desc": "Scored 100% on Circuit Mastery quiz", "icon": "Zap", "unlocked": False, "progress": "2/3 quests done"}
    ],
    "weekly_progress": [
        {"day": "Mon", "minutes": 35, "xp": 120},
        {"day": "Tue", "minutes": 45, "xp": 150},
        {"day": "Wed", "minutes": 20, "xp": 80},
        {"day": "Thu", "minutes": 55, "xp": 180},
        {"day": "Fri", "minutes": 15, "xp": 50},
        {"day": "Sat", "minutes": 0, "xp": 0},
        {"day": "Sun", "minutes": 0, "xp": 0}
    ],
    "active_courses": [
        {"id": "sci-physics", "topic": "Electricity & Resistance", "progress": 68, "icon": "Zap", "color": "#06b6d4"},
        {"id": "math-algebra", "topic": "Linear Equations", "progress": 40, "icon": "Compass", "color": "#f59e0b"},
        {"id": "sci-bio", "topic": "Cell Structure & Energy", "progress": 82, "icon": "Dna", "color": "#10b981"}
    ],
    "daily_challenge": {
        "title": "🚗 The Speed Challenge",
        "description": "A remote-controlled rover accelerates across a lab track: Distance = 120m, Time = 8 seconds. What is its average speed?",
        "options": ["12 m/s", "15 m/s", "18 m/s", "20 m/s"],
        "correct_index": 1,
        "explanation": "Speed = Distance / Time = 120m / 8s = 15 m/s!",
        "xp_reward": 50
    }
}

# --- DYNAMIC RESCUE LOOP STUDY PLAN ---
INITIAL_RESCUE_PLAN = [
    {
        "id": "rp-1",
        "title": "Wire Geometry & Radius-Squared Rule",
        "reason": "Recent quiz error: confused wire diameter with wire area",
        "mistake_type": "concept_gap",
        "suggested_action": "Review 2-minute formula drill: Area A = π·r²",
        "estimated_minutes": 10,
        "completed": False,
        "urgency": "high"
    },
    {
        "id": "rp-2",
        "title": "Unit Prefix Conversion: mm² to m²",
        "reason": "Careless calculation error in resistivity numericals",
        "mistake_type": "careless_mistake",
        "suggested_action": "Solve 2 rapid practice items on 10⁻⁶ area multiplier",
        "estimated_minutes": 8,
        "completed": False,
        "urgency": "medium"
    },
    {
        "id": "rp-3",
        "title": "Ohm's Law: Read 'Constant Temperature' Constraint",
        "reason": "Misread question condition regarding non-ohmic heating",
        "mistake_type": "misread_question",
        "suggested_action": "Read the 1-minute key caveat note on temperature coefficients",
        "estimated_minutes": 5,
        "completed": True,
        "urgency": "low"
    }
]

# --- CHAPTER QUIZZES WITH DIFFICULTY, HINTS, & MISTAKE TYPES ---
CHAPTER_QUIZZES = {
    "topic-resistance": {
        "title": "Electricity: Resistance & Ohm's Law",
        "foundation": [
            {
                "id": "q-res-f1",
                "question": "What is the SI unit of electrical resistance?",
                "options": ["Ampere (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
                "correct_index": 2,
                "hint": "Named after Georg Simon Ohm, the German physicist who formulated V = IR.",
                "mistake_types": {0: "concept_gap", 1: "misread_question", 3: "concept_gap"},
                "explanation": "Resistance is measured in Ohms (symbol: Ω). Amperes measure current, Volts measure potential difference, and Watts measure power.",
                "xp": 30
            },
            {
                "id": "q-res-f2",
                "question": "If you double the length of a wire keeping its thickness unchanged, its resistance will:",
                "options": ["Double", "Halve", "Become four times", "Remain unchanged"],
                "correct_index": 0,
                "hint": "Resistance is directly proportional to conductor length (R ∝ L).",
                "mistake_types": {1: "concept_gap", 2: "careless_mistake", 3: "misread_question"},
                "explanation": "Because R = ρ(L/A), doubling L directly doubles the number of atomic collisions, thereby doubling resistance.",
                "xp": 30
            }
        ],
        "standard": [
            {
                "id": "q-res-s1",
                "question": "What happens to the resistance of a cylindrical copper wire if its length is doubled and its radius is halved?",
                "options": [
                    "Resistance increases by 2 times",
                    "Resistance increases by 4 times",
                    "Resistance increases by 8 times",
                    "Resistance remains unchanged"
                ],
                "correct_index": 2,
                "hint": "Area A = π·r². If radius halves, Area becomes 1/4th. Combine with doubling length!",
                "mistake_types": {0: "concept_gap", 1: "careless_mistake", 3: "concept_gap"},
                "explanation": "R = ρ(L/A). Doubling length gives 2L. Halving radius makes Area = π(r/2)² = A/4. So R' = ρ(2L / (A/4)) = 8 × (ρL/A) = 8 times greater!",
                "xp": 50
            },
            {
                "id": "q-res-s2",
                "question": "A 12 Ω resistor is connected across a 24 V battery. What is the current flowing?",
                "options": ["0.5 A", "2.0 A", "288 A", "12 A"],
                "correct_index": 1,
                "hint": "Apply Ohm's Law: V = I × R, so I = V / R.",
                "mistake_types": {0: "careless_mistake", 2: "careless_mistake", 3: "misread_question"},
                "explanation": "From Ohm's Law, I = V / R = 24 V / 12 Ω = 2.0 Amperes.",
                "xp": 45
            }
        ],
        "challenge": [
            {
                "id": "q-res-c1",
                "question": "A uniform wire of resistance 20 Ω is stretched uniformly until its length increases by 25%. Its new resistance is approximately:",
                "options": ["25.0 Ω", "31.25 Ω", "40.0 Ω", "50.0 Ω"],
                "correct_index": 1,
                "hint": "When stretched, volume V = L × A is constant. If L increases by 1.25×, A must decrease to A / 1.25!",
                "mistake_types": {0: "concept_gap", 2: "careless_mistake", 3: "misread_question"},
                "explanation": "Volume is conserved: V = L·A. If L' = 1.25 L, then A' = A / 1.25. New R' = ρ(1.25 L / (A/1.25)) = (1.25)² R = 1.5625 × 20 Ω = 31.25 Ω.",
                "xp": 75
            }
        ]
    },
    "topic-optics": {
        "title": "Optics: Reflection & Refraction of Light",
        "foundation": [
            {
                "id": "q-opt-f1",
                "question": "When light travels from air into glass, which quantity remains strictly unchanged?",
                "options": ["Speed", "Wavelength", "Frequency", "Direction"],
                "correct_index": 2,
                "hint": "Frequency is determined exclusively by the light source, not the medium.",
                "mistake_types": {0: "concept_gap", 1: "concept_gap", 3: "misread_question"},
                "explanation": "Frequency is an intrinsic property of the light wave emitter and never changes during refraction. Speed and wavelength both decrease in denser media.",
                "xp": 35
            }
        ],
        "standard": [
            {
                "id": "q-opt-s1",
                "question": "An object is placed at 2F in front of a convex lens. The image formed is:",
                "options": [
                    "Virtual, erect, and magnified",
                    "Real, inverted, and same size at 2F",
                    "Real, inverted, and diminished at F",
                    "Virtual, inverted, and diminished"
                ],
                "correct_index": 1,
                "hint": "Think of the symmetrical 1:1 ray diagram for a magnifying lens.",
                "mistake_types": {0: "concept_gap", 2: "careless_mistake", 3: "misread_question"},
                "explanation": "For an object at 2F of a convex lens, refracted rays converge exactly at 2F on the other side, forming a real, inverted image of identical size.",
                "xp": 50
            }
        ],
        "challenge": [
            {
                "id": "q-opt-c1",
                "question": "A concave mirror produces an image 3 times magnified on a screen. If the screen is 60 cm from the mirror, what is the focal length?",
                "options": ["-15 cm", "-20 cm", "-30 cm", "-45 cm"],
                "correct_index": 0,
                "hint": "Image on a screen means it is real, so magnification m = -v/u = -3. Find u, then apply 1/f = 1/v + 1/u.",
                "mistake_types": {1: "careless_mistake", 2: "concept_gap", 3: "misread_question"},
                "explanation": "m = -v/u = -3. Since screen is at v = -60 cm, u = -20 cm. Mirror formula: 1/f = 1/(-60) + 1/(-20) = -4/60 = -1/15. Hence f = -15 cm.",
                "xp": 75
            }
        ]
    },
    "topic-linear": {
        "title": "Mathematics: Linear Equations in Two Variables",
        "foundation": [
            {
                "id": "q-lin-f1",
                "question": "What is the graphical representation of a linear equation ax + by + c = 0?",
                "options": ["A straight line", "A parabola", "A circle", "An ellipse"],
                "correct_index": 0,
                "hint": "Linear equations have degree 1.",
                "mistake_types": {1: "concept_gap", 2: "concept_gap", 3: "misread_question"},
                "explanation": "Any first-degree polynomial equation in two variables represents a straight line on the Cartesian plane.",
                "xp": 30
            }
        ],
        "standard": [
            {
                "id": "q-lin-s1",
                "question": "The pair of linear equations 2x + 3y = 9 and 4x + 6y = 18 has:",
                "options": [
                    "A unique solution",
                    "Infinitely many solutions",
                    "No solution",
                    "Exactly two solutions"
                ],
                "correct_index": 1,
                "hint": "Check the ratios of coefficients: a1/a2, b1/b2, and c1/c2.",
                "mistake_types": {0: "careless_mistake", 2: "concept_gap", 3: "concept_gap"},
                "explanation": "a1/a2 = 2/4 = 1/2, b1/b2 = 3/6 = 1/2, c1/c2 = 9/18 = 1/2. Since all ratios are equal (coincident lines), there are infinitely many solutions.",
                "xp": 45
            }
        ],
        "challenge": [
            {
                "id": "q-lin-c1",
                "question": "For what value of k will the system of equations kx + 3y = k - 3 and 12x + ky = k have NO solution?",
                "options": ["k = 6", "k = -6", "k = 0", "k = 3"],
                "correct_index": 1,
                "hint": "Condition for no solution: a1/a2 = b1/b2 ≠ c1/c2. Notice k² = 36 gives k = ±6. Which one makes c1/c2 different?",
                "mistake_types": {0: "careless_mistake", 2: "concept_gap", 3: "misread_question"},
                "explanation": "k/12 = 3/k -> k² = 36 -> k = ±6. For k = 6: c1/c2 = 3/6 = 1/2 = a1/a2 (infinite solutions). For k = -6: c1/c2 = -9/-6 = 3/2 ≠ -6/12 = -1/2. Thus k = -6 has NO solution.",
                "xp": 75
            }
        ]
    }
}

# --- DEADLINE DOCTOR (EXAMS & HOMEWORK COUNTDOWN) ---
INITIAL_DEADLINES = [
    {
        "id": "dl-1",
        "title": "Physics Midterm Board Exam",
        "type": "exam",
        "subject": "Physics",
        "target_date": "2026-10-26T09:00:00",
        "days_left": 12,
        "urgency": "critical",
        "weightage": "40% Marks",
        "syllabus": ["Electricity & Circuits", "Ohm's Law & Resistance", "Heating Effects & Power"],
        "daily_rescue_plan": "35 mins: Revise R = ρ(L/A) derivations + 1 practice check"
    },
    {
        "id": "dl-2",
        "title": "Maths Quadratic Equations Assignment",
        "type": "homework",
        "subject": "Mathematics",
        "target_date": "2026-10-18T18:00:00",
        "days_left": 4,
        "urgency": "approaching",
        "weightage": "School Internal",
        "syllabus": ["Roots of Quadratic", "Discriminant Method", "Word Problems"],
        "daily_rescue_plan": "20 mins: Solve 4 discriminant and root nature questions"
    },
    {
        "id": "dl-3",
        "title": "Chemistry Periodic Classification Test",
        "type": "exam",
        "subject": "Chemistry",
        "target_date": "2026-11-04T10:00:00",
        "days_left": 21,
        "urgency": "on_track",
        "weightage": "20% Marks",
        "syllabus": ["Modern Periodic Table", "Atomic Radius Trends", "Electronegativity"],
        "daily_rescue_plan": "15 mins: Read NCERT Chapter 5 summary table"
    }
]

# --- WEAK TOPIC DETECTOR ---
INITIAL_WEAK_TOPICS = [
    {
        "id": "wt-1",
        "topic": "Resistivity (ρ) vs Resistance (R)",
        "subject": "Physics",
        "mastery": 38,
        "severity": "critical",
        "common_mistake": "Believing cutting a wire changes its intrinsic resistivity ρ.",
        "prerequisite_gap_id": "pr-1",
        "quick_fix_tip": "Resistance depends on geometry (L and A); Resistivity ρ is material identity (copper is copper)."
    },
    {
        "id": "wt-2",
        "topic": "Wire Stretching & Radius-Squared Rule",
        "subject": "Physics",
        "mastery": 45,
        "severity": "medium",
        "common_mistake": "Forgetting that Area A = π·r², so halving radius reduces area by 4×!",
        "prerequisite_gap_id": "pr-2",
        "quick_fix_tip": "When radius is halved, area becomes 1/4th, making resistance 4× higher."
    },
    {
        "id": "wt-3",
        "topic": "Parallel Circuit Reciprocal Sums",
        "subject": "Physics",
        "mastery": 52,
        "severity": "medium",
        "common_mistake": "Adding resistances directly instead of 1/Req = 1/R1 + 1/R2.",
        "prerequisite_gap_id": "pr-3",
        "quick_fix_tip": "Parallel branches always lower the total resistance below any individual branch."
    }
]

# --- PREREQUISITE GAP FINDER ---
PREREQUISITE_TRACES = {
    "topic-resistance": {
        "target_concept": "Class 10: Resistance of Conductors & Factors (R = ρ·L/A)",
        "ladder": [
            {
                "grade": "Class 10",
                "concept": "Electrical Resistance & Ohm's Law (V = IR)",
                "status": "in_progress",
                "summary": "Opposition to electron drift caused by metallic lattice ion vibrations."
            },
            {
                "grade": "Class 8",
                "concept": "Direct & Inverse Proportions (Math)",
                "status": "gap_detected",
                "warning": "Root Gap Detected Here! If denominator (Area) increases, ratio decreases.",
                "remedy": "Interactive 1-minute slider: watch R drop as denominator A grows."
            },
            {
                "grade": "Class 7",
                "concept": "Electric Currents & Closed Circuits",
                "status": "mastered",
                "summary": "Charges require unbroken conductive loops to circulate."
            },
            {
                "grade": "Class 6",
                "concept": "Conductors vs Insulators",
                "status": "mastered",
                "summary": "Metals permit free electron drift; rubber and glass bind charges tightly."
            }
        ]
    }
}

# --- 2-HOUR RESCUE MODE PLAN ---
RESCUE_MODE_2HOUR = {
    "title": "⚡ 2-Hour Emergency Exam Rescue Plan",
    "subtitle": "High-yield, zero-fluff emergency sprint for upcoming tests",
    "total_minutes": 120,
    "phases": [
        {
            "id": "p1",
            "phase": "Phase 1: 0 – 30 mins",
            "title": "Must-Know Formula & Units Cheatsheet",
            "badge": "30 mins",
            "color": "cyan",
            "items": [
                "Ohm's Law: V = I · R (SI: Volts = Amperes × Ohms)",
                "Conductor Resistance: R = ρ · (L / A) (SI of ρ: Ω·m)",
                "Joule's Heating Law: H = I² · R · t",
                "Electrical Power: P = V · I = I² · R = V² / R (SI: Watts)"
            ]
        },
        {
            "id": "p2",
            "phase": "Phase 2: 30 – 75 mins",
            "title": "Top 3 High-Probability Derivations",
            "badge": "45 mins",
            "color": "amber",
            "items": [
                "Derivation: Equivalent resistance for resistors in parallel (1/Rp = 1/R1 + 1/R2)",
                "Classic Exam Problem: Wire stretched to double length with volume conservation (R becomes 4×)",
                "Experimental Verification: V vs I slope gives resistance R"
            ]
        },
        {
            "id": "p3",
            "phase": "Phase 3: 75 – 105 mins",
            "title": "Common Pitfalls & Trap Avoidance",
            "badge": "30 mins",
            "color": "rose",
            "items": [
                "⚠️ Pitfall 1: Cutting wire in half cuts length (L/2) so R halves, but resistivity ρ NEVER changes!",
                "⚠️ Pitfall 2: Don't forget to convert mm² to m² (1 mm² = 10⁻⁶ m²).",
                "⚠️ Pitfall 3: In parallel, voltage is identical across each resistor; current divides."
            ]
        },
        {
            "id": "p4",
            "phase": "Phase 4: 105 – 120 mins",
            "title": "Calm Strategy & Final Recall",
            "badge": "15 mins",
            "color": "emerald",
            "items": [
                "Write units for every single numerical answer (missing 'Ω' loses 0.5 marks).",
                "Draw circuit diagram with neat battery polarity signs (+ and -).",
                "2 minutes of steady breathing: You've got this!"
            ]
        }
    ]
}

# --- WEEKLY 'YOU VS LAST WEEK' REPORT (HEALTHY GAMIFICATION) ---
WEEKLY_REPORT = {
    "student_name": "Siddhi",
    "period": "Oct 8 – Oct 14 vs Previous Week",
    "metrics": {
        "study_hours": {"this_week": 4.5, "last_week": 2.8, "unit": "hours", "change_pct": 60.7, "positive": True},
        "quiz_accuracy": {"this_week": 78, "last_week": 62, "unit": "%", "change_pct": 16.0, "positive": True},
        "topics_rescued": {"this_week": 3, "last_week": 1, "unit": "topics", "change_pct": 200.0, "positive": True},
        "careless_mistakes": {"this_week": 2, "last_week": 6, "unit": "errors", "change_pct": -66.7, "positive": True},
        "xp_earned": {"this_week": 580, "last_week": 390, "unit": "XP", "change_pct": 48.7, "positive": True}
    },
    "coach_verdict": "🌟 Outstanding Growth, Siddhi! You reduced careless math mistakes by 66% and rescued 3 tough circuit topics. Your personal consistency beats any leaderboard!",
    "next_milestone": "Rescue 'Resistivity vs Resistance' to reach Level 4 Quantum Scholar."
}
