import React from "react";
import brainPic from "../assets/brain.png";
import clinicLogo from "../assets/cliniclogo.png";
import profilePic from "../assets/profile.svg";
import lockPic from "../assets/lock.svg";

interface AccountTypeProps {
  onSignIn: () => void;
}

const AccountType: React.FC<AccountTypeProps> = ({ onSignIn }) => {
  
  return (
    <div>
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="absolute top-0 left-0 pl-10 pt-10 flex flex-row items-center">
                    <div>
                        <img src={clinicLogo} alt="brain held by hand" className="w-16"></img>
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl pl-5">Sign Up</h1>
                    </div>
                </div>
                <div className="pl-12 flex flex-col">
                    <div className="">
                        <h1 className="text-2xl">Choose Account Type:</h1>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-row mt-10 p-5 border border-gray-900 rounded-full mr-10 cursor-pointer">
                            <div className="">
                                <img src={profilePic} alt="brain held by hand" className="w-8"></img>
                            </div>
                            <div className="pl-8 flex items-center">
                                <p>Student</p>
                            </div>
                        </div>
                        <div className="flex flex-row mt-10 p-5 border border-gray-900 rounded-full cursor-pointer">
                            <div className="">
                                <img src={lockPic} alt="brain held by hand" className="w-8"></img>
                            </div>
                            <div className="pl-8 flex items-center">
                                <p>Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-12 pt-10">
                    <span>Already have an account?</span><span className="pl-2 underline text-blue-200 cursor-pointer">Sign In</span>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0">
                <img src={brainPic} alt="brain held by hand" className="h-screen"></img>
            </div>
        </div>
    </div>
  );
};

export default AccountType;