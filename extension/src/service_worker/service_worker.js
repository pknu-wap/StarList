const LOGIN_PAGE_URL = import.meta.env.VITE_LOGIN_PAGE_URL;
const ALLOWED_URL     = import.meta.env.VITE_ALLOWED_URL;

/* global chrome */

// 1. 로그인 버튼 클릭시 로그인 웹페이지로 redirect
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == 'LOGIN_BUTTON_CLICKED') {
        // create() 가 비동기 API 라서 해당 함수 내부의 콜백 함수를 실행하기 위해서는
        // 콜백 함수 실행 시점까지 service worker 가 살아있어야 함
        chrome.tabs.create({ url:LOGIN_PAGE_URL }, () => {
            if (chrome.runtime.lastError) {
                // 탭 생성 실패 시
                sendResponse({
                  success: false,
                  error: chrome.runtime.lastError.message
                });
            }
            else
                sendResponse({ success: true }); 
        })
        // 따라서, 명시적으로 service worker 가 살아있게 하기 위해 return true 를 사용
        return true;
    }
});

// 2. 웹페이지에서 로그인 성공에 대한 메시지 전송시 JWT, hasSynced 저장
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.type == 'SET_JWT') {
        if (!sender.url.startsWith(ALLOWED_URL)) {
            sendResponse({ success:false });
            return false;
        }

        chrome.storage.local.set({ userToken:message.token, hasSynced:message.hasSynced }, () => {
            sendResponse({ success:true })
        });
        return true;
    }
});