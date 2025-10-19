import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Vector2 } from 'three';

import { type Theme, THEMES } from '../../types';

interface UIState {
  theme: Theme;
  cursorPosition: Vector2;
  setTheme: (theme: Theme) => void;
  setCursorPosition: (position: Vector2) => void;
}

export const useUIStateStore = create<UIState>()(
  persist(
    (set) => ({
      // _________________________________________________________________ Theme

      theme: THEMES.LIGHT,

      setTheme: (theme) => {
        document.documentElement.classList.toggle(
          'theme-dark',
          theme === THEMES.DARK,
        );
        set({ theme });
      },

      // _______________________________________________________ Cursor Position

      cursorPosition: new Vector2(0, 0),

      setCursorPosition: (position) => {
        console.log('UIStateStore.setCursorPosition', position);

        set({ cursorPosition: position });
      },
    }),

    // ___________________________________________________________ Persist Theme

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
