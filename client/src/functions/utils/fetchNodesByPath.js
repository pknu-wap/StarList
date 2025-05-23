import useAuthStore from "../hooks/useAuthStore";
import ApiError from "./ApiError";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// path 에 따른 노드 리스트를 백엔드 API 를 통해 가져오는 함수
async function fetchNodesByPath(path) {
    const { accessToken } = useAuthStore.getState();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    // 200 OK 가 아닐 경우
    if (!response.ok)
        throw new ApiError(response.status, response.message, response);

    return response.json();
}

export { fetchNodesByPath };