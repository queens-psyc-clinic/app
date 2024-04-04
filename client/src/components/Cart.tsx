import { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Role } from "../models/User";
import { MdDelete } from "react-icons/md";
import PillCell from "./PillCell";
import ReserveModal from "./ReserveModal";
import {
  getCart,
  getQuantityofItem,
  changeQuantityofTest,
  deleteItemFromCart,
  checkIfCartIsValid,
  clearCart,
} from "../services/ShoppingCartService";
import { Item } from "../models/BEModels";
import uuid from "react-uuid";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getItemById, markItemAsReserved } from "../services/TestService";
import { getSessionId } from "../services/UserService";

// const mockCart: CartItem[] = [
//   {
//     id: "1",
//     Name: "Adaptive Behaviour Assessment System",
//     "Item Name": "Adult Form",
//     Item: "Form",
//     minAge: 16,
//     maxAge: 89,
//   },
//   {
//     id: "2",
//     Name: "Coping Responses Inventory",
//     "Item Name": "Professional Manual",
//     Item: "Manual",
//     minAge: 16,
//     maxAge: 89,
//   },
// ];

export interface CartItem {
  quantity: number;
  item: Partial<Item> & { ID: string };
  MeasureOf?: string;
  TestName?: string;
}
const Cart = (props: { userRole: Role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(true);
  const [cartValidity, setCartValidity] = useState<{
    available: CartItem[];
    unAvailable: CartItem[];
  }>();
  const cartRef = useRef<HTMLDivElement>(null);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function checkout() {
    // logic to check items are available and mark items as unavailable for pickup
    const validity = await checkIfCartIsValid();
    if (validity.unAvailable.length == 0) {
      toggleCart();
      // WAITING ON isConfirmed column in loans
      // Create a reservation loan
      // decrement stock of all items by quantities
      for (const item of cartItems) {
        await markItemAsReserved(
          item.item as Item,
          item.quantity,
          getSessionId() || ""
        ).catch((e) => console.log(e));
      }
      setIsCheckout(true);
      setIsCheckoutSuccessful(true);
      clearCart();
    } else {
      toggleCart();
      setIsCheckout(true);
      setIsCheckoutSuccessful(false);
      setCartValidity(validity);
    }
  }

  const increment = (itemId: string) => {
    const newQuantity = getQuantityofItem(itemId) + 1;
    changeQuantityofTest(itemId, newQuantity);
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.item.ID === itemId) {
          return {
            ...cartItem,
            quantity: newQuantity,
          };
        } else {
          return cartItem;
        }
      })
    );
  };

  const decrement = (itemId: string) => {
    const newQuantity = getQuantityofItem(itemId) - 1;
    changeQuantityofTest(itemId, newQuantity);
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.item.ID === itemId) {
          return {
            ...cartItem,
            quantity: newQuantity,
          };
        } else {
          return cartItem;
        }
      })
    );
  };

  function deleteFromCart(itemId: string) {
    deleteItemFromCart(itemId);
    setCartItems(cartItems.filter((cartItem) => cartItem.item.ID != itemId));
  }

  const closeModal = () => {
    setIsCheckout(false);
  };

  useEffect(() => {
    const cart: CartItem[] = getCart();
    setCartItems(cart);
  }, [isOpen]);

  return (
    <>
      <div className="" ref={cartRef}>
        <div
          onClick={toggleCart}
          className="relative w-16 h-16 shadow-md bg-white rounded-full flex justify-center items-center cursor-pointer"
        >
          <i className="mr-1 mt-1 cursor-pointer">
            <FiShoppingCart size={25} />
          </i>
        </div>
        {isOpen && (
          <div className="absolute top-20 right-20 h-[65vh] overflow-scroll bg-white w-[30vw] border-2 border-black rounded z-30">
            <section className="w-full bg-[#393939] text-white font-bold p-4">
              Cart
            </section>
            {cartItems.length == 0 && (
              <h3 className="w-full h-full flex items-center justify-center ">
                <span className="items-center justify-center w-max text-gray-200 text-center">
                  <mark className="bg-white text-gray-200 font-semibold">
                    Your cart is empty.
                  </mark>
                  <br></br>
                  Add items to cart to reserve!
                </span>
              </h3>
            )}
            {cartItems.map((cartItem) => {
              return (
                <section className="bg-white" key={uuid()}>
                  <section className="flex p-4 justify-between items-start">
                    <div className="ml-4">
                      {cartItem.TestName ? (
                        <p className="text-sm font-semibold w-3/4">
                          {cartItem.TestName}
                        </p>
                      ) : null}
                      <p className="text-sm font-light">
                        {cartItem.item.ItemName}
                      </p>
                    </div>
                    <i
                      className="cursor-pointer"
                      onClick={() => deleteFromCart(cartItem.item.ID)}
                    >
                      <MdDelete size={20} />
                    </i>
                  </section>
                  <div className="flex items-center mr-2 ml-8 mb-4">
                    <FaMinus
                      onClick={() => {
                        if (cartItem.quantity !== 1) {
                          decrement(cartItem.item.ID);
                        }
                      }}
                      className={`mr-2 ${
                        cartItem.quantity === 1
                          ? "cursor-default text-gray-200"
                          : "cursor-pointer"
                      }`}
                    />
                    <span className="mr-2 ml-2">{cartItem.quantity}</span>
                    <FaPlus
                      size={15}
                      onClick={() => {
                        if (cartItem.quantity !== cartItem.item.Stock) {
                          increment(cartItem.item.ID);
                        }
                      }}
                      className={`ml-2 ${
                        cartItem.quantity === cartItem.item.Stock
                          ? "cursor-default text-gray-200"
                          : "cursor-pointer"
                      }`}
                    />
                  </div>
                  <section className="flex pl-8 mb-4 space-x-4">
                    <PillCell
                      data={{
                        type: "item",
                        title: cartItem.item.ItemType || "",
                      }}
                    />
                    {cartItem.item.Ages && (
                      <PillCell
                        data={{
                          type: "age",
                          title: cartItem.item.Ages,
                        }}
                      />
                    )}
                  </section>

                  <hr className="w-1/2 border-gray-100 mx-auto"></hr>
                </section>
              );
            })}
            {cartItems.length != 0 && (
            <section className="w-full p-4 flex justify-center items-center">
              <button
                onClick={checkout}
                className="mx-auto font-semibold cursor-pointer text-white bg-black px-6 py-4 rounded-lg flex"
              >
                Reserve
              </button>
            </section>
            )}
          </div>
        )}
      </div>
      <ReserveModal
        isOpen={isCheckout}
        isSuccessful={isCheckoutSuccessful}
        closeModal={closeModal}
        cartValidity={!isCheckoutSuccessful ? cartValidity : undefined}
      />
    </>
  );
};

export default Cart;
