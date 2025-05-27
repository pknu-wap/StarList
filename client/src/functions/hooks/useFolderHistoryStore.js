import { create } from "zustand";

const useFolderHistoryStore = create((set) => ({
    history: [{ id: 0, title: "나의 북마크" }],

    push: (node) => set((state) => ({
        history: [...state.history, node]
    })),

    pop: () => set((state) => ({
        history: state.history.slice(0, -1)
    })),

    move: (id) => set((state) => {
        const targetIdx = state.history.findIndex((node) => node.id === id);
        return {
            history: state.history.slice(0, targetIdx + 1)
        };
    })
}));

export default useFolderHistoryStore;
