import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";
import RangeSlider from "./RangeSlider";
import { IoMdAdd } from "react-icons/io";
import { Measure, itemTypeOptions, LevelOfUse } from "../models/libraryItem";
import { MdControlPoint } from "react-icons/md";
import FormItem from "./FormItem";
import { Item, Test } from "../models/BEModels";
import _ from "lodash";
import { createNewItem, createNewTest } from "../services/TestService";

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

  const [testData, setTestData] = useState<Partial<Test>>({});
  const [ages, setAges] = useState<string>("");
  const [items, setItems] = useState<Partial<Item>[]>([]);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const isTestEntryValid = () => {
    if (testData.ID == undefined) {
      setMissingFields([...missingFields, "Acronym"]);
      return false;
    }
    if (testData.Name == undefined) {
      setMissingFields([...missingFields, "Test Name"]);
      return false;
    }
    if (testData.MeasureOf == undefined) {
      setMissingFields([...missingFields, "Measure"]);
      return false;
    }
    if (testData.LevelOfUser == undefined) {
      setMissingFields([...missingFields, "Level"]);
      return false;
    }
    if (testData.EditionNumber == undefined) {
      setMissingFields([...missingFields, "Edition"]);
      return false;
    }
    if (testData.OrderingCompany == undefined) {
      setMissingFields([...missingFields, "Ordering Company"]);
      return false;
    }
    return true;
  };

  const isItemEntryValid = () => {
    for (const item of items) {
      if (item.ID == undefined) {
        return false;
      }
      if (item.ItemType == undefined) {
        setMissingFields([...missingFields, "Item Type"]);
        return false;
      }
      if (item.ItemName == undefined) {
        setMissingFields([...missingFields, "Item Name"]);
        return false;
      }
      if (item.Location == undefined) {
        setMissingFields([...missingFields, "Item Location"]);
        return false;
      }
      if (item.Stock == undefined) {
        setMissingFields([...missingFields, "Item Quantity"]);
        return false;
      }
    }
    return true;
  };

  const isEntryValid = () => {
    setMissingFields([]);
    return isTestEntryValid() && isItemEntryValid();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setItems([]);
    setIsOpen(false);
  };

  const handleApply = () => {
    console.log(testData);
    console.log(items);

    if (isEntryValid()) {
      createNewTest(
        testData.ID as string,
        testData.Name as string,
        testData.MeasureOf as string,
        testData.LevelOfUser as string,
        testData.EditionNumber as string,
        testData.OrderingCompany as string
      )
        .then((res) => {
          for (const item of items) {
            createNewItem(item as Item).then((res) => {
              console.log(res);
            });
          }
          closeModal();
          alert("Item Created Successfully!");
          window.location.reload();
        })
        .catch((e) =>
          alert(
            "Acronym already exists. Please provide a unique Acronym for your test."
          )
        );
    } else {
      alert("Please fill out all fields.");
    }
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
      setItems((prev) => {
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
      setItems([...items, completedItem]);
    }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTestData({ ...testData, Name: e.target.value })
                  }
                />
              </div>
              <div className="flex">
                <div className="pr-4">
                  <Dropdown
                    placeholder="Select a measure"
                    label="Measure"
                    options={measureOptions}
                    important={true}
                    onChange={(option: string, label: string) =>
                      setTestData({ ...testData, MeasureOf: option })
                    }
                  />
                </div>
                {/* <div>
                  <InputField
                    placeholder="10"
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
                    placeholder="Level of Use"
                    label="Level of Use"
                    options={levelOptions}
                    important={false}
                    onChange={(option: string, label: string) =>
                      setTestData({ ...testData, LevelOfUser: option })
                    }
                  />
                </div>
                <div className="pr-4">
                  <InputField
                    placeholder="2"
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
                    placeholder="ABAS-2"
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
                  placeholder="www.orderingcompany.ca"
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
            {itemVisibility.map((visible, index) =>
              visible ? (
                <FormItem
                  key={index}
                  testId={testData.ID ? testData.ID : ""}
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
                onClick={handleApply}
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
