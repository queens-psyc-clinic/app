import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { CartItem } from "./Cart";
import uuid from "react-uuid";
import {
  checkIfCartIsValid,
  getCart,
  setCart,
} from "../services/ShoppingCartService";

const ReserveModal = ({
  isSuccessful,
  isOpen = true,
  closeModal,
  cartValidity,
}: {
  isSuccessful: boolean;
  isOpen: boolean;
  closeModal: Function;
  cartValidity?: { available: CartItem[]; unAvailable: CartItem[] };
}) => {
  async function getAvailableItems() {
    // logic to check items are available and mark items as unavailable for pickup
    const cart = getCart();
    const updatedCart = cart.filter((cartItem) => {
      return !isItemUnavailable(cartItem.item.ID);
    });
    setCart(updatedCart);
    closeModal();
  }

  function isItemUnavailable(itemId: string) {
    if (cartValidity) {
      const ind = cartValidity.unAvailable.findIndex(
        (elem) => elem.item.ID === itemId
      );
      return ind >= 0;
    } else {
      return false;
    }
  }

  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed inset-0 z-30 w-screen h-[screen] bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white z-60 rounded m-auto w-max p-8">
        <i
          className={`py-6 ${isSuccessful ? "text-green-100" : "text-red-100"}`}
        >
          {isSuccessful ? (
            <FaRegCheckCircle size={50} />
          ) : (
            <FaRegCircleXmark size={50} />
          )}
        </i>
        <h1 className="text-xl font-bold py-6">
          {isSuccessful ? "Items Reserved" : "Some Items Unavailable"}
        </h1>
        <p className="mt-2 text-md text-wrap pb-6">
          {isSuccessful
            ? "You have 48 hours to pick them up!"
            : "Some items were reserved as you were shopping."}
        </p>
        <p className="text-sm font-bold text-wrap pb-2">
          {isSuccessful ? "Pick Up Information: " : ""}
        </p>
        <p className="cursor-pointer text-sm text-wrap pb-1 text-blue-200 underline hover:text-blue-100">
          <a href="https://maps.app.goo.gl/KzkDLMqBfrRojHHLA" target="_blank">
            {isSuccessful ? "184 Barrie St, Kingston, ON K7L 3K1" : ""}
          </a>
        </p>
        <p className="text-sm pb-4 text-wrap">
          {isSuccessful ? "Hours: " : ""} <br></br> {isSuccessful ? " Monday - Friday from 8:30am - 4:30pm" : ""}
        </p>
        {!isSuccessful && (
          <div>
            <section className="flex space-x-24">
              <section>
                <h3 className="font-medium">Available:</h3>
                {cartValidity?.available.map((cartItem) => {
                  return (
                    <li key={uuid()}>
                      {cartItem.item.ItemName} ({cartItem.item.ItemType})
                    </li>
                  );
                })}
              </section>
              <section>
                <h3 className="font-medium">Unavailable:</h3>
                {cartValidity?.unAvailable.map((cartItem) => {
                  return (
                    <li key={uuid()}>
                      {cartItem.item.ItemName} ({cartItem.item.ItemType})
                    </li>
                  );
                })}
              </section>
            </section>
          </div>
        )}
        {isSuccessful ? (
          <section>
            <button
              onClick={() => closeModal()}
              className="mt-4 w-full justify-center font-semibold cursor-pointer text-white bg-black px-6 py-4 rounded-lg flex"
            >
              Ok
            </button>
          </section>
        ) : (
          <section className="flex space-x-4">
            <button
              onClick={() => getAvailableItems()}
              className="mt-4 justify-center w-1/2 text-sm font-semibold cursor-pointer text-black border border-black  p-4 rounded-lg flex"
            >
              Reserve Available Items
            </button>
            <button
              onClick={() => closeModal()}
              className="mt-4 justify-center items-center w-1/2 text-sm font-semibold cursor-pointer text-white bg-black p-4 rounded-lg flex"
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
