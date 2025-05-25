import fetchNodesByPath from "./fetchNodesByPath";

const EXT_ID = import.meta.env.VITE_EXTENSION_ID;

// 루트의 자식 노드들의 리스트를 반환하는 함수
// 이 함수는 useQuery 의 queryFn 값으로 쓰임
// queryFn 은 Promise 를 반환하는 비동기 함수이여야 하므로 async 키워드를 사용
async function getRootNodes() {
    try {
        return await fetchNodesByPath("/folders/top-folders");
    }
    catch (error) {
        // 데이터가 없다면 신규 유저이므로 서비스 워커에 메시지를 송신
        if (error.code === "3001") {
            console.log("메시지 송신");
            const runtime = window.chrome?.runtime || window.browser?.runtime;
            runtime.sendMessage(EXT_ID, {
                type: "NEW_USER_DETECTION",
            });
        }
        throw error;
    }
}

export default getRootNodes;