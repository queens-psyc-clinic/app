import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";
import RangeSlider from "./RangeSlider";
import { IoMdAdd } from "react-icons/io";
import { Measure, itemTypeOptions, LevelOfUse } from "../models/libraryItem";
import { MdControlPoint } from "react-icons/md";
import FormItem from "./FormItem";

interface ModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
}

// THIS MODAL is to add items to db

const measureOptions = Object.values(Measure).map((value) => value as string);
const levelOptions = Object.values(LevelOfUse).map((value) => value as string);

export default function Modal({
  modalTitle,
  buttonLabel,
  secButtonLabel = " ",
}: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [itemVisibility, setItemVisibility] = useState<boolean[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const initialVisibility = Array(itemCount).fill(true);
    setItemVisibility(initialVisibility);
  }, []);

  const handleAddItem = () => {
    setItemCount((prevCount) => prevCount + 1);
    setItemVisibility((prevVisibility) => [...prevVisibility, true]);
  };

  const handleRemove = (index: number) => {
    setItemVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = false;
      return updatedVisibility;
    });
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="text-white bg-black px-3 py-2 rounded-lg flex items-center"
      >
        <i className="mr-4">
          <IoMdAdd size={20} />
        </i>
        <p>Add</p>
      </button>
      {isOpen && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-10 p-10">
          <div className="bg-white rounded-lg p-8 max-h-full min-w-fit overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
            <p className="text-xs mb-4 text-red-200 italic">
              * Indicates a required field
            </p>
            <div className="p-5 pt-0 border-1 border border-gray-100 rounded-lg shadow-md">
              <div className="py-4">
                <InputField
                  placeholder="Adaptive Behaviour Assessment System"
                  label="Test Name"
                  important={true}
                />
              </div>
              <div className="flex">
                <div className="pr-4">
                  <Dropdown
                    placeholder="Select a measure"
                    label="Measure"
                    options={measureOptions}
                    important={true}
                  />
                </div>
                <div>
                  <InputField
                    placeholder="10"
                    label="Quantity"
                    important={true}
                    type="Number"
                  />
                </div>
              </div>
              <div className="py-4">
                <RangeSlider label="Ages" />
              </div>
              <div className="flex flex-row pb-4">
                <div className="pr-4">
                  <Dropdown
                    placeholder="C"
                    label="Level of Use"
                    options={levelOptions}
                    important={false}
                  />
                </div>
                <div className="pr-4">
                  <InputField
                    placeholder="2"
                    label="Edition"
                    important={true}
                    type="Number"
                  />
                </div>
                <div>
                  <InputField
                    placeholder="ABAS-2"
                    label="Acronym"
                    important={true}
                  />
                </div>
              </div>
              <div className="pr-4">
                <InputField
                  placeholder="Location test is stored"
                  label="Location"
                  important={true}
                />
              </div>
              <div className="pr-4 pt-4">
                <InputField
                  placeholder="www.orderingcompany.ca"
                  label="Ordering Company"
                  important={true}
                />
              </div>
            </div>

            <h2 className="text-lg font-bold mt-8">Items in Test</h2>
            {itemVisibility.map((visible, index) =>
              visible ? (
                <FormItem key={index} onRemove={() => handleRemove(index)} />
              ) : null
            )}
            <div className="text-sm flex items-center justify-center text-gray-200">
              <button
                className="py-5 flex flex-col items-center justify-center"
                onClick={handleAddItem}
              >
                <div>
                  <MdControlPoint size={40} />
                </div>
                <div className="">
                  <p className="text-center">Add Item</p>
                </div>
              </button>
            </div>
            <div className="flex justify-end pt-10">
              {secButtonLabel !== " " && (
                <button
                  onClick={closeModal}
                  className="hover:bg-gray-100 hover:text-gray-900 px-6 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold mr-4"
                >
                  {secButtonLabel}
                </button>
              )}
              <button
                onClick={closeModal}
                className="text-blue-200 hover:bg-gray-50 border border-blue-200 px-6 py-2 mr-4 rounded-lg text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="text-white hover:bg-blue-300 bg-blue-200 px-6 py-2 rounded-lg text-sm font-semibold"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
