// src/components/TopNav/TopNav.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import TopNav from './TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Components/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    links: {
      control: 'object',
      description: 'Navigation links',
      defaultValue: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  args: {
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    isOpen: false, // Initial state
    toggleMenu: () => {}, // Example handler
  },
};
