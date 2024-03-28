import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";
import { itemTypeOptions } from "../models/libraryItem";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { Item } from "../models/BEModels";
import uuid from "react-uuid";

interface FormItemProps {
  onRemove: () => void;
  testId: string;
  onChange?: (item: Partial<Item>) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  onRemove,
  testId,
  onChange = (item: Partial<Item>) => console.log(item),
}: FormItemProps) => {
  const [itemData, setItemData] = useState<Partial<Item>>({ ID: uuid() });
  useEffect(() => {
    onChange(itemData);
  }, [itemData]);
  return (
    <div className="p-5 mt-5 border-1 border border-gray-100 rounded-lg shadow-md relative">
      <button
        className="text-red-200 absolute top-5 right-5 flex items-center"
        onClick={onRemove}
      >
        <MdOutlineRemoveCircleOutline size={24} className="mr-2" />
        <span>Remove</span>
      </button>
      <div className="pt-6">
        <div className="pr-4">
          <InputField
            placeholder="Adult Form"
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
              placeholder="Form"
              label="Item"
              options={itemTypeOptions}
              important={true}
              onChange={(option: string, label: string) =>
                setItemData({ ...itemData, ItemType: option })
              }
            />
          </div>
          <div className="pr-4 pt-4">
            <InputField
              placeholder="10"
              label="Quantity"
              type="Number"
              important={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setItemData({ ...itemData, Stock: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="pt-4 pb-6">
          <InputField
            placeholder="Location item is stored"
            label="Location"
            type="Text"
            important={true}
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
