function handleAnswer(pts) {
    score += pts;
    currentStep++;
    if (currentStep < 10) {
        updateQuestion();
    } else {
        // Show the data gate instead of results
        document.getElementById('quiz').classList.remove('active');
        document.getElementById('data-gate').classList.add('active');
    }
}

function saveDataAndShowResults() {
    const name = document.getElementById('user-name').value;
    const age = document.getElementById('user-age').value;
    const status = document.getElementById('user-status').value;
    const email = document.getElementById('user-email').value;

    if (!name || !age || !status || !email) {
        alert("Please fill all fields to receive your audit.");
        return;
    }

    // 1. Store the data in LocalStorage (you can see this in your browser)
    const userData = { name, age, status, email, score, pillar: currentPillar, date: new Date().toLocaleDateString() };
    localStorage.setItem('last_audit', JSON.stringify(userData));

    // 2. Transition to Results
    document.getElementById('data-gate').classList.remove('active');
    showResults();
}
