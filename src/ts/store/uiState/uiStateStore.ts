import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Vector2 } from 'three';

import { type Theme, THEMES } from '../../types';

interface UIState {
  theme: Theme;
  cursorPositionPx: Vector2;
  setTheme: (theme: Theme) => void;
  setCursorPositionPx: (position: Vector2) => void;
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

      // ____________________________________________________ Cursor Position Px

      cursorPositionPx: new Vector2(0, 0),

      setCursorPositionPx: (positionPx) => {
        set({ cursorPositionPx: positionPx });
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
