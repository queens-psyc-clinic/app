import { useState } from "react";
import { BiSolidBell } from "react-icons/bi";
import {
  adminMockNotifications,
  clientMockNotifications,
} from "../utils/mockData";
import { Role } from "../models/User";
import { notificationType } from "../models/notification";
import overdue from "../assets/icons/overdue-color.svg";
import lowStock from "../assets/icons/low-stock-color.svg";

const Notification = (props: { userRole: Role }) => {
  const [isEmpty, setIsEmpty] = useState(false); // checks if there are notifications, to show the red circle
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // mock notifications
  const notifications =
    props.userRole == "client"
      ? clientMockNotifications
      : adminMockNotifications;

  return (
    <div className="absolute top-4 right-4">
      <div
        onClick={toggleNotifications}
        className="absolute top-4 right-4 w-16 h-16 shadow-md bg-white rounded-full flex justify-center items-center cursor-pointer"
      >
        <i>
          <BiSolidBell size={25} />
        </i>
        <span
          className={`w-3 h-3 bg-red-100 rounded-full absolute top-1 left-1 ${
            !isEmpty ? null : "hidden"
          }`}
        ></span>
      </div>
      {isOpen && (
        <div className="relative top-24 right-24 bg-white w-[30vw] border-2 border-black rounded z-30">
          <section className="w-full bg-[#393939] text-white font-bold p-4">
            Notifications
          </section>
          {notifications.map((notification) => {
            return (
              <section className="bg-white">
                <section className="flex p-4 items-start">
                  <i>
                    <img
                      src={
                        notification.notificationType ==
                        notificationType.lowStock
                          ? lowStock
                          : overdue
                      }
                      className="object-contain w-6 h-6"
                    />
                  </i>
                  <div className="ml-6">
                    <p className="text-base font-semibold">
                      {notification.notificationType ==
                      notificationType.lowStock
                        ? "Running Low"
                        : "Time to Return"}
                    </p>
                    <p className="text-sm font-light">
                      {notification.itemName}
                    </p>
                    <p className="text-xs font-extralight mt-3">
                      {notification.date} | {notification.time}
                    </p>
                  </div>
                </section>
                <hr className="w-1/2 border-gray-100 mx-auto"></hr>
              </section>
            );
          })}
          <section className="w-full p-4 flex justify-center items-center">
            <p className="mx-auto underline font-semibold cursor-pointer">
              View All
            </p>{" "}
            {/* Should redirect to notifications page */}
          </section>
        </div>
      )}
    </div>
  );
};

export default Notification;