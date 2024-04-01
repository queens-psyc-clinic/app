import React, { useEffect, useState } from "react";
import { CardData } from "../models/cardSampleData";
import expandedRowsData from "../models/tableExpandRows";
import { Test, Item } from "../models/BEModels";
import { getItemsForTest } from "../services/TestService";
import { getPillColor } from "../models/libraryItem";
import {
  addItemToCart,
  clearCart,
  deleteItemFromCart,
  getCart,
  initializeCart,
} from "../services/ShoppingCartService";
import { FaMinus, FaPlus } from "react-icons/fa"; // Import React Icons
import { CartItem } from "./Cart";

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
  const [testItems, setTestItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    initializeCart();
    if (cardData) {
      getItemsForTest(cardData.ID)
        .then((res) => {
          setTestItems(
            res.map((item: Item) => {
              return {
                quantity: 0,
                item: item,
              };
            })
          );
        })
        .then(() => console.log(items));
    }
  }, [isOpen]);

  const handleSelectAll = () => {
    setSelectedItems(items.map((item) => item.ID));
    setTestItems(
      testItems.map((testItem) => {
        return {
          ...testItem,
          quantity: 1,
        };
      })
    );
  };

  const increment = (itemId: string) => {
    setTestItems(
      testItems.map((testItem) => {
        if (testItem.item.ID === itemId) {
          if (testItem.quantity === 0) {
            handleCheckboxChange(itemId);
          }
          return {
            ...testItem,
            quantity: testItem.quantity + 1,
          };
        } else {
          return testItem;
        }
      })
    );
  };

  const decrement = (itemId: string) => {
    setTestItems(
      testItems.map((testItem) => {
        if (testItem.item.ID === itemId) {
          if (testItem.quantity === 1) {
            handleCheckboxChange(itemId);
          }
          return {
            ...testItem,
            quantity: testItem.quantity - 1,
          };
        } else {
          return testItem;
        }
      })
    );
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prev) => {
      const selectedIndex = prev.indexOf(itemId);
      if (selectedIndex === -1) {
        return [...prev, itemId];
      } else {
        return prev.filter((rowId) => rowId !== itemId);
      }
    });
    setTestItems(
      testItems.map((testItem) => {
        if (testItem.item.ID === itemId) {
          if (testItem.quantity == 0) {
            return { ...testItem, quantity: 1 };
          } else {
            return { ...testItem, quantity: 0 };
          }
        } else {
          return testItem;
        }
      })
    );
  };

  function addToCart() {
    const itemsToAddToCart: CartItem[] = testItems
      .filter((testItem) => {
        return testItem.quantity > 0;
      })
      .map((cartItem) => {
        return {
          ...cartItem,
          MeasureOf: cardData?.MeasureOf,
          TestName: cardData?.Name,
        };
      });
    console.log(itemsToAddToCart);
    if (itemsToAddToCart.length == 0) {
      alert("Select items to add to cart.");
    } else {
      for (const item of itemsToAddToCart) {
        addItemToCart(item as CartItem);
      }
    }
    setTestItems([]);
    setSelectedItems([]);
    closeModal();
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 z-50">
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
              {testItems.map((testItem, index) => (
                <div key={testItem.item.ID}>
                  <div
                    className={`py-4 pl-2 flex justify-between items-center ${
                      index % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                    key={testItem.item.ItemType}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.includes(testItem.item.ID || "") ||
                          testItem.quantity > 0
                        }
                        id={testItem.item.ItemType}
                        name={testItem.item.ItemType}
                        value={testItem.item.ItemType}
                        onChange={() => handleCheckboxChange(testItem.item.ID)}
                      />
                      <label className="pl-4">
                        <span
                          className={`mr-4 rounded-full px-5 py-1 text-gray-900 bg-${getPillColor(
                            testItem.item.ItemType || ""
                          )}-100`}
                        >
                          {testItem.item.ItemType || ""}
                        </span>
                        <span>{testItem.item.ItemName}</span>
                      </label>
                    </div>
                    <div className="flex items-center mr-2">
                      <FaMinus
                        onClick={() => {
                          if (testItem.quantity !== 0) {
                            decrement(testItem.item.ID);
                          }
                        }}
                        className={`mr-2 ${
                          testItem.quantity === 0
                            ? "cursor-default text-gray-200"
                            : "cursor-pointer"
                        }`}
                      />
                      <span className="mr-2 ml-2">{testItem.quantity}</span>
                      <FaPlus
                        onClick={() => {
                          if (testItem.quantity !== testItem.item.Stock) {
                            increment(testItem.item.ID);
                          }
                        }}
                        className={`ml-2 ${
                          testItem.quantity === testItem.item.Stock
                            ? "cursor-default text-gray-200"
                            : "cursor-pointer"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-10">
              {secButtonLabel.trim() && (
                <button
                  onClick={() => {
                    setTestItems([]);
                    setSelectedItems([]);
                    closeModal();
                  }}
                  className="hover:bg-gray-100 hover:text-gray-900 px-6 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold mr-4"
                >
                  {secButtonLabel}
                </button>
              )}
              <button
                onClick={addToCart}
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
