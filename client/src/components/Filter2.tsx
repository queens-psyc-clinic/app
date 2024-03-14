import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import Dropdown from "./DropDown";
import {
  ItemType,
  ItemTypeOptions,
  LevelOfUse,
  Measure,
} from "../models/libraryItem";

const Filter2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<{
    measure?: Measure;
    item?: ItemType;
    level?: LevelOfUse;
  }>({});
  const handleApply = (e: Event) => {
    console.log(e.target);
  };
  return (
    <div>
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
                onChange={handleApply}
              />
              <Dropdown
                placeholder=""
                label="Measure"
                options={Object.values(Measure)}
              />
              <Dropdown placeholder="" label="Item" options={ItemTypeOptions} />
            </section>
            <section className="flex space-x-4 mt-8">
              <button
                className="flex justify-center items-center
         px-6 py-2 text-black bg-white hover:bg-[#393939] font-semibold cursor-pointer text-black border border-black rounded-lg flex"
              >
                Cancel
              </button>
              <button
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
