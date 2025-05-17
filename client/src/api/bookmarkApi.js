import instance from "./axiosInstance";
import useAuthStore from "../store/useAuthStore";

export const fetchBookmarks = async () => {
    // Zustand 스토어에서 토큰 가져오기
    const token = useAuthStore.getState().accessToken;

    try {
        const res = await instance.get("/bookmarks", {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (error) {
        console.error("북마크 불러오기 실패:", error);
        return [];
    }
};
