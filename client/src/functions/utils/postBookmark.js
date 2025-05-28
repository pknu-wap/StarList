import useAuthStore from "../hooks/useAuthStore";

// 북마크 추가 함수
export const postBookmark = async ({ title, url, parentId }) => {
    const token = useAuthStore.getState().accessToken?.trim();

    const res = await fetch("/bookmarks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ title, url, parentId }),
    });

    if (res.status === 201) {
        // 성공: bookmarkId 반환
        return await res.json();
    }

    // 에러: 코드와 메시지 추출
    let errorMsg = "북마크 추가 실패";
    try {
        const errorBody = await res.json();
        errorMsg = errorBody?.message || errorMsg;
    } catch {
        // 파싱 에러는 무시 (중요한 문제X 단순히 Lint 에러 표시가 안뜨게 하기 위함)
    }
    throw new Error(errorMsg);
};
