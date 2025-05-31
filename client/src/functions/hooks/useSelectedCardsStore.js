import { create } from "zustand";

const useSelectedCardsStore = create((set) => ({
    // {id, type} 객체를 저장하는 배열
    selectedCards: [],

    // 이중 변환을 하더라도 사용자의 데이터 개수가 10000개를 넘기기는 어려우므로 가독성을 위해 map 사용
    toggle: (id, type) =>
        set((state) => {
            const key = id + ":" + type;
            const map = new Map(state.selectedCards.map((obj) => [obj.id + ":" + obj.type, obj]));
            if (map.has(key)) map.delete(key);
            else map.set(key, { id, type });
            return { selectedCards: Array.from(map.values()) };
        }),

    reset: () => set({ selectedCards: [] }),
}));

export default useSelectedCardsStore;
