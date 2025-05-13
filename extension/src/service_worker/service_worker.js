const START_PAGE_URL = import.meta.env.VITE_START_PAGE_URL;
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
        userToken: message.token,
        hasSynced: message.hasSynced
    });
}

// 전체 북마크를 전송한 적이 있는지 판별하는 함수
async function hasSentAllBookmarks() {
    const { hasSynced } = await chrome.storage.local.get("hasSynced");
    return hasSynced === true;
}

// 사용자의 토큰을 가져오는 함수
async function getUserToken() {
    try {
        const result = await chrome.storage.local.get({ userToken: null });
        const userToken = result.userToken;

        if (!userToken)
            throw new Error("토큰이 없습니다");
        return userToken;
    }
    catch(error) {
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
    }
    catch(error) {
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
        const [userToken, bookmarkTree] = await Promise.all([tokenPromise, bookmarkPromise]);

        // 토큰과 북마크를 백엔드 API 로 전송
        const response = await fetch(`${API_BASE_URL}/bookmarks/sync`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(bookmarkTree)
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(`응답 상태: ${response.status}`);
        }
        
        // 성공적으로 전송을 마친 뒤에는 hasSynced 플래그를 갱신
        await chrome.storage.local.set({ hasSynced: true });
    }
    catch (error) {
        console.error(error);
        return;
    }
}

// 북마크 관련 이벤트를 백엔드에 전송
// onCreated : id(string), bookmark(BookmarkTreeNode)
// onRemoved : id(string), removeInfo(object)
// onChanged : id(string), changeInfo(object)
// onMoved : id(string), moveInfo(object)
async function syncBookmarkChanges(eventType, id, info) {
    try {
        const userToken = await getUserToken();
        // 삭제 이벤트만 다르게 처리
        const isRemove = (eventType === "remove");
        const url = isRemove
            ? `${API_BASE_URL}/bookmarks/temp1`
            : `${API_BASE_URL}/bookmarks/temp2`;
        // 삭제 이벤트는 DELETE, 나머지는 POST
        const options = {
            method: isRemove ? "DELETE" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({ eventType, id, info })
        };

        // 토큰과 이벤트를 백엔드 API 로 전송
        const response = await fetch(url, options);

        if (!response.ok) {
            console.log(response);
            throw new Error(`응답 상태: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
        return;
    }
}



// ---------- 이벤트 리스너 영역역 ---------- // 



// 북마크 추가, 삭제, 변경, 이동 이벤트를 정의한 배열
const bookmarkEvents = [
    {eventName: chrome.bookmarks.onCreated, eventType: "create"},
    {eventName: chrome.bookmarks.onRemoved, eventType: "remove"},
    {eventName: chrome.bookmarks.onChanged, eventType: "change"},
    {eventName: chrome.bookmarks.onMoved, eventType: "move"}
];

// 해당 이벤트들은 동일한 콜백 함수로 처리
bookmarkEvents.forEach(({ eventName, eventType }) => {
    eventName.addListener(async (id, info) => {
        // 비동기 함수를 처리할때까지 서비스 워커가 기다려야하므로 await 사용
        await syncBookmarkChanges(eventType, id, info);
    })
});

// 확장 프로그램 프로세스 혹은 컨텐츠 스크립트에서 메시지가 전송될때 실행됨
chrome.runtime.onMessage.addListener(async message => {
    switch (message.type) {
        case "LOGIN_BUTTON_CLICKED":
            redirectStartPage();
            break;

        case "MAIN_PAGE_VISTED": {
            const hasSent = await hasSentAllBookmarks();
            if (!hasSent)
                await sendAllBookmarks();
            break;
        }
        default:
            throw new Error(`정의되지 않은 메시지 타입: ${message.type}`);
    }
});

// 다른 확장 프로그램이나 웹 페이지에서 메시지가 전송될 때 실행됨
chrome.runtime.onMessageExternal.addListener(async message => {
    switch (message.type) {
        case "SET_JWT":
            await storeAccessToken(message);
            break;
        default:
            throw new Error(`정의되지 않은 메시지 타입: ${message.type}`);
    }
});