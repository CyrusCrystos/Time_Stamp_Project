// Load and display eco stats
function loadStats() {
    chrome.storage.local.get(['ecoStats'], (result) => {
        const stats = result.ecoStats || { energy: 0, water: 0, count: 0 };
        document.getElementById('stats').innerHTML = `
            <div><b>Timestamps:</b> ${stats.count}</div>
            <div class="eco"><b>Total Energy Saved:</b> ${stats.energy.toFixed(3)} kWh</div>
            <div class="eco"><b>Total Water Saved:</b> ${stats.water.toFixed(3)} L</div>
        `;
    });
}

// Eco-Option toggle logic
document.getElementById('ecoOption').addEventListener('change', function() {
    chrome.storage.local.set({ ecoOption: this.checked });
});

// Load toggle state and stats on popup open
chrome.storage.local.get(['ecoOption'], (result) => {
    document.getElementById('ecoOption').checked = result.ecoOption !== false; // Default ON
    loadStats();
});
