import { Link } from "react-router-dom";
import profilePic from "../assets/profile.svg";
import InputField from "../components/InputField";
import { Role } from "../models/User";
import Switch from "@mui/material/Switch";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import Dropzone from "react-dropzone";
import "./Settings.css";
import DropFile from "../components/DropFile";

const Settings = (props: { userRole: Role }) => {
  // Add state management when we connect backend
  return (
    <div className="p-8 w-full">
      <Link to="/">
        <i className="cursor-pointer">
          <IoArrowBackSharp size={30} />
        </i>
      </Link>
      <div className=" w-full h-full pt-10 pl-16">
        <section className="flex mb-10 w-[75%]">
          <img className="w-20 mr-16" src={profilePic} />
          <DropFile />
        </section>
        <section className="w-[75%] space-y-8">
          <section className="flex justify-between w-full h-full space-x-8 mt-4">
            <InputField
              label="First Name"
              styles="border-[1px] bg-white px-4 w-80"
              value="John"
            ></InputField>
            <InputField
              label="Last Name"
              styles="border-[1px] bg-white px-4 w-80"
              value="Doe"
            ></InputField>
          </section>
          <InputField
            label="Email"
            styles="inline bg-white px-4 w-full"
            value="19fwha@queensu.ca"
            canEdit={false}
          ></InputField>
          <section className="flex justify-between items-end">
            <InputField
              label="Password"
              styles="inline bg-white px-4 w-[30rem]"
              value="test"
              type="password"
              canEdit={false}
            ></InputField>
            <button className="p-0 h-min w-max underline text-blue-200 hover:text-blue-300">
              Change Password
            </button>
          </section>
          <div className="flex justify-between">
            <section>
              <label
                htmlFor="inputText"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                E-mail Notifications
              </label>
              <p className="font-thin">
                {props.userRole === "client"
                  ? "Get notified when it’s time to return an item"
                  : "Get notified when an item is low on stock"}
              </p>
            </section>
            <Switch size="medium" defaultChecked />
          </div>
          <button className="p-0 h-min w-max underline text-blue-200 hover:text-blue-300 mt-8">
            Report Issue
          </button>
          <section className="flex space-x-4 justify-end">
            <button className="text-black border border-black bg-white px-6 py-4 rounded-lg flex items-center">
              <p>Cancel</p>
            </button>
            <button className="text-white border border-black bg-black px-6 py-4 rounded-lg flex items-center">
              <p>Apply</p>
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Settings;
