import React, { useState } from "react";
import clinicLogo from "../assets/clinic-logo.svg";
import profilePic from "../assets/profile.svg";
import lockPic from "../assets/lock.svg";

interface AccountTypeProps {
  onSignIn: () => void;
}

const AccountType: React.FC<AccountTypeProps> = ({ onSignIn }) => {
  const [accountType, setAccountType] = useState<string>();
  const handleSignin = () => {
    window.location.href = "/sign-in";
  };

  return (
    <div>
      <div className="absolute top-0 left-0 pl-10 pt-10 flex flex-row items-center">
        <div>
          <img
            src={clinicLogo}
            alt="Queen's Psychology Clinic logo"
            className="w-48"
          ></img>
        </div>
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="pl-12 flex flex-col">
              <div className="">
                <h1 className="text-2xl">Choose Account Type:</h1>
              </div>
              <div className="flex flex-row">
                <div
                  className="flex flex-row mt-10 p-5 border border-gray-900 rounded-full mr-10 cursor-pointer"
                  onClick={() => (window.location.href = "/sign-up/user")}
                >
                  <div className="">
                    <img src={profilePic} alt="profile" className="w-8"></img>
                  </div>
                  <div className="pl-8 flex items-center">
                    <p>User</p>
                  </div>
                </div>
                <div
                  className="flex flex-row mt-10 p-5 border border-gray-900 rounded-full cursor-pointer"
                  onClick={() => (window.location.href = "/sign-up/admin")}
                >
                  <div className="">
                    <img src={lockPic} alt="lock" className="w-8"></img>
                  </div>
                  <div className="pl-8 flex items-center">
                    <p>Admin</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-12 pt-10">
              <span>Already have an account?</span>
              <span
                className="pl-2 underline text-blue-200 cursor-pointer"
                onClick={handleSignin}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountType;
