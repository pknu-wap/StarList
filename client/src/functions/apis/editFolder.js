import useAuthStore from "../stores/useAuthStore";
import ApiError from "./ApiError";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function editFolder(folderId, payload) {
    const { accessToken } = useAuthStore.getState();
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${API_BASE_URL}/folders/${folderId}/edit`, options);

    // 200 OK 가 아닐 경우
    if (!response.ok) {
        const errorBody = await response.json();
        throw new ApiError(errorBody.code, errorBody.message, response);
    }
}

export default editFolder;
