import { create } from "zustand";

// 검색창에 입력한 키워드와 현재 검색을 실행했는지를 나타내는 전역 상태
// 이때, 꼭 검색창 사용을 끝냈다면 clear() 를 실행할 것!!
const useSearchStore = create((set) => ({
    keyword: "",
    isSearching: false,
    setKeyword: (newKeyword) => set({ keyword: newKeyword, isSearching: true }),
    finishSearch: () => set({ keyword: "", isSearching: false }),
}));

export default useSearchStore;
