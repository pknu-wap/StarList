import instance from "./axiosInstance";
import useAuthStore from "../hooks/useAuthStore";

export const fetchBookmarks = async () => {
    // Zustand 스토어에서 토큰 가져오기
    const raw = useAuthStore.getState().accessToken || "";
    const token = raw.trim();

    try {
        const res = await instance.get("/bookmarks", {
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (error) {
        console.error("북마크 불러오기 실패:", error);
        return [];
    }
};
