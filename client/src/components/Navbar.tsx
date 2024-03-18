import profilePic from "../assets/profile.svg";
import { MdOutlineSettings } from "react-icons/md";
import { clientMenuOptions, adminMenuOptions } from "../models/menuOptions";
import { useState } from "react";
import { getCurrentPageFromUrl } from "../utils/urlUtils";
import { Role } from "../models/User";
import { Link } from "react-router-dom";

const Navbar = (props: { userType: Role }) => {
  const [selected, setSelected] = useState(
    getCurrentPageFromUrl(window.location.href)
  );
  var options =
    props.userType === "admin" ? adminMenuOptions : clientMenuOptions;

  return (
    <div className="h-[95%] w-[7rem] rounded-3xl bg-gray-100 py-4 flex flex-col items-center">
      <img src={profilePic} alt="profile" className="mt-4"></img>
      <div
        className={`flex flex-col w-full justify-between items-center self-center justify-self-center mb-auto ${
          props.userType === "admin" ? "h-1/2 mt-[15vh]" : "h-1/3 mt-[20vh]"
        }`}
      >
        {options.map((option) => {
          return (
            <Link to={option.url} className="w-full">
              <span
                className={`w-[93%] flex items-center flex-col justify-center p-4 pr-1 rounded-full cursor-pointer transition-all	 ${
                  selected === option.page ? "bg-white px-1" : null
                }`}
                onClick={() => setSelected(option.page)}
              >
                <i>
                  <img
                    src={
                      selected === option.page
                        ? option.selectedIcon
                        : option.defaultIcon
                    }
                    alt={`{${option.page} icon}`}
                  ></img>
                </i>
                <div>
                  <span className="text-xs mt-1">{option.title}</span>
                </div>
              </span>
            </Link>
          );
        })}
      </div>
      <Link to={`/${props.userType}/settings/`}>
        <i className="cursor pointer mb-4 cursor-pointer">
          <MdOutlineSettings size={25} />
        </i>
      </Link>
    </div>
  );
};

Navbar.defaultProps = {
  userType: "client",
};
export default Navbar;
