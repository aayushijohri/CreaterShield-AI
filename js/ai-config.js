const GROQ_CONFIG = {
    apiKey: '', 
    model: 'llama-3.3-70b-versatile', 
    endpoint: 'https://api.groq.com/openai/v1/chat/completions'
};

/**
 * Call Groq API for analysis
 * @param {string} prompt - The prompt to send to the AI
 * @param {string} systemMessage - Optional system instructions
 * @returns {Promise<string>} - The AI response
 */
async function callGroq(prompt, systemMessage = "You are the CreatorShield AI Core. Analyze threats with high precision.") {
    console.log(" [Groq API] Initializing request...");
    console.log(" [Groq API] Endpoint:", GROQ_CONFIG.endpoint);
    console.log(" [Groq API] Model:", GROQ_CONFIG.model);

    if (!GROQ_CONFIG.apiKey || GROQ_CONFIG.apiKey.trim() === '') {
        console.warn("[Groq API] API Key is missing or empty. Falling back to simulation.");
        return simulateAIResponse(prompt);
    }

    try {
        console.log(" [Groq API] Sending request to Groq...");
        
        const response = await fetch(GROQ_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_CONFIG.apiKey.trim()}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: GROQ_CONFIG.model,
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7
            })
        });

        console.log(" [Groq API] Response received. Status:", response.status, response.statusText);

        const data = await response.json();
        
        if (!response.ok) {
            console.error("[Groq API] Error Response Data:", data);
            const errorMessage = data.error ? data.error.message : JSON.stringify(data);
            return `Groq API Error (${response.status}): ${errorMessage}`;
        }

        console.log("[Groq API] Success! Parsing content...");
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            console.error("[Groq API] Unexpected response format:", data);
            return "Error: Unexpected response format from Groq API.";
        }

    } catch (error) {
        console.error("[Groq API] Fetch Exception:", error);
        return `Connection Error: ${error.message}. Please check your internet or CORS settings.`;
    }
}


function simulateAIResponse(prompt) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (prompt.toLowerCase().includes("similarity")) {
                resolve("Analysis indicates a 94% similarity in content structure and audio fingerprinting. This suggests a direct unauthorized reupload from the original source.");
            } else if (prompt.toLowerCase().includes("scam")) {
                resolve("Confidence Level: 98%. The detected giveaway campaign matches known fraudulent patterns, including 'send money to receive more' and unauthorized use of your brand assets.");
            } else if (prompt.toLowerCase().includes("summary")) {
                resolve("Threat level elevated due to active impersonation across three platforms. Content protection systems have flagged 84 unique theft instances.");
            } else {
                resolve("CreatorShield AI has analyzed the input. All systems nominal. Continuous monitoring active.");
            }
        }, 1500);
    });
}
