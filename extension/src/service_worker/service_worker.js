const START_PAGE_URL = import.meta.env.VITE_START_PAGE_URL;
const MAIN_PAGE_URL = import.meta.env.VITE_MAIN_PAGE_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* global chrome */

// ---------- 함수 정의 영역 ---------- //

// 웹의 시작 페이지를 새 탭으로 생성하는 함수
function redirectStartPage() {
    chrome.tabs.create({ url: START_PAGE_URL });
}

// 메시지에 포함된 토큰과 동기화 여부를 storage.local 에 저장하는 함수
async function storeAccessToken(message) {
    await chrome.storage.local.set({
        accessToken: message.token,
    });
}

// 메인 페이지로 북마크 동기화 성공 여부를 스토리지에 기록하는 함수
async function recordSyncSuccess() {
    await chrome.storage.local.set({
        syncSuccess: true,
    });
}

// 사용자의 토큰을 가져오는 함수
async function getUserToken() {
    try {
        const result = await chrome.storage.local.get({ accessToken: null });
        const accessToken = result.accessToken;

        if (!accessToken) throw new Error("토큰이 없습니다");
        return accessToken;
    } catch (error) {
        console.error("토큰 조회 실패:", error);
        throw error;
    }
}

// 전체 북마크 트리를 가져오는 함수
// 필요한 북마크 트리는 "기타 북마크" 폴더를 루트로 가지는 트리임
// 전체 북마크 트리에서 루트의 자식 노드 중 1번째 노드가 "기타 북마크" 에 해당
// 이 폴더에 유저가 추가한 전체 북마크가 저장되어있음
async function fetchBookmarkTree() {
    try {
        const bookmarkTree = await chrome.bookmarks.getTree();
        // 가져온 북마크 트리가 undefined, null, empty 라면 에러 처리
        if (!bookmarkTree?.length)
            throw new Error("기타 북마크 폴더를 찾을 수 없습니다.");
        return bookmarkTree;
    } catch (error) {
        console.error("북마크 조회 실패:", error);
        throw error;
    }
}

// 전체 북마크 트리를 백엔드로 전송하는 함수
async function sendAllBookmarks() {
    try {
        // 비동기적으로 토큰과 북마크 트리를 가져옴
        const tokenPromise = getUserToken();
        const bookmarkPromise = fetchBookmarkTree();

        // 위의 비동기 작업이 모두 완료될때까지는 기다림
        const [accessToken, bookmarkTree] = await Promise.all([
            tokenPromise,
            bookmarkPromise,
        ]);

        // 토큰과 북마크를 백엔드 API 로 전송
        const response = await fetch(`${API_BASE_URL}/bookmarks/sync`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(bookmarkTree),
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(`응답 상태: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// 북마크 관련 이벤트를 백엔드에 전송
// onCreated : id(string), bookmark(BookmarkTreeNode)
// onRemoved : id(string), removeInfo(object)
// onChanged : id(string), changeInfo(object)
// onMoved : id(string), moveInfo(object)
// async function syncBookmarkChanges(eventType, id, info) {
//     try {
//         const userToken = await getUserToken();
//         // 삭제 이벤트만 다르게 처리
//         const isRemove = (eventType === "remove");
//         const url = isRemove
//             ? `${API_BASE_URL}/bookmarks/temp1`
//             : `${API_BASE_URL}/bookmarks/temp2`;
//         // 삭제 이벤트는 DELETE, 나머지는 POST
//         const options = {
//             method: isRemove ? "DELETE" : "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${userToken}`
//             },
//             body: JSON.stringify({ eventType, id, info })
//         };

//         // 토큰과 이벤트를 백엔드 API 로 전송
//         const response = await fetch(url, options);

//         if (!response.ok) {
//             console.log(response);
//             throw new Error(`응답 상태: ${response.status}`);
//         }
//     }
//     catch (error) {
//         console.error(error);
//         return;
//     }
// }

// ---------- 이벤트 리스너 영역 ---------- //

// 북마크 추가, 삭제, 변경, 이동 이벤트를 정의한 배열
const bookmarkEvents = [
    { eventName: chrome.bookmarks.onCreated, eventType: "create" },
    { eventName: chrome.bookmarks.onRemoved, eventType: "remove" },
    { eventName: chrome.bookmarks.onChanged, eventType: "change" },
    { eventName: chrome.bookmarks.onMoved, eventType: "move" },
];

// 해당 이벤트들은 동일한 콜백 함수로 처리
bookmarkEvents.forEach(({ eventName, eventType }) => {
    eventName.addListener(async (id, info) => {
        // 비동기 함수를 처리할때까지 서비스 워커가 기다려야하므로 await 사용
        console.log(eventType);
        console.log(id);
        console.log(info);
        // await syncBookmarkChanges(eventType, id, info);
    });
});

// 확장 프로그램 프로세스 혹은 컨텐츠 스크립트에서 메시지가 전송될때 실행됨
chrome.runtime.onMessage.addListener(async (message) => {
    switch (message.type) {
        case "LOGIN_BUTTON_CLICKED":
            console.log("로그인 버튼 클릭 감지");
            redirectStartPage();
            break;

        default:
            throw new Error(`정의되지 않은 메시지 타입: ${message.type}`);
    }
});

// 다른 확장 프로그램이나 웹 페이지에서 메시지가 전송될 때 실행됨
chrome.runtime.onMessageExternal.addListener(async (message) => {
    switch (message.type) {
        case "LOGIN_SUCCESS":
            console.log("로그인 감지");
            await storeAccessToken(message);
            break;

        case "NEW_USER_DETECTION": {
            console.log("신규 유저 감지");
            const syncSuccess = await sendAllBookmarks();
            if (syncSuccess) {
                console.log("sendAllBookmarks 성공");
                await recordSyncSuccess();
            } 
            else
                console.error("sendAllBookmarks 실패");
            break;
        }

        default:
            throw new Error(`정의되지 않은 메시지 타입: ${message.type}`);
    }
});
