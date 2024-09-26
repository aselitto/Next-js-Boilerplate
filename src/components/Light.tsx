type Props = {
  variant?: 'green' | 'yellow' | 'red';
  colorOrder: string[];
  duration: number;
  opacityLevels: object;
  displayOrder: string[];
  sequenceOrder: string[];
};

const Light = ({ variant = 'green' }: Props) => {
  return (
    <div style={{
      background: variant,
      borderRadius: '50%',
      width: 50,
      height: 50,
    }}
    >
    </div>
  );
};

export default Light;
