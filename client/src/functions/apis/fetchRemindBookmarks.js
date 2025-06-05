import useAuthStore from "../stores/useAuthStore";
import ApiError from "./ApiError";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getRemindBookmarks = async () => {
    const { accessToken } = useAuthStore.getState();

    const response = await fetch(`${API_BASE_URL}/bookmarks/reminders`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // 200 OK 가 아닐 경우
    if (!response.ok) {
        const errorBody = await response.json();
        throw new ApiError(errorBody.code, errorBody.message, response);
    }

    return response.json();
};

export default getRemindBookmarks;
