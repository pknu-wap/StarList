/* global chrome */


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
      case 'buttonClick':
        console.log('버튼 클릭 이벤트 처리:', message.data);
        // 버튼 클릭에 대한 작업 수행
        sendResponse({ status: 'buttonClick received' });
        break;
      
      case 'anotherEvent':
        console.log('다른 이벤트 처리:', message.data);
        // 다른 이벤트에 대한 작업 수행
        sendResponse({ status: 'anotherEvent received' });
        break;
      
      default:
        console.log('알 수 없는 액션:', message.action);
        sendResponse({ status: 'unrecognized action' });
    }
    // 비동기로 응답할 필요가 없으면 false를 리턴해 종료합니다.
    return false;
  });
  