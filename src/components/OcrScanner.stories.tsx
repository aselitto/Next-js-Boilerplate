// src/components/InsuranceForm.stories.tsx

import type { Meta, StoryFn } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { Provider } from 'react-redux';

import messages from '@/locales/en.json';
import { store } from '@/store/store';

import InsuranceForm from './Forms/InsuranceForm';

const meta: Meta<typeof InsuranceForm> = {
  title: 'Components/InsuranceForm',
  component: InsuranceForm,
  decorators: [
    Story => (
      <Provider store={store}>
        <NextIntlClientProvider locale="en" messages={messages}>
          <div className="p-8">
            <Story />
          </div>
        </NextIntlClientProvider>
      </Provider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof InsuranceForm> = (args: React.ComponentProps<typeof InsuranceForm>) => <InsuranceForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialData: null, // or provide mock data 1 2
};

export const WithInitialData = Template.bind({});
WithInitialData.args = {
  initialData: {
    firstName: 'Jane',
    lastName: 'Doe',
    address: '456 Elm St, Othertown, USA',
    email: 'jane.doe@example.com',
    policyNumber: 'POL987654321',
    groupNumber: 'GRP123456789',
    // Add other fields as necessary
  },
};
