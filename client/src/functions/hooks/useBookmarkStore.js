import { create } from "zustand";

// 전역 상태를 관리하는 변수
const useBookmarkStore = create((set) => ({
    bookmarks: [], // 북마크 리스트를 담을 공간
    setBookmarks: (data) => set({ bookmarks: data, }), // 북마크 데이터를 bookmarks에 저장하는 함수
    // 이 함수는 fetchBookmarks로 받아온 데이터를 상태에 반영할 때 사용
}));

export default useBookmarkStore;