import React, { useState } from "react";
import EditModalComponent from "./EditModal";
import { FiEdit } from "react-icons/fi";

interface ModalProps {
  modalTitle: string;
  buttonLabel: string;
  secButtonLabel?: string;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ChooseEditModal({
  modalTitle,
  buttonLabel,
  secButtonLabel = " ",
  isOpen,
  closeModal,
}: ModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleItemClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 p-10">
          <div className="bg-white rounded-lg p-8 min-w-20 max-h-full min-w-fit overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
            <p
              className="flex items-center justify-between p-3 pl-5 rounded relative bg-gray-50 my-2 border-gray-100 hover:bg-gray-100 border cursor-pointer"
              onClick={handleItemClick}
            >
              Test
              <i className="text-black cursor-pointer pr-2">
                <FiEdit size={15} />
              </i>
            </p>
            <p
              className="flex items-center justify-between p-3 pl-5 rounded relative bg-gray-50 my-2 border-gray-100 hover:bg-gray-100 border cursor-pointer"
              onClick={handleItemClick}
            >
              Item 1
              <i className="text-black cursor-pointer pr-2">
                <FiEdit size={15} />
              </i>
            </p>
            <p
              className="flex items-center justify-between p-3 pl-5 rounded relative bg-gray-50 my-2 border-gray-100 hover:bg-gray-100 border cursor-pointer"
              onClick={handleItemClick}
            >
              Item 2
              <i className="text-black cursor-pointer pr-2">
                <FiEdit size={15} />
              </i>
            </p>
            <p
              className="flex items-center justify-between p-3 pl-5 rounded relative bg-gray-50 my-2 border-gray-100 hover:bg-gray-100 border cursor-pointer"
              onClick={handleItemClick}
            >
              Item 3
              <i className="text-black cursor-pointer pr-2">
                <FiEdit size={15} />
              </i>
            </p>
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
                className="text-white hover:bg-blue-100 bg-blue-200 px-6 py-2 rounded-lg text-sm font-semibold"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <EditModalComponent
          modalTitle="Edit"
          buttonLabel="Save"
          secButtonLabel="Cancel"
          isOpen={isEditModalOpen}
          closeModal={handleCloseEditModal}
        />
      )}
    </>
  );
}
