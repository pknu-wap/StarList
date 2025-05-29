const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import useAuthStore from "../hooks/useAuthStore";

// 북마크 추가
export const addBookmarkApi = async ({ title, url, folderId }) => {
    const { accessToken } = useAuthStore.getState();
    const res = await fetch(`${API_BASE_URL}/bookmarks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, url, folderId }),
    });
    if (!res.ok) throw new Error("북마크 추가 실패");
    return res.json();
};

// 폴더 추가
export const addFolderApi = async ({ title, userId }) => {
    const { accessToken } = useAuthStore.getState();
    const res = await fetch(`${API_BASE_URL}/folders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, userId }),
    });
    if (!res.ok) throw new Error("폴더 추가 실패");
    return res.json();
};
