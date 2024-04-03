import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";
import { itemTypeOptions } from "../models/libraryItem";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { Item } from "../models/BEModels";
import uuid from "react-uuid";
import RangeSlider from "./RangeSlider";

interface FormItemProps {
  onRemove: (id: string) => void;
  testId: string;
  item?: Partial<Item> & { ID: string };
  onChange?: (item: Partial<Item> & { ID: string }, ages: string) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  onRemove,
  testId,
  item,
  onChange = (item: Partial<Item> & { ID: string }) => {},
}: FormItemProps) => {
  const [itemData, setItemData] = useState<Partial<Item> & { ID: string }>(
    item ? item : { ID: uuid() }
  );
  useEffect(() => {
    console.log("item changed!");
    if (itemData != item) {
      onChange(itemData, ages);
    }
  }, [itemData]);

  useEffect(() => {
    console.log("item removed!!");
    if (item) {
      setItemData(item);
    }
  }, [onRemove]);

  const [ages, setAges] = useState("");

  const formatAgeRange = (range: number[]) => {
    return `${range[0].toString()} to ${range[1].toString()}`;
  };

  const setAgeRange = (range: number[]) => {
    setAges(formatAgeRange(range));
  };
  return (
    <div className="p-5 mt-5 border-1 border border-gray-100 rounded-lg shadow-md relative">
      <button
        className="text-red-200 absolute top-5 right-5 flex items-center"
        onClick={() => onRemove(itemData.ID!)}
      >
        <MdOutlineRemoveCircleOutline size={24} className="mr-2" />
        <span>Remove</span>
      </button>
      <div className="pt-6">
        <div className="pr-4">
          <InputField
            placeholder={itemData.ItemName ? itemData.ItemName : ""}
            value={itemData.ItemName ? itemData.ItemName : ""}
            label="Item Name"
            important={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemData({ ...itemData, ItemName: e.target.value })
            }
          />
        </div>
        <div className="flex">
          <div className="pr-4 pt-4">
            <Dropdown
              placeholder="Item Type"
              label="Item"
              defaultOption={itemData.ItemType ? itemData.ItemType : undefined}
              options={itemTypeOptions}
              important={false}
              onChange={(option: string, label: string) =>
                setItemData({ ...itemData, ItemType: option })
              }
            />
          </div>
          <div className="pr-4 pt-4">
            <InputField
              placeholder={item ? item.Stock?.toString() : "10"}
              value={itemData.Stock ? itemData.Stock.toString() : ""}
              label="Quantity"
              type="Number"
              important={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setItemData({ ...itemData, Stock: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="py-4">
          <RangeSlider important={false} label="Ages" onChange={setAgeRange} />
        </div>
        <div className="pt-4 pb-6">
          <InputField
            placeholder={item ? item.Location : "Location that item is stored."}
            value={itemData.Location ? itemData.Location : ""}
            label="Location"
            type="Text"
            important={false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemData({ ...itemData, Location: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FormItem;
