-- EduVision AI Seed Data
-- Topics: Electricity, Resistance, Ohm's Law, Voltage, Electric Current, Motion, Linear Equations

INSERT INTO subjects (id, title, icon, color, description, order_index) VALUES
('sci-physics', 'Physics', 'Zap', '#06b6d4', 'Explore forces, energy, circuits, and cosmic mechanics through live visual simulations.', 1),
('sci-chem', 'Chemistry', 'FlaskConical', '#a855f7', 'Demystify atoms, reactions, periodic trends, and molecular bonds.', 2),
('sci-bio', 'Biology', 'Dna', '#10b981', 'Journey through cells, photosynthesis, human genetics, and ecosystems.', 3),
('math-algebra', 'Mathematics', 'Compass', '#f59e0b', 'Conquer algebra, coordinate geometry, calculus, and mathematical modeling.', 4),
('cs-code', 'Computer Science', 'Code2', '#6366f1', 'Grok algorithms, data structures, logic gates, and computing foundations.', 5);

INSERT INTO topics (id, subject_id, title, category, level, summary, visual_type, real_world_analogy, formula, key_takeaways) VALUES
('topic-electricity', 'sci-physics', 'Electricity & Circuits', 'Electromagnetism', 'Intermediate', 'The fundamental flow of electric charge through conductive materials powering modern technology.', 'circuit_simulation', 'Like a closed loop of flowing water with a pump (battery) and waterwheel (lightbulb).', 'I = Q / t', 'Charge flows from higher potential to lower potential; current is measured in Amperes.'),
('topic-current', 'sci-physics', 'Electric Current', 'Electromagnetism', 'Beginner', 'The rate of flow of electric charges past a given point in an electric conductor.', 'electron_flow', 'The volume of water rushing through a canal every second.', 'I = V / R', 'Unit is Ampere (A). 1 Ampere = 1 Coulomb per second.'),
('topic-voltage', 'sci-physics', 'Voltage & Potential Difference', 'Electromagnetism', 'Beginner', 'The electrical pressure or work needed to move unit charge between two points.', 'pressure_gauge', 'The height of a water tower creating pressure that pushes water down the pipes.', 'V = W / Q', 'Measured in Volts (V). Higher voltage delivers more push to electrons.'),
('topic-resistance', 'sci-physics', 'Resistance & Resistivity', 'Electromagnetism', 'Intermediate', 'The opposition that a substance offers to the flow of electric current.', 'pipe_constriction', 'A narrow or gravel-filled pipe that slows down water flow and generates friction heat.', 'R = V / I = ρL / A', 'Measured in Ohms (Ω). Depends on length, cross-sectional area, material resistivity, and temperature.'),
('topic-ohms-law', 'sci-physics', 'Ohm''s Law', 'Electromagnetism', 'Intermediate', 'The direct proportional relationship between voltage, current, and electrical resistance.', 'triangular_slider', 'Pushing harder (more Voltage) creates more flow (Current), but friction (Resistance) reduces it.', 'V = I × R', 'Discovered by Georg Simon Ohm in 1827; fundamental law of electrical engineering.'),
('topic-electric-power', 'sci-physics', 'Electric Power & Energy', 'Electromagnetism', 'Intermediate', 'The rate at which electrical energy is transferred by an electric circuit.', 'power_meter', 'The rate at which a waterwheel grinds wheat or does useful work.', 'P = V × I = I²R = V² / R', 'Measured in Watts (W) or Kilowatt-hours (kWh) for domestic billing.');

-- Topic Relationships (Knowledge Graph)
INSERT INTO topic_relationships (id, topic_id, related_topic_id, relationship_type) VALUES
('rel-1', 'topic-electricity', 'topic-current', 'PART_OF'),
('rel-2', 'topic-electricity', 'topic-voltage', 'PART_OF'),
('rel-3', 'topic-electricity', 'topic-resistance', 'PART_OF'),
('rel-4', 'topic-current', 'topic-resistance', 'RELATED'),
('rel-5', 'topic-voltage', 'topic-resistance', 'RELATED'),
('rel-6', 'topic-resistance', 'topic-ohms-law', 'NEXT'),
('rel-7', 'topic-current', 'topic-ohms-law', 'PREREQUISITE'),
('rel-8', 'topic-voltage', 'topic-ohms-law', 'PREREQUISITE'),
('rel-9', 'topic-resistance', 'topic-ohms-law', 'PREREQUISITE'),
('rel-10', 'topic-ohms-law', 'topic-electric-power', 'NEXT');
