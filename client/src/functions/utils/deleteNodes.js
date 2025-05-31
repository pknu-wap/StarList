import useAuthStore from "../hooks/useAuthStore";
import ApiError from "./ApiError";

const API_BASE_URL = import.meta.env.API_BASE_URL;

// 삭제할 노드 리스트를 path 에 따라서 전송하는 함수
async function deleteNodes(path, payload) {
    const { accessToken } = useAuthStore.getState();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${API_BASE_URL}${path}`, options);

    // 200 OK 가 아닐 경우
    if (!response.ok) {
        const errorBody = await response.json();
        throw new ApiError(errorBody.code, errorBody.message, response);
    }
}

export default deleteNodes;
