import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import Dropdown from "./DropDown";
import {
  ItemType,
  ItemTypeOptions,
  LevelOfUse,
  Measure,
} from "../models/libraryItem";

type FilterOptions = "measure" | "item" | "level";
type Filter = {
  measure?: string;
  item?: string;
  level?: string;
};
const Filter2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currFilters, setCurrFilters] = useState<Filter>({});
  const [filters, setFilters] = useState<Filter>({});
  const handleApply = () => {
    setIsOpen(false);
    // Do something with filters
    console.log(filters);
  };

  const getOption = (option: string, label: string) => {
    switch (label) {
      case "Level of Use":
        setFilters({ ...filters, level: option });
        break;
      case "Measure":
        setFilters({ ...filters, measure: option });
        break;
      case "Item":
        setFilters({ ...filters, item: option });
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-max">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center
         px-6 py-2 text-white bg-black hover:bg-[#393939] font-semibold cursor-pointer text-black border border-black rounded-lg flex"
      >
        <i>
          <IoFilter size={25} />
        </i>
      </button>
      {isOpen && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
          <div className="bg-white px-8 py-4 rounded">
            <h1 className="text-2xl">Filter</h1>
            <hr></hr>
            <section className="flex space-x-4 mt-4">
              <Dropdown
                placeholder=""
                label="Level of Use"
                options={Object.values(LevelOfUse)}
                onChange={getOption}
              />
              <Dropdown
                placeholder=""
                label="Measure"
                options={Object.values(Measure)}
                onChange={getOption}
              />
              <Dropdown
                placeholder=""
                label="Item"
                options={ItemTypeOptions}
                onChange={getOption}
              />
            </section>
            <section className="flex space-x-4 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center
         px-6 py-2 text-black bg-white hover:bg-gray-100 font-semibold cursor-pointer text-black border border-black rounded-lg flex"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApply()}
                className="flex justify-center items-center
         px-6 py-2 text-white bg-black hover:bg-[#393939] font-semibold cursor-pointer text-black border border-black rounded-lg flex"
              >
                Apply
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter2;
