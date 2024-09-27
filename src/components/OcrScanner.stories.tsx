// OcrScanner.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import messages from '@/locales/en.json';

import OcrScanner from './OcrScanner'; // Adjust the import if necessary

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

type OcrScannerProps = {
  simulateDelay?: boolean;
};

const Template: StoryFn<OcrScannerProps> = (args: OcrScannerProps) => <OcrScanner {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithDelay = Template.bind({});
WithDelay.args = {
  simulateDelay: true,
};
