import React from "react";
import Dropdown from "./DropDown";

const Filter = () => {
  return (
    <div className="w-[40vw] flex flex-row items-center justify-center bg-gray-100 px-2 pb-1 rounded-full">
      <Dropdown placeholder="Acronym" options={["A", "B"]} />

      <Dropdown placeholder="Level" options={["A", "B"]} />
      <Dropdown placeholder="Measures" options={["A", "B"]} />

      <Dropdown placeholder="Item" options={["A", "B"]} />
    </div>
  );
};

export default Filter;
