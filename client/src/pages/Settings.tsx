import { Link } from "react-router-dom";
import profilePic from "../assets/profile.svg";
import InputField from "../components/InputField";
import { Role } from "../models/User";
import Switch from "@mui/material/Switch";
import { IoArrowBackSharp } from "react-icons/io5";
import "./Settings.css";
import AccountsTable from "../components/AccountsTable";
import { SignedOutItem } from "../models/BEModels";
import DropFile from "../components/DropFile";
import {
  getSessionId,
  getUserSettingsData,
  logOut,
  updateUserSettings,
} from "../services/UserService";
import { useEffect, useState } from "react";
import { UserSettings } from "../models/BEModels";

const Settings = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [adminData, setAdminData] = useState<SignedOutItem[]>([]);

  // Add state management when we connect backend
  const [userSettings, setUserSettings] = useState<UserSettings>({
    Email: "",
    FirstName: "",
    ID: "",
    IsAdmin: false,
    LastName: "",
    IsSubscribed: true,
  });

  useEffect(() => {
    getUserSettingsData(getSessionId() || "").then((res) =>
      setUserSettings(res)
    );
  }, []);
  console.log(userSettings);

  const handleApply = () => {
    updateUserSettings(userSettings)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) =>
        alert("There was an error updating your account information.")
      );
  };
  return (
    <div className="p-8 w-full">
      <Link to="/">
        <i className="cursor-pointer">
          <IoArrowBackSharp size={30} />
        </i>
      </Link>
      <div className="w-full h-full pt-10 pl-16">
        <section className="w-max space-y-8">
          <section className="flex  w-full h-full space-x-8 mt-4">
            <InputField
              label="First Name"
              styles="border-[1px] bg-white px-4 w-96"
              placeholder={userSettings.FirstName}
              value={userSettings.FirstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserSettings({ ...userSettings, FirstName: e.target.value })
              }
            ></InputField>
            <InputField
              label="Last Name"
              styles="border-[1px] bg-white px-4 w-96"
              placeholder={userSettings.LastName}
              value={userSettings.LastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserSettings({ ...userSettings, LastName: e.target.value })
              }
            ></InputField>
          </section>
          <InputField
            label="Email"
            styles="inline bg-white px-4 w-full"
            placeholder={userSettings.Email}
            value={userSettings.Email}
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
            <Switch
              size="medium"
              checked={userSettings.IsSubscribed}
              onChange={() =>
                setUserSettings({
                  ...userSettings,
                  IsSubscribed: !userSettings.IsSubscribed,
                })
              }
            />
          </div>
          <button className="block p-0 h-min w-max underline text-blue-200 hover:text-blue-300 mt-8">
            Report Issue
          </button>
          <button
            className="px-4 py-2 font-medium text-white bg-red-200 rounded ml-auto"
            onClick={() => {
              logOut();
              window.location.href = "/sign-in";
            }}
          >
            Log Out
          </button>
          <section className="flex space-x-4 justify-end">
            <button className="text-black border border-black bg-white px-6 py-4 rounded-lg flex items-center">
              <p>Cancel</p>
            </button>
            <button
              className="text-white border border-black bg-black px-6 py-4 rounded-lg flex items-center"
              onClick={handleApply}
            >
              <p>Apply</p>
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Settings;
