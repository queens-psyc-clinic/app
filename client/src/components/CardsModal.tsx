import React from "react";
import { CardData } from "../models/cardSampleData";

interface CardsModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
  isOpen: boolean;
  closeModal: () => void;
  cardData: CardData | null;
  cardColor: string;
}

const CardsModal: React.FC<CardsModalProps> = ({
  modalTitle,
  buttonLabel,
  secButtonLabel = " ",
  isOpen,
  closeModal,
  cardData,
  cardColor,
}: CardsModalProps) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
          <div className="bg-white rounded-lg p-8 min-w-20 max-h-full min-w-fit overflow-y-auto">
            {cardData && (
              <div>
                <h3 className="text-base italic font-light pb-1 pt-8">{cardData.Measure.data.title}</h3>
                <h1 className="text-2xl font-bold mb-4">{modalTitle}</h1>
                <h3>{cardData["Item Name"]}</h3>
                <div className="flex flex-row text-xs pt-6">
                  <div className="">
                    <p className={`mr-4 rounded-full py-1 px-6 text-gray-900 bg-gray-100 ${cardColor}`}>
                      {cardData.Item.data.title}
                    </p>
                  </div>
                  <div className="">
                    <p className="mr-4 ring-gray-900 rounded-full ring-1 py-1 px-5 ring-inset">
                      {cardData.Ages}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-14 py-8">
                  <div className="">
                    <h3 className="font-bold">Level of Use</h3>
                    <p className="mr-4 rounded-full py-1">
                      {cardData.Level}
                    </p>
                  </div>
                  <div className="">
                    <h3 className="font-bold">Edition</h3>
                    <p>{cardData.Edition}</p>
                  </div>
                  <div className="">
                    <h3 className="font-bold">Acronym</h3>
                    <p>{cardData.Acronym}</p>
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
