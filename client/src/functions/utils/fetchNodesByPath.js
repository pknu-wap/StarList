const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// path 에 따른 노드 리스트를 백엔드 API 를 통해 가져오는 함수
async function fetchNodesByPath(path) {
    try {
        const accessToken = localStorage.getItem("jwt");
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(`getNodesByFolder 오류: ${response.status}`);
        }
        return response.json();
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export { fetchNodesByPath };