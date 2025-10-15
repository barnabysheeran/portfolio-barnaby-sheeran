import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type Theme, THEMES } from '../../types';

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      theme: THEMES.LIGHT,
      setTheme: (theme) => {
        document.documentElement.classList.toggle(
          'theme-dark',
          theme === THEMES.DARK,
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
            state.theme === THEMES.DARK,
          );
        }
      },
    },
  ),
);
