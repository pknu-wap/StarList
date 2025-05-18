const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 현재 폴더 위치에 해당하는 노드 리스트를 백엔드 API 를 통해 가져오는 함수
// 이 함수는 useGetNodesByFolderId() 내부에서 useQuery 의 queryFn 값으로 쓰임
// queryFn 은 Promise 를 반환하는 비동기 함수이여야 하므로 async 키워드를 사용
async function getNodesByFolderId(folderId) {
    try {
        const userToken = localStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}/example`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(`getNodesByFolder 오류: ${response.status}`);
        }

        // response.json() 은 Promise 객체를 반환하므로 JSON 으로 파싱
        const nodes = await response.json();
        return nodes;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export { getNodesByFolderId };