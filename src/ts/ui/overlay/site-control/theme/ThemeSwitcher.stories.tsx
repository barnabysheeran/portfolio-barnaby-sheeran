import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';

import { useUIStateStore } from '../../../../store/uiState/uiStateStore';
import ThemeSwitcher from './ThemeSwitcher';

const meta = {
  title: 'UI/Overlay/SiteControl/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeWrapper = ({
  children,
  initialTheme = 'light',
}: {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark';
}) => {
  const { setTheme } = useUIStateStore();

  useEffect(() => {
    setTheme(initialTheme);
  }, [setTheme, initialTheme]);

  return <div style={{ padding: '2rem' }}>{children}</div>;
};

export const Default: Story = {
  render: () => (
    <ThemeWrapper>
      <ThemeSwitcher />
    </ThemeWrapper>
  ),
};
