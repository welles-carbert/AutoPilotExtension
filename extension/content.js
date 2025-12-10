console.log("[Canva Copilot] content script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "USER_GOAL") {
        console.log("[Canva Copilot] Received goal from popup:", message.goal);

        // Later:
        // 1) read Canva layout
        // 2) send to backend
        // 3) apply actions
        sendResponse({ ok: true });
    }
});
