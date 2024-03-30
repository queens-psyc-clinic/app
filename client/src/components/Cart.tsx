import { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Role } from "../models/User";
import { MdDelete } from "react-icons/md";
import PillCell from "./PillCell";
import ReserveModal from "./ReserveModal";
import { getCart } from "../services/ShoppingCartService";
import { Item } from "../models/BEModels";
import uuid from "react-uuid";

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
}
const Cart = (props: { userRole: Role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
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

  useEffect(() => {
    const cart: CartItem[] = getCart();
    setCartItems(cart);
  }, [isOpen]);

  const checkout = () => {
    // logic to check items are available and mark items as unavailable for pickup

    // pop the modal
    toggleCart();
    setIsCheckout(true);
  };

  const closeModal = () => {
    setIsCheckout(false);
  };
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
            {cartItems.map((cartItem) => {
              return (
                <section className="bg-white" key={uuid()}>
                  <section className="flex p-4 justify-between items-start">
                    <div className="ml-4">
                      <p className="text-sm font-semibold w-3/4">Test Name</p>
                      <p className="text-sm font-light">
                        {cartItem.item.ItemName}
                      </p>
                    </div>
                    <i className="cursor-pointer">
                      <MdDelete size={20} />
                    </i>
                  </section>
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
            <section className="w-full p-4 flex justify-center items-center">
              <button
                onClick={checkout}
                className="mx-auto font-semibold cursor-pointer text-white bg-black px-6 py-4 rounded-lg flex"
              >
                Reserve
              </button>
            </section>
          </div>
        )}
      </div>
      {isCheckout && (
        <ReserveModal
          isOpen={true}
          isSuccessful={true}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Cart;
