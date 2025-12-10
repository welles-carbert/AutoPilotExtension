// content.js

console.log("[Canva Copilot] content script loaded (LOCAL VERSION)");

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[Canva Copilot] listener fired. Message:", message);

    if (message && message.type === "USER_GOAL") {
        console.log("[Canva Copilot] Received goal from popup:", message.goal);

        // 🔴 Instead of alert, do a visual flash
        highlightCanvas();

        sendResponse({ ok: true });
    }

    return true;
});

function highlightCanvas() {
    console.log("[Canva Copilot] highlightCanvas() called");

    const overlay = document.createElement("div");
    overlay.id = "canva-copilot-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";

    // noticeable red tint
    overlay.style.background = "rgba(255, 0, 0, 0.35)";

    // max z-index so we sit above Canva UI
    overlay.style.zIndex = String(2147483647);
    overlay.style.pointerEvents = "none";

    document.documentElement.appendChild(overlay);

    // fade out & remove
    setTimeout(() => {
        const existing = document.getElementById("canva-copilot-overlay");
        if (existing) {
            existing.remove();
            console.log("[Canva Copilot] overlay removed");
        }
    }, 600);
}

console.log("[Canva Copilot] end of file loaded");

