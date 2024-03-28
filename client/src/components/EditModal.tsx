import React from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";
import RangeSlider from "./RangeSlider";
import { Measure, itemTypeOptions, LevelOfUse } from "../models/libraryItem";

interface ModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
  isOpen: boolean;
  closeModal: () => void;
}

const measureOptions = Object.values(Measure).map((value) => value as string);
const levelOptions = Object.values(LevelOfUse).map((value) => value as string);

export default function EditModal({
  modalTitle,
  buttonLabel,
  secButtonLabel = " ",
  isOpen,
  closeModal,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-10 p-10">
          <div className="bg-white rounded-lg p-8 min-w-20 max-h-full min-w-fit overflow-y-auto">
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
            <div className="p-5 mt-5 border-1 border border-gray-100 rounded-lg shadow-md">
              <div className="pr-4">
                <InputField
                  placeholder="Adult Form"
                  label="Item Name"
                  important={true}
                />
              </div>
              <div className="flex">
                <div className="pr-4 pt-4">
                  <Dropdown
                    placeholder="Form"
                    label="Item"
                    options={itemTypeOptions}
                    important={true}
                  />
                </div>
                <div className="pr-4 pt-4">
                  <InputField
                    placeholder="10"
                    label="Quantity"
                    type="Number"
                    important={true}
                  />
                </div>
              </div>
              <div className="pt-4">
                <InputField
                  placeholder="Location item is stored"
                  label="Location"
                  type="Text"
                  important={true}
                />
              </div>
            </div>
            <div className="p-5 mt-5 border-1 border border-gray-100 rounded-lg shadow-md">
              <div className="pr-4">
                <InputField
                  placeholder="Adult Form"
                  label="Item Name"
                  important={true}
                />
              </div>
              <div className="flex">
                <div className="pr-4 pt-4">
                  <Dropdown
                    placeholder="Form"
                    label="Item"
                    options={itemTypeOptions}
                    important={true}
                  />
                </div>
                <div className="pr-4 pt-4">
                  <InputField
                    placeholder="10"
                    label="Quantity"
                    type="Number"
                    important={true}
                  />
                </div>
              </div>
              <div className="pt-4">
                <InputField
                  placeholder="Location item is stored"
                  label="Location"
                  type="Text"
                  important={true}
                />
              </div>
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
                className="text-white hover:bg-blue-100 bg-blue-200 px-6 py-2 rounded-lg text-sm font-semibold"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
