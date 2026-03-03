{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const QUESTIONS = \{\
    MIND: ["Do you control your phone usage, or does it control you?", "Can you sit alone for 20 minutes without stimulation?", "Do you finish what you start?", "When something goes wrong, do you first look at your mistake?", "Do you have a clear 3-year direction?", "Do you consume more content than you create?", "Can you say \'93no\'94 when something affects your goals?", "Do you track your time daily?", "Do you act even when you don\'92t feel motivated?", "Do you review your week every Sunday?"],\
    MONEY: ["Do you track your monthly expenses?", "Do you save at least 20% of your income?", "Do you have 3\'966 months of emergency fund?", "Are you building a high-income skill?", "Do you understand basic investing?", "Do you avoid buying things to impress others?", "Are you building more than one income source?", "Do you discuss money with financially smarter people?", "Do you invest in learning, not just entertainment?", "If your job disappears tomorrow, do you have a survival plan?"],\
    SKILLS: ["Are you currently mastering one skill deeply?", "Do you practice your core skill daily?", "Can you clearly explain what value you provide?", "Have you built a portfolio or proof of work?", "Are you learning skills relevant to 2026 market demand?", "Do you seek feedback on your work?", "Are you comfortable charging for your skill?", "Do you collaborate with skilled people?", "Do you track improvement in your skill?", "If the market changes, can you adapt quickly?"],\
    MANNER: ["Do you listen without interrupting?", "Can you accept criticism without becoming defensive?", "Do you treat people respectfully regardless of status?", "Do you apologize when wrong?", "Are you punctual?", "Do you maintain professional boundaries?", "Do you avoid gossip?", "Do you maintain confident body language?", "Can you disagree calmly?", "Are you considered reliable?"],\
    MOVEMENT: ["Do you exercise at least 4 times a week?", "Do you sleep 7\'968 hours consistently?", "Can you perform basic strength benchmarks?", "Do you walk at least 7,000 steps daily?", "Do you control junk food intake?", "Do you maintain good posture?", "Do you wake up feeling energetic?", "Do you stretch weekly?", "Can you focus 45 minutes without physical restlessness?", "Do you feel physically confident in demanding activities?"]\
\};\
\
let currentPillar = "MIND";\
let currentStep = 0;\
let score = 0;\
\
window.onload = () => \{\
    const params = new URLSearchParams(window.location.search);\
    const p = params.get('pillar')?.toUpperCase();\
    if (p && QUESTIONS[p]) currentPillar = p;\
    document.getElementById('landing-title').innerText = `$\{currentPillar\} AUDIT`;\
\};\
\
function startAudit() \{\
    document.getElementById('landing').classList.remove('active');\
    document.getElementById('quiz').classList.add('active');\
    updateQuestion();\
\}\
\
function updateQuestion() \{\
    document.getElementById('question-text').innerText = QUESTIONS[currentPillar][currentStep];\
    document.getElementById('q-number').innerText = `STEP $\{currentStep + 1\} OF 10`;\
    document.getElementById('progress-bar').style.width = `$\{(currentStep / 10) * 100\}%`;\
\}\
\
function handleAnswer(pts) \{\
    score += pts;\
    currentStep++;\
    if (currentStep < 10) updateQuestion();\
    else showResults();\
\}\
\
function showResults() \{\
    document.getElementById('quiz').classList.remove('active');\
    document.getElementById('results').classList.add('active');\
    const level = getLevel(score);\
    document.getElementById('final-score').innerText = score;\
    document.getElementById('level-title').innerText = `LEVEL $\{level.id\}`;\
    document.getElementById('truth-text').innerText = level.truth;\
    document.getElementById('blueprint-list').innerHTML = level.blueprint.map(i => `<li>$\{i\}</li>`).join('');\
\}\
\
function getLevel(s) \{\
    if (s <= 15) return \{ id: 1, truth: "You are currently a passenger in your own life. High dopamine dependency is killing your potential.", blueprint: ["Delete social media for 7 days", "Wake up at 6 AM", "Cold shower daily"] \};\
    if (s <= 30) return \{ id: 2, truth: "You are inconsistent. You have bursts of energy but no discipline. Mediocrity is your biggest risk.", blueprint: ["Track every hour in a journal", "No junk food for 30 days", "Read 10 pages of a book daily"] \};\
    if (s <= 40) return \{ id: 3, truth: "You are disciplined but safe. You are in the top 10%, but you are avoiding the 1% risks required for greatness.", blueprint: ["Find a high-level mentor", "Double your output volume", "Identify and fix your 1% weaknesses"] \};\
    return \{ id: 4, truth: "Sovereign Execution. You control your impulses and environment. Do not let ego lead to complacency.", blueprint: ["Teach your systems to others", "Plan for a 10-year horizon", "Optimize for legacy"] \};\
\}}