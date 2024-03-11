import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Role } from "../models/User";
import { CartItem, getPillColor } from "../models/libraryItem";
import { MdDelete } from "react-icons/md";
import PillCell from "./PillCell";

const mockCart: CartItem[] = [
  {
    id: "1",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Item: "Form",
    minAge: 16,
    maxAge: 89,
  },
  {
    id: "2",
    Name: "Coping Responses Inventory",
    "Item Name": "Professional Manual",
    Item: "Manual",
    minAge: 16,
    maxAge: 89,
  },
];
const Cart = (props: { userRole: Role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCart);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  // IMPLEMENT LOCAL STORAGE WHEN WE CONNECT BACKEND
  return (
    <div className="">
      <div
        onClick={toggleCart}
        className="relative w-16 h-16 shadow-md bg-white rounded-full flex justify-center items-center cursor-pointer"
      >
        <i className="mr-1 mt-1 cursor-pointer">
          <FiShoppingCart size={25} />
        </i>
      </div>
      {isOpen && (
        <div className="absolute top-20 right-20 bg-white w-[35vw] border-2 border-black rounded z-30">
          <section className="w-full bg-[#393939] text-white font-bold p-4">
            Cart
          </section>
          {cartItems.map((item) => {
            return (
              <section className="bg-white">
                <section className="flex p-4 justify-between items-start">
                  <div className="ml-4">
                    <p className="text-sm font-semibold w-3/4">{item.Name}</p>
                    <p className="text-sm font-light">{item["Item Name"]}</p>
                  </div>
                  <i className="cursor-pointer">
                    <MdDelete size={20} />
                  </i>
                </section>
                <section className="flex pl-8 mb-4 space-x-4">
                  <PillCell
                    data={{
                      type: "item",
                      title: item.Item,
                    }}
                  />
                  <PillCell
                    data={{
                      type: "age",
                      title: `${item.minAge}-${item.maxAge}`,
                    }}
                  />
                </section>

                <hr className="w-1/2 border-gray-100 mx-auto"></hr>
              </section>
            );
          })}
          <section className="w-full p-4 flex justify-center items-center">
            <button className="mx-auto font-semibold cursor-pointer text-white bg-black px-6 py-4 rounded-lg flex">
              Reserve
            </button>
            {/* pop reservation modal */}
          </section>
        </div>
      )}
    </div>
  );
};

export default Cart;
