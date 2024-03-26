import React, { useEffect, useState } from "react";
import { CardData } from "../models/cardSampleData";
import { ItemType } from "../models/libraryItem";
import { Test } from "../models/BEModels";
import { Item, isTestAvailable } from "../services/TestService";

interface CardProps {
  data: Test;
  openModal: () => void;
}

const Card: React.FC<CardProps> = ({ data, openModal }: CardProps) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const { MeasureOf, Name, ID } = data;

  useEffect(() => {
    isTestAvailable(ID, 1).then((res) => setIsAvailable(res.isTestAvailable));
  }, []);

  const handleClick = () => {
    openModal();
  };

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
};

export default Card;
