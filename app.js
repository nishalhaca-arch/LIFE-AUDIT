// YOUR UNIQUE GOOGLE DATA BRIDGE
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYbGXVkPDwPyNu02DNuaQAqMwmjf8cI18U-hNDLf5Ctt3IXvtpisAHwTi7zm8YnV6d/exec';

const QUESTIONS = {
    MIND: ["Do you control your phone usage, or does it control you?", "Can you sit alone for 20 minutes without stimulation?", "Do you finish what you start?", "When something goes wrong, do you first look at your mistake?", "Do you have a clear 3-year direction?", "Do you consume more content than you create?", "Can you say “no” when something affects your goals?", "Do you track your time daily?", "Do you act even when you don’t feel motivated?", "Do you review your week every Sunday?"],
    MONEY: ["Do you track your monthly expenses?", "Do you save at least 20% of your income?", "Do you have 3–6 months of emergency fund?", "Are you building a high-income skill?", "Do you understand basic investing?", "Do you avoid buying things to impress others?", "Are you building more than one income source?", "Do you discuss money with financially smarter people?", "Do you invest in learning, not just entertainment?", "If your job disappears tomorrow, do you have a survival plan?"],
    SKILLS: ["Are you currently mastering one skill deeply?", "Do you practice your core skill daily?", "Can you clearly explain what value you provide?", "Have you built a portfolio or proof of work?", "Are you learning skills relevant to 2026 market demand?", "Do you seek feedback on your work?", "Are you comfortable charging for your skill?", "Do you collaborate with skilled people?", "Do you track improvement in your skill?", "If the market changes, can you adapt quickly?"],
    MANNER: ["Do you listen without interrupting?", "Can you accept criticism without becoming defensive?", "Do you treat people respectfully regardless of status?", "Do you apologize when wrong?", "Are you punctual?", "Do you maintain professional boundaries?", "Do you avoid gossip?", "Do you maintain confident body language?", "Can you disagree calmly?", "Are you considered reliable?"],
    MOVEMENT: ["Do you exercise at least 4 times a week?", "Do you sleep 7–8 hours consistently?", "Can you perform basic strength benchmarks?", "Do you walk at least 7,000 steps daily?", "Do you control junk food intake?", "Do you maintain good posture?", "Do you wake up feeling energetic?", "Do you stretch weekly?", "Can you focus 45 minutes without physical restlessness?", "Do you feel physically confident in demanding activities?"]
};

let currentPillar = "MIND";
let currentStep = 0;
let score = 0;

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('pillar')?.toUpperCase();
    if (p && QUESTIONS[p]) currentPillar = p;
    document.getElementById('landing-title').innerText = `${currentPillar} AUDIT`;
};

function startAudit() {
    document.getElementById('landing').classList.remove('active');
    document.getElementById('quiz').classList.add('active');
    updateQuestion();
}

function updateQuestion() {
    document.getElementById('question-text').innerText = QUESTIONS[currentPillar][currentStep];
    document.getElementById('q-number').innerText = `STEP ${currentStep + 1} OF 10`;
    document.getElementById('progress-bar').style.width = `${(currentStep / 10) * 100}%`;
}

function handleAnswer(pts) {
    score += pts;
    currentStep++;
    if (currentStep < 10) updateQuestion();
    else {
        document.getElementById('quiz').classList.remove('active');
        document.getElementById('data-gate').classList.add('active');
    }
}

async function saveDataAndShowResults() {
    const name = document.getElementById('user-name').value;
    const age = document.getElementById('user-age').value;
    const status = document.getElementById('user-status').value;
    const email = document.getElementById('user-email').value;
    const mobile = document.getElementById('user-mobile').value;

    if (!name || !age || !status || !email || !mobile) {
        alert("All fields are required to generate your audit.");
        return;
    }

    const formData = {
        Name: name, Age: age, Status: status, Email: email, 
        Mobile: mobile, Pillar: currentPillar, Score: score, Level: getLevel(score).id
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(formData) });
        document.getElementById('data-gate').classList.remove('active');
        showResults();
    } catch (e) { alert("Error connecting. Please try again."); }
}

function showResults() {
    document.getElementById('results').classList.add('active');
    const lvl = getLevel(score);
    document.getElementById('final-score').innerText = score;
    document.getElementById('level-title').innerText = `LEVEL ${lvl.id}`;
    document.getElementById('truth-text').innerText = lvl.truth;
    document.getElementById('blueprint-list').innerHTML = lvl.blueprint.map(i => `<li>${i}</li>`).join('');
}

function getLevel(s) {
    if (s <= 15) return { id: 1, truth: "You are a passenger in your own life. High dopamine dependency is killing your focus.", blueprint: ["7-day social media fast", "Wake up at 6 AM", "Plan every hour of tomorrow"] };
    if (s <= 30) return { id: 2, truth: "Inconsistent efforts. You have potential, but you are choosing comfort over growth.", blueprint: ["Track every expense/hour", "No junk food for 30 days", "Read 10 pages of non-fiction daily"] };
    if (s <= 40) return { id: 3, truth: "Disciplined but safe. You are doing well, but avoiding the hard 1% changes for greatness.", blueprint: ["Find a mentor in your pillar", "Identify your top 3 weaknesses", "Increase work volume by 20%"] };
    return { id: 4, truth: "Sovereign Execution. You control your environment. Maintain discipline to prevent ego from taking over.", blueprint: ["Teach your systems to others", "Plan for 10-year horizons", "Optimize for physical and mental longevity"] };
}
