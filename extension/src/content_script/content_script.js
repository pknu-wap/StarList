/* global chrome */

chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === "local" && changes.syncSuccess) {
            console.log('syncSuccess 감지:', changes.syncSuccess);
            window.postMessage({
                type: "SYNC_SUCCESS"
            })
        }
    }
)