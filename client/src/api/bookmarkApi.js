// import axios from 'axios';

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
//   withCredentials: true,
// });

// 북마크 API 요청 함수
// src/api/bookmarkApi.js
export const fetchBookmarks = async () => {
    // 실제 API 요청은 주석처리
    // const res = await axios.get("/bookmarks");
    // return res.data.data;

    // 임시 mock 데이터 리턴
    return [
        {
            id: 1,
            title: "ChatGPT로 AI 요약하기",
            summary: "ChatGPT를 활용한 웹 콘텐츠 요약 서비스 개발 사례",
            image: "https://example.com/images/chatgpt-summary-thumbnail.png",
            recommended: "true",
            url: "https://openai.com/blog/chatgpt",
            dateAdded: 1711507200,
            keywords: ["AI", "요약", "ChatGPT"],
        },
        {
            id: 2,
            title: "스프링 부트로 만드는 REST API",
            summary: "Spring Boot를 활용한 RESTful API 구축 방법에 대한 가이드",
            image: "https://example.com/images/springboot-api-thumbnail.png",
            recommended: "false",
            url: "https://spring.io/guides/gs/rest-service/",
            dateAdded: 1711430400,
            keywords: ["Spring", "REST API", "백엔드", "Spring Boot", "Java"],
        },
    ];
};
