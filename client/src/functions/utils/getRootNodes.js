import { fetchNodesByPath } from "./fetchNodesByPath";

// 루트의 자식 노드들의 리스트를 반환하는 함수
// 이 함수는 useQuery 의 queryFn 값으로 쓰임
// queryFn 은 Promise 를 반환하는 비동기 함수이여야 하므로 async 키워드를 사용
async function getRootNodes() {
    return fetchNodesByPath("/folders/top-folders");
}

export { getRootNodes };