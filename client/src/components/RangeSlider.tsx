import * as React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

function valuetext(value: number) {
  return `${value}`;
}

interface RangeSliderProps {
  label: string;
  important?: boolean;
  onChange?: (range: number[]) => void;
}

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "0",
  },
  {
    value: MAX,
    label: "100",
  },
];

const RangeSlider: React.FC<RangeSliderProps> = ({
  label = " ",
  important = false,
  onChange = (range: number[]) => console.log(range),
}: RangeSliderProps) => {
  const [value, setValue] = React.useState<number[]>([16, 89]);

  useEffect(() => {
    onChange(value);
  }, []);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(value);
  };

  return (
    <div>
      <label
        htmlFor="inputText"
        className="block text-base font-medium leading-6 text-gray-900"
      >
        {label} {important && <span className="text-red-200">*</span>}
      </label>
      <Typography className="text-sm py-2">
        Selected Range: {value[0]} - {value[1]}
      </Typography>
      <Slider
        marks={marks}
        getAriaLabel={() => "Age range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </div>
  );
};

export default RangeSlider;
