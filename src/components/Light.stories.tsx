import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

// Define the prop types for the Light component
type LightProps = {
  variant: string;
  opacity: number;
};

const Light = ({ variant, opacity }: LightProps) => {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: variant,
        opacity,
      }}
    />
  );
};

// Meta information for the Storybook
const meta: Meta<typeof Light> = {
  title: 'Light',
  component: Light,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['red', 'yellow', 'green'],
      },
    },
    opacity: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
};

export default meta;

// Traffic light props type
type TrafficLightProps = {
  displayOrder: string[];
  sequenceOrder: string[];
  duration: number;
  opacityLevels: {
    active: number;
    inactive: number;
  };
};

const defaultDisplayOrder = ['red', 'yellow', 'green'];
const defaultSequenceOrder = ['red', 'green', 'yellow'];
const defaultOpacityLevels = { active: 1, inactive: 0.25 };

const TrafficLight = ({ displayOrder, sequenceOrder, duration, opacityLevels }: TrafficLightProps) => {
  const [currentLight, setCurrentLight] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLight(prevLight => (prevLight + 1) % sequenceOrder.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [sequenceOrder, duration]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        border: '1px solid black',
        padding: 10,
        width: '100px',
        height: '300px',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      {displayOrder.map(color => (
        <Light
          key={color}
          variant={color}
          opacity={color === sequenceOrder[currentLight] ? opacityLevels.active : opacityLevels.inactive}
        />
      ))}
    </div>
  );
};

export const Configurable: StoryObj<TrafficLightProps> = {
  render: args => <TrafficLight {...args} />,
  args: {
    displayOrder: defaultDisplayOrder,
    sequenceOrder: defaultSequenceOrder,
    duration: 3000,
    opacityLevels: defaultOpacityLevels,
  },
};
