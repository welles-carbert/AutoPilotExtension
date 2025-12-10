// content.js

console.log("[Canva Copilot] content script loaded (SAAS WIRING)");

const BACKEND_URL =
    "https://congenial-space-memory-69x6r7vwp4rv2xggr-8000.app.github.dev/optimize-layout";

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[Canva Copilot] listener fired. Message:", message);

    if (message && message.type === "USER_GOAL") {
        const goal = message.goal || "";
        console.log("[Canva Copilot] Received goal from popup:", goal);

        // placeholder snapshot – we’ll make this smarter later
        const snapshot = {
            url: window.location.href,
            timestamp: Date.now(),
        };

        callBackend(goal, snapshot)
            .then((actions) => {
                console.log("[Canva Copilot] actions from backend:", actions);
                applyActions(actions);
                sendResponse({ ok: true });
            })
            .catch((err) => {
                console.error("[Canva Copilot] backend error:", err);
                sendResponse({ ok: false, error: String(err) });
            });

        // keep the message channel open for async
        return true;
    }

    return false;
});

async function callBackend(goal, snapshot) {
    console.log("[Canva Copilot] calling backend at", BACKEND_URL);

    const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, snapshot }),
    });

    if (!res.ok) {
        throw new Error("Backend responded with status " + res.status);
    }

    const data = await res.json();
    return data.actions || [];
}

function applyActions(actions) {
    if (!Array.isArray(actions)) {
        console.warn("[Canva Copilot] applyActions called with non-array:", actions);
        return;
    }

    for (const action of actions) {
        console.log("[Canva Copilot] applying action:", action);

        if (action.type === "highlight_canvas") {
            highlightCanvas();
        }

        if (action.type === "log_message" && action.text) {
            console.log("[Canva Copilot][AI]:", action.text);
        }
    }
}

function highlightCanvas() {
    console.log("[Canva Copilot] highlightCanvas() called");

    const existing = document.getElementById("canva-copilot-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "canva-copilot-overlay";

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(255, 0, 0, 0.35)";
    overlay.style.zIndex = String(2147483647);
    overlay.style.pointerEvents = "none";

    document.documentElement.appendChild(overlay);

    setTimeout(() => {
        const again = document.getElementById("canva-copilot-overlay");
        if (again) {
            again.remove();
            console.log("[Canva Copilot] overlay removed");
        }
    }, 600);
}

console.log("[Canva Copilot] end of file loaded");