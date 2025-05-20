import { create } from "zustand";

// 현재 폴더 위치를 저장하는 전역 상태
const useCurrentPositionStore = create((set) => ({
    // 기본값은 null 으로 설정
    currentPosition: null,
    // FolderCard 컴포넌트 클릭시 현재 위치를 최신화할 예정
    setCurrentPosition: (folderId) => set({ currentPosition: folderId })
}));

export { useCurrentPositionStore };