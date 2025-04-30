import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    withCredentials: true,
});

// 북마크 API 요청 함수
export const fetchBookmarks = async () => {
    try {
        const res = await instance.get("/bookmarks");
        if (Array.isArray(res.data.data)) {
            return res.data.data;
        }

        console.warn("'data'가 배열이 아님:", res.data.data);
        return [];
    } catch (error) {
        console.error("북마크 불러오기 실패:", error);
        return [];
    }
};
