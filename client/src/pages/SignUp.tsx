import React from "react";
import brainPic from "../assets/brain.png";
import clinicLogo from "../assets/cliniclogo.png";
import InputField from "../components/InputField";

interface SignUpProps {
  onSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignIn }) => {
  
  return (
    <div>
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="absolute top-0 left-0 pl-10 pt-10 flex flex-row items-center">
                    <div>
                        <img src={clinicLogo} alt="brain held by hand" className="w-16"></img>
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl pl-5">Sign In</h1>
                    </div>
                </div>
                <div className="pl-8 flex flex-col pt-10">
                    <div className="flex flex-col">
                        <div className="flex flex-row pb-8 mt-10">
                            <div className="">
                                <InputField label="First Name" type="text"/>    {/* TEXT RESTRICTION ISN'T WORKING */}
                            </div>
                            <div className="pl-5">
                                <InputField label="Last Name" type="text"/>
                            </div>
                        </div>
                        <div className="">
                            <InputField label="Queen's Email" type="email"/>    {/* EMAIL RESTRICTION ISN'T WORKING */}
                        </div>
                        <div className="py-8">
                            <InputField label="Password"/>
                        </div>
                        <div className="pb-8">
                            <InputField label="Confirm Password"/>
                        </div>
                        <div>
                            <button className="bg-blue-200 p-4 w-full rounded text-white font-semibold" onClick={onSignIn}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div className="ml-8 pt-8">
                    <span>Don't already have an account?</span><span className="pl-2 underline text-blue-200 cursor-pointer">Sign In</span>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0">
                <img src={brainPic} alt="brain held by hand" className="h-screen"></img>
            </div>
        </div>
    </div>
  );
};

export default SignUp;

