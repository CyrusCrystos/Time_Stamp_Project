// Helper: SHA-256 hash function
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Eco-impact estimation (should match backend)
function estimateEcoImpact(platform = "chatgpt", complexity = "medium") {
    const models = {
        chatgpt: { baseWater: 0.1, baseElectricity: 0.008, complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.5 } },
        claude:  { baseWater: 0.09, baseElectricity: 0.007, complexityMultiplier: { simple: 0.7, medium: 1.0, complex: 1.4 } },
        gemini:  { baseWater: 0.12, baseElectricity: 0.01, complexityMultiplier: { simple: 0.9, medium: 1.0, complex: 1.6 } }
    };
    const model = models[platform] || models["chatgpt"];
    return {
        energy: model.baseElectricity * model.complexityMultiplier[complexity],
        water: model.baseWater * model.complexityMultiplier[complexity]
    };
}

// Get Eco-Option from storage
function getEcoOption() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['ecoOption'], (result) => {
            resolve(result.ecoOption !== false); // Default ON
        });
    });
}

// Save eco stats to storage
function updateEcoStats(impact) {
    chrome.storage.local.get(['ecoStats'], (result) => {
        let stats = result.ecoStats || { energy: 0, water: 0, count: 0 };
        stats.energy += impact.energy;
        stats.water += impact.water;
        stats.count += 1;
        chrome.storage.local.set({ ecoStats: stats });
    });
}

// Platform detection
function detectPlatform() {
    if (location.hostname.includes("chat.openai.com")) return "chatgpt";
    if (location.hostname.includes("claude.ai")) return "claude";
    if (location.hostname.includes("gemini.google.com")) return "gemini";
    return "chatgpt";
}

// Insert "Stamply Timestamp" button into AI chat UIs
function insertStamplyButton() {
    // Example selector: update as needed for each platform
    document.querySelectorAll('.ai-message:not(.stamply-added)').forEach(msg => {
        const btn = document.createElement('button');
        btn.innerText = "Stamply Timestamp";
        btn.className = 'stamply-btn';
        btn.onclick = async () => {
            const content = msg.innerText;
            const hash = await sha256(content);
            // Call your backend
            const tsaResponse = await fetch('http://localhost:3000/api/timestamps', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({hash})
            });
            const {timestamp, signature} = await tsaResponse.json();
            // Eco-impact
            const ecoOption = await getEcoOption();
            let ecoInfo = '';
            if (ecoOption) {
                const platform = detectPlatform();
                const impact = estimateEcoImpact(platform, "medium");
                ecoInfo = `<div class="eco-impact">🌱 Saved: ${impact.energy.toFixed(3)} kWh, ${impact.water.toFixed(3)} L water</div>`;
                updateEcoStats(impact);
            }
            // Show result
            let result = document.createElement('div');
            result.className = 'stamply-result';
            result.innerHTML = `
                <div>Stamply Timestamp: <b>${timestamp}</b></div>
                <div>Signature: <code>${signature.slice(0, 32)}...</code></div>
                <div>Hash: <code>${hash}</code></div>
                ${ecoInfo}
            `;
            msg.appendChild(result);
        };
        msg.appendChild(btn);
        msg.classList.add('stamply-added');
    });
}

// Observe DOM for new messages
const observer = new MutationObserver(insertStamplyButton);
observer.observe(document.body, {childList: true, subtree: true});
insertStamplyButton();
