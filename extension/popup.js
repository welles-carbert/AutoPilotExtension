// popup.js

document.getElementById("run").addEventListener("click", async () => {
    const goal = document.getElementById("goal").value.trim();
    if (!goal) return;

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) {
            console.warn("[Canva Copilot] No active tab found");
            return;
        }

        chrome.tabs.sendMessage(
            tab.id,
            { type: "USER_GOAL", goal },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("[Canva Copilot] Could not reach content script:", chrome.runtime.lastError.message);
                } else {
                    console.log("[Canva Copilot] Content script responded:", response);
                }
            }
        );
    } catch (err) {
        console.error("[Canva Copilot] Error in popup:", err);
    }
});
