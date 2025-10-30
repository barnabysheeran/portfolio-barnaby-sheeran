import React from 'react';
import ButtonText from './ButtonText';

export default {
  title: 'Button/ButtonText',
  component: ButtonText,
  decorators: [
    (Story: React.FC) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    text: 'Click',
    url: 'https://example.com',
  },
};
