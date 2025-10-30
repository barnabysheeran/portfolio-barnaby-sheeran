import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type Vector2 } from '../../types/vector';

import { type Theme, THEMES } from '../../types';

interface UIState {
  theme: Theme;
  cursorPositionPx: Vector2;
  surfaceSizePx: Vector2;
  setTheme: (theme: Theme) => void;
  setCursorPositionPx: (position: Vector2) => void;
  setSurfaceSizePx: (size: Vector2) => void;
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

      cursorPositionPx: { x: 0, y: 0 },

      setCursorPositionPx: (positionPx) => {
        set({ cursorPositionPx: positionPx });
      },

      // _______________________________________________________ Surface Size Px

      surfaceSizePx: { x: 0, y: 0 },

      setSurfaceSizePx: (sizePx) => {
        set({ surfaceSizePx: sizePx });
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
