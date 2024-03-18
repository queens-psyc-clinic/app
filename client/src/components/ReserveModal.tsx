import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

const ReserveModal = ({
  isSuccessful,
  isOpen = true,
  closeModal,
}: {
  isSuccessful: boolean;
  isOpen: boolean;
  closeModal: Function;
}) => {
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed inset-0 z-30 w-screen h-[screen] bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white z-60 space-y-6 rounded m-auto w-max p-8">
        <i className={`${isSuccessful ? "text-green-100" : "text-red-100"}`}>
          {isSuccessful ? (
            <FaRegCheckCircle size={50} />
          ) : (
            <FaRegCircleXmark size={50} />
          )}
        </i>
        <h1 className="text-xl font-bold">
          {isSuccessful ? "Items Reserved" : "Some Items Unavailable"}
        </h1>
        <p className="mt-2 text-sm text-wrap">
          {isSuccessful
            ? "You have 2 hours to pick them up!"
            : "Some items were reserved as you were shopping."}
        </p>
        {!isSuccessful && (
          <div>
            <section className="flex space-x-24">
              <section>
                <h3 className="font-medium">Available:</h3>
                -list available items here
              </section>
              <section>
                <h3 className="font-medium">Unavailable:</h3>
                -list unavailable items here
              </section>
            </section>
          </div>
        )}
        {isSuccessful ? (
          <section>
            <button
              onClick={() => closeModal()}
              className="mt-4 w-full flex justify-center font-semibold cursor-pointer text-white bg-black px-6 py-4 rounded-lg flex"
            >
              Ok
            </button>
          </section>
        ) : (
          <section className="flex space-x-4">
            <button
              onClick={() => closeModal()}
              className="mt-4 flex justify-center w-1/2 text-sm font-semibold cursor-pointer text-black border border-black  p-4 rounded-lg flex"
            >
              Reserve Available Items
            </button>
            <button
              onClick={() => closeModal()}
              className="mt-4 flex justify-center items-center w-1/2 text-sm font-semibold cursor-pointer text-white bg-black p-4 rounded-lg flex"
            >
              Cancel
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReserveModal;
