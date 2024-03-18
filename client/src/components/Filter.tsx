import { ItemTypeOptions, LevelOfUse, Measure } from "../models/libraryItem";
import Dropdown from "./DropDown";

const Filter = () => {
  return (
    <div className="w-[40vw] flex flex-row items-center justify-center bg-gray-100 px-2 pb-1 rounded-full">
      <Dropdown placeholder="Level" options={Object.values(LevelOfUse)} />
      <Dropdown placeholder="Measures" options={Object.values(Measure)} />

      <Dropdown placeholder="Item" options={ItemTypeOptions} />
    </div>
  );
};

export default Filter;
