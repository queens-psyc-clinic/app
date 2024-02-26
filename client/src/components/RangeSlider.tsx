import * as React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function valuetext(value: number) {
  return `${value}°C`;
}

interface RangeSliderProps {
    label: string;
    important?: boolean;
}

const MAX = 100;
const MIN = 0;
const marks = [
    {
      value: MIN,
      label: '0',
    },
    {
      value: MAX,
      label: '100',
    },
  ];

const RangeSlider: React.FC<RangeSliderProps> = ({ label = " ", important = false }: RangeSliderProps) => {
  const [value, setValue] = React.useState<number[]>([10, 35]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div>
        <label htmlFor="inputText" className="block text-base font-medium leading-6 text-gray-900">
            {label} {important && <span className="text-red-200">*</span>}
        </label>
        <Slider
            marks={marks}
            getAriaLabel={() => 'Age range'}
            value={value}
            className="text-blue-200"
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
        />
    </div>
  );
}

export default RangeSlider;