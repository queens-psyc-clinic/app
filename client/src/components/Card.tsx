import React from "react";
import { CardData } from "../models/cardSampleData";
import { ItemType } from "../models/libraryItem";

interface CardProps {
  data: CardData;
  openModal: (color: string) => void;
}

const itemTitleToType: Record<string, ItemType> = {
  Book: "Book",
  CD: "CD",
  Form: "Form",
  "Install Disk": "Install Disk",
  Kit: "Kit",
  Manual: "Manual",
  Scoring: "Scoring",
  "USB Stick": "USB Stick",
  Textbook: "Textbook",
};

const getItemTypeFromTitle = (title: string): ItemType => {
  return itemTitleToType[title] || "Other";
};

const getItemColorClass = (itemType: ItemType): string => {
  switch (itemType) {
    case "Book":
      return "bg-yellow-100 text-yellow-900";
    case "CD":
      return "bg-blue-100 text-blue-900";
    case "Form":
      return "bg-green-100 text-green-900";
    case "Install Disk":
      return "bg-teal-100 text-teal-900";
    case "Kit":
      return "bg-orange-200 text-orange-900";
    case "Manual":
      return "bg-red-100 text-red-900";
    case "Scoring":
      return "bg-pink-100 text-pink-900";
    case "USB Stick":
      return "bg-purple-100 text-purple-900";
    case "Textbook":
      return "bg-indigo-200 text-indigo-900";
    default:
      return "bg-gray-100 text-gray-900";
  }
};

const Card: React.FC<CardProps> = ({ data, openModal }: CardProps) => {
  const { Name, "Item Name": itemName, Measure, Item, Ages, Stock } = data;
  const itemType = getItemTypeFromTitle(Item.data.title);
  const itemColorClass = getItemColorClass(itemType);

  const handleClick = () => {
    openModal(itemColorClass);
  };

  return (
    <div
      className={`p-6 shadow-md max-w-xs cursor-pointer hover:bg-gray-100 rounded-sm relative ${
        Stock === "0" ? "out-of-stock" : ""
      }`}
      onClick={handleClick}
    >
      {Stock === "0" && (
        <div className="bg-gray-900 text-white text-center py-2 px-4 absolute top-0 right-0 rounded-tr-sm">
          Currently Unavailable
        </div>
      )}
      <h3
        className={`text-base italic font-light pb-1 pt-8 ${
          Stock === "0" ? "text-gray-200" : ""
        }`}
      >
        {Measure.data.title}
      </h3>
      <h1
        className={`text-xl font-medium pb-4 ${
          Stock === "0" ? "text-gray-200" : ""
        }`}
      >
        {Name}
      </h1>
      <h2
        className={`text-base font-light ${
          Stock === "0" ? "text-gray-200" : ""
        }`}
      >
        {itemName}
      </h2>
      <div
        className={`flex flex-row pt-4 text-xs ${
          Stock === "0" ? "opacity-50" : ""
        }`}
      >
        <div>
          <p
            className={`mr-4 rounded-full py-1 px-6 ${
              Stock === "0" ? "text-gray-900 bg-gray-100" : ""
            } ${itemColorClass}`}
          >
            {Item.data.title}
          </p>
        </div>
        <div>
          <p className="mr-4 ring-gray-900 rounded-full ring-1 py-1 px-5 ring-inset">
            {Ages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
