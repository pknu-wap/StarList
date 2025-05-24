import { create } from "zustand";

const useFolderPathStore = create((set) => {
    // 불변성과 참조 비교를 고려하여 기존 상태를 복사하여 새로운 객체를 생성하여 처리
    return {
        stack: [{id: 0, title: "나의 북마크"}],

        push: (node) => set(state => ({
            stack: [...state.stack, node]
        })),

        pop: () => set(state => ({
            stack: state.stack.slice(0, -1)
        })),

        move: (id) => set(state => {
            const targetIdx = state.stack.findIndex(node => node.id === id);
            return { stack: state.stack.slice(0, targetIdx + 1) };
        })
    };
})

export default useFolderPathStore;