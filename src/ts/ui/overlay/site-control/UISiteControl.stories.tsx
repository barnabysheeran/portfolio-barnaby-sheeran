import type { Meta, StoryObj } from '@storybook/react-vite';
import UISiteControl from './UISiteControl';

const meta: Meta<typeof UISiteControl> = {
  title: 'UI/Overlay/SiteControl/UISiteControl',
  component: UISiteControl,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof UISiteControl>;

export const Default: Story = {};
