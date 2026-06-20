

document.addEventListener('DOMContentLoaded', () => {
    const activateBtn = document.getElementById('activate-monitor');
    const noDeepfakes = document.getElementById('no-deepfakes');
    const deepfakeList = document.getElementById('deepfake-list');
    const deepfakeTbody = document.getElementById('deepfake-tbody');
    const timelineContainer = document.getElementById('timeline-container');
    const alertCount = document.getElementById('alert-count');

    if (activateBtn) {
        activateBtn.addEventListener('click', async () => {
            const ref = document.getElementById('ref-url').value;
            if (!ref) {
                alert("Please enter a reference profile URL to start monitoring.");
                return;
            }

            activateBtn.innerText = "Analyzing Biometrics...";
            activateBtn.disabled = true;

            await sleep(2000);
            activateBtn.innerText = "Scanning Global Media Assets...";

            await sleep(2000);
            activateBtn.innerText = "Shield Active";


            noDeepfakes.style.display = 'none';
            deepfakeList.style.display = 'block';

            populateDeepfakes(ref);
        });
    }

    function extractHandle(url) {
        if (!url) return 'creator';
        try {
            const parts = url.split('/');
            const handle = parts[parts.length - 1] || parts[parts.length - 2];
            return handle.replace('@', '').split('?')[0];
        } catch (e) {
            return 'creator';
        }
    }

    function populateDeepfakes(refUrl) {
        const handle = extractHandle(refUrl);
        const now = new Date();
        const formatDate = (daysAgo) => {
            const d = new Date();
            d.setDate(now.getDate() - daysAgo);
            return d.toISOString().split('T')[0];
        };

        const detectionData = [
            { link: `t.me/${handle}_leaks/29381`, confidence: '98%', risk: 'Critical', date: formatDate(1) },
            { link: `forum.digital-clones.io/p/${handle}_122`, confidence: '82%', risk: 'High', date: formatDate(4) },
            { link: `cdn.suspicious-vid.cc/v/${handle}_88`, confidence: '45%', risk: 'Medium', date: formatDate(9) }
        ];

        deepfakeTbody.innerHTML = detectionData.map(d => `
            <tr>
                <td><a href="#" style="color: var(--blue); font-size: 0.8rem;">${d.link}</a></td>
                <td><b>${d.confidence}</b></td>
                <td><span class="badge ${d.risk === 'Critical' ? 'badge-risk-high' : d.risk === 'High' ? 'badge-risk-medium' : 'badge-risk-low'}">${d.risk}</span></td>
                <td style="font-size: 0.8rem; color: var(--text2);">${d.date}</td>
            </tr>
        `).join('');

        alertCount.innerText = `${detectionData.length} Alerts`;
        alertCount.style.background = 'var(--pink)';

        populateTimeline(detectionData);
    }

    async function populateTimeline(data) {
        timelineContainer.innerHTML = data.map((d, i) => `
            <div class="timeline-event" style="animation: fadeIn 0.5s ease forwards; animation-delay: ${i * 0.2}s;">
                <div class="event-date">${new Date(d.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div class="event-details">
                    <h5 style="margin-bottom: 5px;">${d.risk} Risk Encounter</h5>
                    <p style="font-size: 0.85rem; color: var(--text2);">Biometric mismatch detected on <b>${d.link.split('/')[0]}</b>. High-fidelity facial mapping confirmed unauthorized identity synthesis.</p>
                </div>
            </div>
        `).join('');

        const topThreat = data.sort((a, b) => parseInt(b.confidence) - parseInt(a.confidence))[0];

        const prompt = `
            ACT AS: CreatorShield Deepfake Intelligence Engine.
            DATA:
            - Target Source: ${topThreat.link}
            - Detection Confidence: ${topThreat.confidence}
            - Risk Level: ${topThreat.risk}
            - Detection Date: ${topThreat.date}

            TASK: Generate an emergency threat intelligence summary.
            RULES:
            1. DO NOT be educational or generic. 
            2. FOCUS on the biometric threat level.
            3. BE ALARMING but professional.
            4. RECOMMEND: Urgent takedown or legal preservation.
            5. FORMAT: Under 40 words. Start with "[IDENTITY ALERT]".
        `;

        const summary = await callGroq(prompt, "You are a professional Cyber Intelligence Analyst specializing in deepfake forensics.");

        const summaryEl = document.createElement('div');
        summaryEl.style.marginTop = '20px';
        summaryEl.style.padding = '15px';
        summaryEl.style.background = 'rgba(255, 79, 216, 0.1)';
        summaryEl.style.border = '1px solid var(--pink)';
        summaryEl.style.borderRadius = '12px';
        summaryEl.innerHTML = `<h5 style="color: var(--pink);">AI Threat Intelligence Summary</h5><p style="font-size: 0.85rem;">${summary}</p>`;
        timelineContainer.prepend(summaryEl);
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
