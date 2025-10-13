import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        document.documentElement.classList.toggle(
          'theme-dark',
          theme === 'dark',
        );
        set({ theme });
      },
    }),
    {
      name: 'ui-state',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle(
            'theme-dark',
            state.theme === 'dark',
          );
        }
      },
    },
  ),
);
