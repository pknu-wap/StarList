import { fetchNodesByPath } from "./fetchNodesByPath";

// 현재 폴더 위치에 해당하는 노드 리스트를 반환하는 함수
// 이 함수는 useQuery 의 queryFn 값으로 쓰임
// queryFn 은 Promise 를 반환하는 비동기 함수이여야 하므로 async 키워드를 사용
async function getNodesByFolderId(folderId) {
    return await fetchNodesByPath(`/folders/children/${folderId}`);
}

export { getNodesByFolderId };