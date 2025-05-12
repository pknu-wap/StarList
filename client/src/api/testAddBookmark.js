import axios from 'axios';

const testAddBookmark = async () => {
    try {
        const token = localStorage.getItem('jwt'); // 저장된 JWT 토큰 가져오기
        if (!token) {
            console.warn('토큰이 없습니다. 먼저 로그인하세요.');
            return;
        }

        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/bookmarks`,
            {
                title: "GitHub Skills",
                url: "https://skills.github.com/"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        console.log('북마크 추가 성공:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('에러 응답:', error.response.data);
        } else {
            console.error('요청 실패:', error.message);
        }
    }
};

export default testAddBookmark;
