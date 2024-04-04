import { useState } from "react";
import Dropdown from "./DropDown";

export interface PossibleFilters {
  Measure?: string;
  Item?: string;
  "Min Age"?: string;
  "Max Age"?: string;
  Quantity?: string;
}

interface FilterProps {
  placeholders: string[];
  options: (string[] | number[])[];
  onChange?: (filters: PossibleFilters) => void;
}

const Filter: React.FC<FilterProps> = ({ placeholders, options, onChange }) => {
  const [filter, setFilter] = useState({});
  return (
    <div className="flex h-min">
      <div className="w-max flex flex-row items-center justify-center bg-gray-100 px-2 pb-1 rounded-full">
        {placeholders.map((placeholder, index) => (
          <Dropdown
            key={index}
            placeholder={placeholder}
            options={options[index].map(String)}
            onChange={(option: string, label: string) => {
              setFilter({ ...filter, [placeholder]: option });
              if (onChange) {
                onChange({ ...filter, [placeholder]: option });
              }
            }}
          />
        ))}
      </div>
      <button className="h-auto ml-2 rounded-full border boder-black px-4 py-2  text-xs">
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
