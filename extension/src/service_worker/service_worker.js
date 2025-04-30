const LOGIN_PAGE_URL = import.meta.env.VITE_LOGIN_PAGE_URL;
const ALLOWED_URL     = import.meta.env.VITE_ALLOWED_URL;

/* global chrome */

// 로그인 버튼 클릭시 로그인 웹페이지로 redirect
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

    else if (message.type === 'SYNC_START_BUTTON_CLICKED') {
        // 응답 상태를 "LOADING" 으로 설정
        chrome.storage.local.set({ syncStatus:'LOADING', syncError:null });

        // chrome.bookmarks.getTree 를 활용하여 북마크 트리 전체 읽기
        chrome.bookmarks.getTree((bookmarkTree) => {
            const bookmarks = [];
            traverseTree(bookmarkTree, bookmarks);

            // 이후 백엔드 API 로 전체 북마크 리스트를 전송
            // 함수 선언문을 괄호로 붙여 즉시 실행 함수로 변환
            (async () => {
                try 
                {
                    const response = await fetch(
                        'https://api.example.com/bookmarks/sync',
                        {
                        method: 'POST',
                        body: JSON.stringify({ data:bookmarks }),
                        }
                    );

                    const result = await response.json();

                    if (result.code != 'SUCCESS') {
                        throw new Error(result.message);
                    }
                    // 성공 처리
                    chrome.storage.local.set({ syncStatus:'SUCCESS' });
                } 
                catch (err) 
                {
                    // 실패 처리
                    chrome.storage.local.set({
                        syncStatus:'FAIL',
                        syncError:err.message,
                    });
                }
            }) ();
        });
        // 비동기 작업 처리를 위해 service worker 가 살아있게 하기 위해 return true 를 사용
        return true;
    }
});


// 웹페이지에서 로그인 성공에 대한 메시지 전송시 JWT, hasSynced 저장
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

// 재귀 순회 함수 정의
function traverseTree(tree, list) {
    for (const node of tree) {
        // primary key 에 해당하는 (id, title) 이 있는 노드만 전체 북마크 리스트에 저장
        if (node.id && node.title) {
            // 전체 북마크 리스트에 추가
            list.push({
                id:                 parseInt(node.id),                   // int -> Long
                title:              node.title,                          // String
                url:                node.url,                            // String
                dateAdded:          node.dateAdded || null,              // Int
                dateGroupModified:  node.dateGroupModified || null,      // Int
                dateLastUsed:       node.dateLastUsed || null,           // Int
                index:              node.index,                          // Int
                parentId:           node.parentId,                       // String
                parentType:         null,                                // 존재하지 않는 속성
                syncing:            node.syncing,                        // Boolean
                keywords:           []                                   // List<String>
            });
        }
        if (node.children) {
            traverseTree(node.children);
        }
    }
}