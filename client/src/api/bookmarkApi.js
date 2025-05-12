import instance from "./axiosInstance";


export const fetchBookmarks = async () => {
    try {
        const res = await instance.get("/bookmarks");
        return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (error) {
        console.error("북마크 불러오기 실패:", error);
        return [];
    }
};
