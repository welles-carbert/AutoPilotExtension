// content.js

console.log("[Canva Copilot] content script loaded (LOCAL VERSION)");

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[Canva Copilot] listener fired. Message:", message);

    if (message && message.type === "USER_GOAL") {
        console.log("[Canva Copilot] Received goal from popup:", message.goal);

        // SUPER OBVIOUS TEST
        alert("Canva Copilot LOCAL TEST.\n\nGoal: " + message.goal);

        sendResponse({ ok: true });
    }

    return true;
});

console.log("[Canva Copilot] end of file loaded");
