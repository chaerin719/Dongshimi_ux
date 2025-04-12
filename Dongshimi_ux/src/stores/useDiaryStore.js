import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const useDiaryStore = create(
    persist(
        (set, get) => ({
            bgColor: 'white',
            setBgColor: (bgColor) => { set({ bgColor }) },
            bgImage: '',
            setBgImage: (bgImage) => {set({ bgImage })},
            entries: [],

            addEntry: (entry) => {
                const existing = get().entries;
                set({ entries: [...existing, entry] });
            },

            getEntryByDate: (date) => {
                return get().entries.find((entry) => entry.date === date);
            },
        }),
        {
            name: 'diary-storage', // AsyncStorage에 저장될 키
        }
    )
)

export default useDiaryStore;