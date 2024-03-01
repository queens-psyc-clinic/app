import profilePic from "../assets/profile.svg";
import { MdOutlineSettings } from "react-icons/md";
import { clientMenuOptions, adminMenuOptions } from "../models/menuOptions";

import { useState } from "react";

const Navbar = (props: { userType: string }) => {
  const [selected, setSelected] = useState("home");
  var options =
    props.userType === "admin" ? adminMenuOptions : clientMenuOptions;

  return (
    <div className="h-[95%] w-[6rem] rounded-3xl bg-gray-100 py-4 flex flex-col items-center">
      <img src={profilePic} alt="profile" className="mt-4"></img>
      <div
        className={`flex flex-col w-full justify-between items-center self-center justify-self-center mb-auto ${
          props.userType === "admin" ? "h-1/2 mt-[15vh]" : "h-1/3 mt-[20vh]"
        }`}
      >
        {options.map((option) => {
          return (
            <span
              className={`w-[93%] flex items-center justify-center p-4 rounded-full cursor-pointer transition-all	 ${
                selected === option.title ? "bg-white pr-1" : null
              }`}
              onClick={() => setSelected(option.title)}
            >
              <span
                className={`w-2 h-2 bg-green-200 rounded-full ${
                  selected === option.title ? "mr-3" : "hidden"
                }`}
              ></span>
              <div className="flex flex-col">
                <div>
                  <i>
                    <img
                      src={
                        selected === option.title
                          ? option.selectedIcon
                          : option.defaultIcon
                      }
                      alt={`${option.title} icon`}
                    ></img>
                  </i>
                </div>
                <div>
                  <span className="text-xs mt-1">{option.title}</span>
                </div>
              </div>
              
            </span>
          );
        })}
      </div>
      <i className="cursor pointer mb-4 cursor-pointer">
        <MdOutlineSettings size={25} />
      </i>
    </div>
  );
};

Navbar.defaultProps = {
  userType: "client",
};
export default Navbar;
