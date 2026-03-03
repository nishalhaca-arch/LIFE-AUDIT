const QUESTIONS = {
    MIND: ["Do you control your phone usage?", "Can you sit alone for 20 mins?", "Do you finish what you start?", "Do you look at your mistakes first?", "Do you have a clear 3-year direction?", "Do you create more than you consume?", "Can you say “no” to distractions?", "Do you track your time?", "Do you act without motivation?", "Do you review your week?"],
    MONEY: ["Do you track expenses?", "Do you save 20%?", "Do you have emergency funds?", "Are you building a high-income skill?", "Do you understand investing?", "Do you avoid status spending?", "Do you have multiple income sources?", "Do you discuss money with experts?", "Do you invest in learning?", "Do you have a survival plan?"],
    SKILLS: ["Are you mastering one skill deeply?", "Do you practice daily?", "Can you explain your value?", "Have you built proof of work?", "Are you learning 2026 skills?", "Do you seek feedback?", "Are you comfortable charging?", "Do you collaborate?", "Do you track improvement?", "Can you adapt quickly?"],
    MANNER: ["Do you listen without interrupting?", "Can you accept criticism?", "Do you treat people respectfully?", "Do you apologize when wrong?", "Are you punctual?", "Do you maintain boundaries?", "Do you avoid gossip?", "Do you have confident body language?", "Can you disagree calmly?", "Are you reliable?"],
    MOVEMENT: ["Do you exercise 4x a week?", "Do you sleep 7-8 hours?", "Can you pass strength benchmarks?", "Do you walk 7k steps?", "Do you control junk food?", "Do you have good posture?", "Do you wake up energetic?", "Do you stretch weekly?", "Can you focus for 45 mins?", "Do you feel physically confident?"]
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
    else showResults();
}

function showResults() {
    document.getElementById('quiz').classList.remove('active');
    document.getElementById('results').classList.add('active');
    const level = getLevel(score);
    document.getElementById('final-score').innerText = score;
    document.getElementById('level-title').innerText = `LEVEL ${level.id}`;
    document.getElementById('truth-text').innerText = level.truth;
    document.getElementById('blueprint-list').innerHTML = level.blueprint.map(i => `<li>${i}</li>`).join('');
}

function getLevel(s) {
    if (s <= 15) return { id: 1, truth: "Passive Existence. You are a passenger in your own life.", blueprint: ["7-day digital detox", "Fix sleep schedule", "One daily hard task"] };
    if (s <= 30) return { id: 2, truth: "Inconsistent Growth. Mediocrity is your biggest risk.", blueprint: ["Time-block your day", "Cut junk food", "Read 10 pages daily"] };
    if (s <= 40) return { id: 3, truth: "Disciplined but Safe. You are avoiding the 1% risks.", blueprint: ["Find a mentor", "Increase output volume", "Fix 1% weaknesses"] };
    return { id: 4, truth: "Sovereign Execution. Do not let ego lead to complacency.", blueprint: ["Teach your systems", "10-year planning", "Build legacy"] };
}
