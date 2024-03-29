import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";
import RangeSlider from "./RangeSlider";
import { Measure, LevelOfUse } from "../models/libraryItem";
import { MdControlPoint } from "react-icons/md";
import FormItem from "./FormItem";
import { Item, Test } from "../models/BEModels";

interface ModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
  isOpen: boolean;
  test: Partial<Test>;
  items: Partial<Item>[];
  closeModal: () => void;
}

const measureOptions = Object.values(Measure).map((value) => value as string);
const levelOptions = Object.values(LevelOfUse).map((value) => value as string);

export default function EditModal({
  modalTitle,
  buttonLabel,
  secButtonLabel = " ",
  isOpen,
  test,
  items,
  closeModal,
}: ModalProps) {
  const [itemCount, setItemCount] = useState(items.length);
  const [itemVisibility, setItemVisibility] = useState<boolean[]>([]);
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const [testData, setTestData] = useState<Partial<Test>>(test);
  const [updatedItems, setUpdatedItems] = useState<Partial<Item>[]>([]);
  const [ages, setAges] = useState("");

  useEffect(() => {
    const initialVisibility = Array(itemCount).fill(true);
    setItemVisibility(initialVisibility);
    console.log("ITEMS: ", items);
  }, []);

  console.log("updated itesm: ", updatedItems);
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

  const formatAgeRange = (range: number[]) => {
    return `${range[0].toString()} to ${range[1].toString()}`;
  };

  const setAgeRange = (range: number[]) => {
    setAges(formatAgeRange(range));
  };

  const saveItem = (item: Partial<Item>) => {
    // setItems()

    const completedItem = {
      ...item,
      TestID: testData.ID,
      Ages: ages,
      Status: true,
    };
    const ind = items.findIndex((elem) => elem.ID === item.ID);
    if (ind >= 0) {
      setUpdatedItems((prev) => {
        const newArr: Partial<Item>[] = prev.map((elem) => {
          if (elem.ID === item.ID) {
            return completedItem;
          } else {
            return elem;
          }
        });
        return newArr;
      });
    } else {
      setUpdatedItems([...updatedItems, completedItem]);
    }
  };

  const handleClose = () => {
    setTestData({});
    setUpdatedItems([]);
    setAges("");
    closeModal();
  };

  return (
    <>
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
                  placeholder={test.Name ? test.Name : ""}
                  value={test.Name ? testData.Name : ""}
                  label="Test Name"
                  important={true}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTestData({ ...testData, Name: e.target.value })
                  }
                />
              </div>
              <div className="flex">
                <div className="pr-4">
                  <Dropdown
                    placeholder={
                      test.MeasureOf ? test.MeasureOf : "Select a Measure"
                    }
                    label="Measure"
                    defaultOption={test.MeasureOf ? test.MeasureOf : undefined}
                    options={measureOptions}
                    important={true}
                    onChange={(option: string, label: string) =>
                      setTestData({ ...testData, MeasureOf: option })
                    }
                  />
                </div>
                {/* <div>
                  <InputField
                    placeholder={test.EditionNumber? test.MeasureOf: "Select a Measure"}
                    label="Quantity"
                    important={true}
                    type="Number"
                  />
                </div> */}
              </div>
              <div className="py-4">
                <RangeSlider label="Ages" onChange={setAgeRange} />
              </div>
              <div className="flex flex-row pb-4">
                <div className="pr-4">
                  <Dropdown
                    placeholder={
                      test.LevelOfUser ? test.LevelOfUser : "Select a Level"
                    }
                    label="Level of Use"
                    defaultOption={
                      test.LevelOfUser ? test.LevelOfUser : undefined
                    }
                    options={levelOptions}
                    important={true}
                    onChange={(option: string, label: string) =>
                      setTestData({ ...testData, LevelOfUser: option })
                    }
                  />
                </div>
                <div className="pr-4">
                  <InputField
                    placeholder={test.EditionNumber ? test.EditionNumber : ""}
                    value={test.EditionNumber ? testData.EditionNumber : ""}
                    label="Edition"
                    important={true}
                    type="Number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTestData({
                        ...testData,
                        EditionNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <InputField
                    placeholder={test.ID ? test.ID : ""}
                    value={test.ID ? testData.ID : ""}
                    label="Acronym"
                    important={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTestData({ ...testData, ID: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* <div className="pr-4">
                <InputField
                  placeholder="Location test is stored"
                  label="Location"
                  important={true}
                />
              </div> */}
              <div className="pr-4 pt-4">
                <InputField
                  placeholder={test.OrderingCompany ? test.OrderingCompany : ""}
                  value={test.OrderingCompany ? testData.OrderingCompany : ""}
                  label="Ordering Company"
                  important={true}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTestData({
                      ...testData,
                      OrderingCompany: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <h2 className="text-lg font-bold mt-8">Items in Test</h2>
            {items.map((item, index) =>
              itemVisibility[index] ? (
                <FormItem
                  testId={testData.ID ? testData.ID : ""}
                  key={index}
                  item={item as Item}
                  onRemove={() => handleRemove(index)}
                  onChange={saveItem}
                />
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
                  onClick={handleClose}
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
