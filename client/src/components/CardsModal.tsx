import React, { useEffect, useState } from "react";
import { CardData } from "../models/cardSampleData";
import expandedRowsData from "../models/tableExpandRows";
import { Test, Item } from "../models/BEModels";
import { getItemsForTest } from "../services/TestService";
import { getPillColor } from "../models/libraryItem";
import { FaMinus, FaPlus } from "react-icons/fa"; // Import React Icons

interface CardsModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
  isOpen: boolean;
  closeModal: () => void;
  cardData: Omit<Test, "OrderingCompany"> | null;
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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (cardData) {
      getItemsForTest(cardData.ID)
        .then((res) => {
          setTestItems(res);
          const initialQuantities: { [key: string]: number } = {};
          res.forEach((item: { ItemType: string | number }) => {
            initialQuantities[item.ItemType] = 1; // Initialize quantities to 1
          });
          setQuantities(initialQuantities);
        })
        .then(() => console.log(items));
    }
  }, []);

  const handleSelectAll = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
    // NEED TO ADD: if item quantity < 0, set quantity to 1
  };

  const handleIncrement = (itemType: string) => {
    const newQuantity = (quantities[itemType] || 0) + 1;
    const updatedQuantities = { ...quantities, [itemType]: newQuantity };
    setQuantities(updatedQuantities);
  
    const checkbox = document.getElementById(itemType) as HTMLInputElement;
    if (checkbox && newQuantity > 0) {
      checkbox.checked = true;
    }
  };

  const handleDecrement = (itemType: string) => {
    const newQuantity = Math.max((quantities[itemType] || 0) - 1, 0);
    const updatedQuantities = { ...quantities, [itemType]: newQuantity };
    setQuantities(updatedQuantities);
  
    if (newQuantity === 0) {
      const checkbox = document.getElementById(itemType) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    }
  };

  const handleCheckboxChange = (itemType: string) => {
    const checkbox = document.getElementById(itemType) as HTMLInputElement;
    const updatedQuantities = { ...quantities, [itemType]: checkbox.checked ? 1 : 0 };
    setQuantities(updatedQuantities);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
          <div className="bg-white rounded-lg p-8 max-h-full min-w-fit overflow-y-auto">
            {cardData && (
              <div>
                <h3 className="text-base italic font-light pb-1 pt-8">
                  {cardData.MeasureOf}
                </h3>
                <h1 className="text-2xl font-bold mb-4">{modalTitle}</h1>
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
              <p className="max-w-2xl">
                Validate the test by comparing results with other established
                measures of adaptive behavior and related constructs.
              </p>
            </div>
            <div>
              <section className="flex-row items-center mt-8 mb-4">
                <div>
                  <h3 className="font-bold pb-5">Test Items:</h3>
                </div>
                <div>
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
                  <div
                    className={`py-4 pl-2 flex justify-between items-center ${
                      index % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                    key={item.ItemType}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={item.ItemType}
                        name={item.ItemType}
                        value={item.ItemType}
                        onClick={() => handleCheckboxChange(item.ItemType)}
                      />
                      <label className="pl-4">
                        <span
                          className={`mr-4 rounded-full px-5 py-1 text-gray-900 bg-${getPillColor(
                            item.ItemType
                          )}-100`}
                        >
                          {item.ItemType}
                        </span>
                        <span>{item.ItemName}</span>
                      </label>
                    </div>
                    <div className="flex items-center mr-2">
                      <FaMinus
                        onClick={() => handleDecrement(item.ItemType)}
                        className="cursor-pointer mr-2"
                      />
                      <span className="mr-2 ml-2">
                        {quantities[item.ItemType] || 0}
                      </span>
                      <FaPlus
                        onClick={() => handleIncrement(item.ItemType)}
                        className="cursor-pointer ml-2"
                      />
                    </div>
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
