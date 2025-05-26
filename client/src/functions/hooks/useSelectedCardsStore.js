import { create } from 'zustand';

const useSelectedCardsStore = create((set) => {
    return {
        selectedCards: [],

        toggle: (id) => set((state) => {
            const s = new Set(state.selectedCards);
            if (s.has(id)) s.delete(id);
            else s.add(id);
            return { selectedCards: Array.from(s) };
            }),

        clearAll: () => set({ selectedCards: [] }),
    };
})

export default useSelectedCardsStore;