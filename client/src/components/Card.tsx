import React, { useEffect, useState } from "react";
import { CardData } from "../models/cardSampleData";
import { ItemType } from "../models/libraryItem";
import { Test, Item } from "../models/BEModels";
import { isTestAvailable } from "../services/TestService";

interface CardProps {
  data: Omit<Test, "OrderingCompany"> & {
    ItemType?: string;
    ItemName?: string;
    StartDate?: Date;
    EndDate?: Date;
    LastNotified?: Date;
  };
  openModal?: (data: Omit<Test, "OrderingCompany">, items: Item[]) => void;
  type: "item" | "test";
  OverduePage?: boolean;
}

const Card: React.FC<CardProps> = ({ data, openModal, type, OverduePage }: CardProps) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [payLoad, setPayload] = useState<Item[]>([]);
  const { MeasureOf, Name, ID, StartDate, EndDate} = data;
  useEffect(() => {
    if (type === "test") {
      isTestAvailable(ID, 1).then((res) => {
        setIsAvailable(res.isTestAvailable);
        setPayload(res.payload);
      });
    }
  }, []);

  const handleClick = () => {
    if (openModal) {
      openModal(data, payLoad);
    }
  };

  const getItemColorClass = (itemType: string | undefined): string => {
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

  const formattedStartDate = StartDate ? new Date(StartDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  const formattedEndDate = EndDate ? new Date(EndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  const today = new Date();
  const daysOverdue = EndDate && EndDate < today ? Math.floor((today.getTime() - EndDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;


  if (type === "item") {
    return (
      <div
        className={`p-6 shadow-md max-w-xs ${
          openModal ? "cursor-pointer hover:bg-gray-100" : null
        }rounded-sm relative ${!isAvailable ? "out-of-stock" : ""}`}
        onClick={handleClick}
      >
        {!isAvailable && (
          <div className="bg-gray-900 text-white text-center py-2 px-4 absolute top-0 right-0 rounded-tr-sm">
            Currently Unavailable
          </div>
        )}
        <h3
          className={`text-base italic font-light pb-1 pt-8 ${
            !isAvailable ? "text-gray-200" : ""
          }`}
        >
          {MeasureOf}
        </h3>
        <h1
          className={`text-xl font-medium pb-4 ${
            !isAvailable ? "text-gray-200" : ""
          }`}
        >
          {data.ItemName}
        </h1>
        <p className="mb-4 text-xs text-gray-800">
          {/* {data.StartDate?.toLocaleDateString()} -{" "}
          {data.EndDate?.toLocaleDateString()} */}
          {formattedStartDate} - {formattedEndDate}

        </p>
        {OverduePage && daysOverdue > 0 && (
          <p className="mb-4 text-xs font-bold text-orange-200">
            Overdue by {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}
          </p>
        )}
        <p
          className={`mr-4 rounded-full py-1 px-6 w-min ${
            data.ItemType ? getItemColorClass(data.ItemType) : ""
          }`}
        >
          {data.ItemType}
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={`p-6 shadow-md max-w-xs cursor-pointer hover:bg-gray-100 rounded-sm relative ${
          !isAvailable ? "out-of-stock" : ""
        }`}
        onClick={handleClick}
      >
        {!isAvailable && (
          <div className="bg-gray-900 text-white text-center py-2 px-4 absolute top-0 right-0 rounded-tr-sm">
            Currently Unavailable
          </div>
        )}
        <h3
          className={`text-base italic font-light pb-1 pt-8 ${
            !isAvailable ? "text-gray-200" : ""
          }`}
        >
          {MeasureOf}
        </h3>
        <h1
          className={`text-xl font-medium pb-4 ${
            !isAvailable ? "text-gray-200" : ""
          }`}
        >
          {Name}
        </h1>
        {/* <div
          className={`flex flex-row pt-4 text-xs ${
            Stock === "0" ? "opacity-50" : ""
          }`}
        >
          <div> WAITING on whether tests will have ages
            <p className="mr-4 ring-gray-900 rounded-full ring-1 py-1 px-5 ring-inset">
              {Ages}
            </p>
          </div>
        </div> */}
      </div>
    );
  }
};

Card.defaultProps = {
  type: "test",
};
export default Card;
