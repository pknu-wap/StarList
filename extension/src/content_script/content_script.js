/* global chrome */

// 메인 페이지가 로드되면 서비스 워커에 메시지를 전송
window.addEventListener("load", () => {
    chrome.runtime.sendMessage({
        type: "MAIN_PAGE_VISTED",
        url: window.location.href
    });
});