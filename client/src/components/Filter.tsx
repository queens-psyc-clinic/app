import Dropdown from "./DropDown";

interface FilterProps {
  placeholders: string[];
  options: (string[] | number[])[];
}

const Filter: React.FC<FilterProps> = ({ placeholders, options }) => {
  return (
    <div className="w-max flex flex-row items-center justify-center bg-gray-100 px-2 pb-1 rounded-full">
      {placeholders.map((placeholder, index) => (
        <Dropdown
          key={index}
          placeholder={placeholder}
          options={options[index].map(String)}
        />
      ))}
    </div>
  );
};

export default Filter;
