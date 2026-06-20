

document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const aiAnalysisPanel = document.getElementById('ai-scam-analysis');
    const analysisText = document.getElementById('scam-explanation-text');
    const queryInput = document.getElementById('protection-query');

    async function performAnalysis(query, type = "User Input") {
        analyzeBtn.innerText = "Analyzing Patterns...";
        analyzeBtn.disabled = true;

        aiAnalysisPanel.style.display = 'block';
        analysisText.innerHTML = `<span style="color: var(--blue);">[SEC-LOG]</span> Evaluating signature for: ${query}...`;

        const prompt = `
            ACT AS: CreatorShield Brand Protection Specialist.
            INPUT: "${query}"
            CONTEXT: ${type}

            TASK: Conduct a brand threat assessment.
            RULES:
            1. CLASSIFY as Impersonation, Phishing, or Scam.
            2. DO NOT use generic or educational tone.
            3. HIGHLIGHT the specific risk to the creator's community or reputation.
            4. RECOMMEND exactly one mitigation tactic.
            5. FORMAT: Under 50 words. Start with "BRAND THREAT ASSESSMENT:".
        `;

        const response = await callGroq(prompt, "You are a professional Cyber Intelligence Analyst specializing in brand security.");
        analysisText.innerText = response;
        analyzeBtn.innerText = "Analyze Threat";
        analyzeBtn.disabled = false;
    }

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const query = queryInput.value;
            if (!query) {
                alert("Please enter a username or suspicious text to analyze.");
                return;
            }
            performAnalysis(query, "Manual Inquiry");
        });
    }

    const items = document.querySelectorAll('.scam-item, .account-item');
    items.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const name = item.querySelector('h4').innerText;
            const subtitle = item.querySelector('p').innerText;
            performAnalysis(`${name} (${subtitle})`, "System Flagged Threat");
        });
    });
});
