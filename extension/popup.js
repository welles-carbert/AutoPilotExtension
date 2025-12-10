document.getElementById("run").addEventListener("click", async () => {
    const goal = document.getElementById("goal").value.trim();
    if (!goal) return;

    // find current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    // send message into the content script in that tab
    chrome.tabs.sendMessage(tab.id, {
        type: "USER_GOAL",
        goal
    });
});
