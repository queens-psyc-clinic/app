import React, { useEffect, useState } from "react";
import { CardData } from "../models/cardSampleData";
import expandedRowsData from "../models/tableExpandRows";
import { Test } from "../models/BEModels";
import { Item, getItemsForTest } from "../services/TestService";
import { getPillColor } from "../models/libraryItem";

interface CardsModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
  isOpen: boolean;
  closeModal: () => void;
  cardData: Test | null;
  cardColor?: string;
  items: Item[];
}

const CardsModal: React.FC<CardsModalProps> = ({
  modalTitle,
  buttonLabel,
  secButtonLabel = " ",
  isOpen,
  closeModal,
  cardData,
  items,
}: CardsModalProps) => {
  const [testItems, setTestItems] = useState<Item[]>(items);
  useEffect(() => {
    if (cardData) {
      getItemsForTest(cardData.ID)
        .then((res) => setTestItems(res))
        .then(() => console.log(items));
    }
  }, []);

  const handleSelectAll = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
          <div className="bg-white rounded-lg p-8 min-w-20 max-h-full min-w-fit overflow-y-auto">
            {cardData && (
              <div>
                <h3 className="text-base italic font-light pb-1 pt-8">
                  {cardData.MeasureOf}
                </h3>
                <h1 className="text-2xl font-bold mb-4">{modalTitle}</h1>
                {/* <h3>{cardData["Item Name"]}</h3> */}
                {/* <div className="flex flex-row text-xs pt-6">
                  <div className=""> // WAITING ON whether tests will have ages
                    <p className="mr-4 ring-gray-900 rounded-full ring-1 py-1 px-5 ring-inset">
                      {cardData.Ages}
                    </p>
                  </div>
                </div> */}
                <div className="flex flex-row gap-14 py-8">
                  <div className="">
                    <h3 className="font-bold">Level of Use</h3>
                    <p className="mr-4 rounded-full py-1">
                      {cardData.LevelOfUser}
                    </p>
                  </div>
                  <div className="">
                    <h3 className="font-bold">Edition</h3>
                    <p>{cardData.EditionNumber}</p>
                  </div>
                  <div className="">
                    <h3 className="font-bold">Acronym</h3>
                    <p>{cardData.ID}</p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <h3 className="font-bold">Additional Notes</h3>
              <p>
                Validate the test by comparing results with other established
                measures of adaptive behavior and related constructs.
              </p>
            </div>
            <div>
              <section className="flex items-center mt-8 mb-4">
                <h3 className="font-bold">Items in kit:</h3>
                <div className="ml-auto">
                  <button
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold"
                    onClick={() => handleSelectAll()}
                  >
                    Select All
                  </button>
                </div>
              </section>
              {items.map((item, index) => (
                <div key={item.ID}>
                  {/* {row.items.map((item, index) => ( */}
                  <div
                    className={`py-4 pl-2 ${
                      index % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                    key={item.ItemType}
                  >
                    <input
                      type="checkbox"
                      id={item.ItemType}
                      name={item.ItemType}
                      value={item.ItemType}
                    />
                    <label className="pl-2" htmlFor={item.ItemType}>
                      <span
                        className={`mr-4 rounded-full px-5 py-1 text-gray-900 bg-${getPillColor(
                          item.ItemType
                        )}-100`}
                      >
                        {item.ItemType}
                      </span>
                      {item.ItemName}{" "}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-10">
              {secButtonLabel.trim() && (
                <button
                  onClick={closeModal}
                  className="hover:bg-gray-100 hover:text-gray-900 px-6 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold mr-4"
                >
                  {secButtonLabel}
                </button>
              )}
              <button
                onClick={closeModal}
                className="text-white hover:bg-gray-800 bg-gray-900 px-6 py-2 rounded-lg text-sm font-semibold"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsModal;
