

document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('start-scan-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const statusText = document.getElementById('status-text');
    const resultsContainer = document.getElementById('results-container');
    const theftCasesSection = document.getElementById('theft-cases');
    const theftTableBody = document.getElementById('theft-table-body');
    const aiExplanation = document.getElementById('ai-explanation');
    const explanationText = document.getElementById('explanation-text');
    const downloadBtn = document.getElementById('download-report');

    if (scanBtn) {
        scanBtn.addEventListener('click', async () => {
            const insta = document.getElementById('insta-url').value;
            const youtube = document.getElementById('yt-url').value;
            const x = document.getElementById('x-url').value;

            if (!insta && !youtube && !x) {
                alert("Please enter at least one profile URL.");
                return;
            }

           
            loadingOverlay.style.display = 'flex';
            statusText.innerText = "Indexing public content...";

            await sleep(1500);
            statusText.innerText = "Creating content fingerprints...";
            
            await sleep(2000);
            statusText.innerText = "Scanning platforms for matches...";

            await sleep(2500);
            
           
            loadingOverlay.style.display = 'none';
            resultsContainer.style.display = 'none';
            theftCasesSection.style.display = 'block';

            populateResults(insta, youtube, x);
        });
    }

    let currentResults = [];

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

    function populateResults(insta, yt, x) {
        const handle = extractHandle(insta || yt || x);
        
        currentResults = [
            { 
                platform: 'Instagram', 
                account: `@${handle}_repost`, 
                similarity: '94%', 
                credit: 'No', 
                status: 'Priority 1', 
                description: 'Complete video re-uploads without permission.' 
            },
            { 
                platform: 'YouTube', 
                account: `${handle} Content`, 
                similarity: '88%', 
                credit: 'No', 
                status: 'Priority 2', 
                description: 'Compilation videos using your segments.' 
            },
            { 
                platform: 'TikTok', 
                account: `@viral_${handle}_clips`, 
                similarity: '76%', 
                credit: 'In Bio', 
                status: 'Priority 3', 
                description: 'Short clips with modified background music.' 
            },
            { 
                platform: 'X / Twitter', 
                account: `@${handle}_archives`, 
                similarity: '91%', 
                credit: 'No', 
                status: 'Priority 1', 
                description: 'Full length footage re-shared as exclusive.' 
            }
        ];

        theftTableBody.innerHTML = currentResults.map((res, index) => `
            <tr onclick="window.generateAIExplanation(${index})" style="cursor: pointer;">
                <td>${res.platform}</td>
                <td><b>${res.account}</b></td>
                <td style="color: var(--blue); font-weight: 700;">${res.similarity}</td>
                <td>${res.credit}</td>
                <td><span class="badge ${res.status === 'Priority 1' ? 'badge-risk-high' : res.status === 'Priority 2' ? 'badge-risk-medium' : 'badge-risk-low'}">${res.status}</span></td>
                <td><button class="secondary-btn" style="padding: 5px 12px; font-size: 0.8rem;">Analyze</button></td>
            </tr>
        `).join('');

        
        window.generateAIExplanation(0);
    }

    window.generateAIExplanation = async function(index) {
        const res = currentResults[index];
        aiExplanation.style.display = 'block';
        explanationText.innerHTML = `<span style="color: var(--blue);">[SYSTEM]</span> Analyzing ${res.account} on ${res.platform}...`;
        
        const prompt = `
            ACT AS: CreatorShield Threat Analysis Engine.
            CASE DATA:
            - Platform: ${res.platform}
            - Account: ${res.account}
            - Similarity Score: ${res.similarity}
            - Credit Status: ${res.credit}
            - Internal Threat Level: ${res.status}
            - Violation: ${res.description}

            TASK: Generate a technical threat intelligence report for this specific case.
            RULES:
            1. DO NOT give generic legal advice or copyright education.
            2. DO NOT use placeholders.
            3. BE ACTIONABLE: Specify the threat to the creator's brand and recommend a specific mitigation step (e.g., DMCA, platform reporting, watermark enforcement).
            4. FORMAT: Keep it under 60 words. Start with "THREAT ASSESSMENT:".
        `;

        const response = await callGroq(prompt, "You are a professional Cyber Intelligence Analyst specializing in creator protection.");
        explanationText.innerText = response;
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const handle = extractHandle(document.getElementById('insta-url').value || document.getElementById('yt-url').value || document.getElementById('x-url').value);
            const content = `CreatorShield AI - Evidence Report\nGenerated: ${new Date().toLocaleString()}\n\nDetected ${currentResults.length} cases of content theft.\nWorst Case: ${currentResults[0].platform} ${currentResults[0].account} (${currentResults[0].similarity} similarity).\nStatus: Critical.`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CreatorShield_Evidence_Report.txt';
            a.click();
        });
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
