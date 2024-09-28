// src/components/OcrScanner.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import messages from '@/locales/en.json';

import type { OcrScannerProps } from './OcrScanner';
import OcrScanner from './OcrScanner'; // Ensure correct import

const meta: Meta<typeof OcrScanner> = {
  title: 'Components/OcrScanner',
  component: OcrScanner,
  decorators: [
    Story => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <div className="p-8">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<OcrScannerProps> = (args: OcrScannerProps) => <OcrScanner {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithDelay = Template.bind({});
WithDelay.args = {
  simulateDelay: true,
};
