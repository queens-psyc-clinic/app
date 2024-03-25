import { Measure, ItemTypeOptions, MaximumAge, MinimumAge } from "../models/libraryItem";
import Dropdown from "./DropDown";

const Filter = () => {
  return (
    <div className="w-[45vw] flex flex-row items-center justify-center bg-gray-100 px-2 pb-1 rounded-full">
      <Dropdown placeholder="Measures" options={Object.values(Measure)} />
      <Dropdown placeholder="Item" options={ItemTypeOptions} />
      <Dropdown placeholder="Min Age" options={MinimumAge} />
      <Dropdown placeholder="Max Age" options={MaximumAge} />
    </div>
  );
};

export default Filter;
