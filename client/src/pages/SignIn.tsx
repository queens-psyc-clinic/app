import React from "react";
import brainPic from "../assets/brain.png";
import clinicLogo from "../assets/cliniclogo.png";
import InputField from "../components/InputField";

interface SignInProps {
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  
  return (
    <div>
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="absolute top-0 left-0 pl-10 pt-10 flex flex-col">
                    <div>
                        <img src={clinicLogo} alt="brain held by hand" className="w-16"></img>
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl pt-14">Sign In</h1>
                    </div>
                </div>
                <div className="pl-8 flex flex-col">
                    <div className="flex flex-col">
                        <div className="">
                            <InputField label="Queen's Email" type="email"/>    {/* EMAIL RESTRICTION ISN'T WORKING */}
                        </div>
                        <div className="py-8">
                            <InputField label="Password"/>
                        </div>
                        <div>
                            <button className="bg-blue-200 p-4 w-full rounded text-white font-semibold" onClick={onSignIn}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div className="ml-8 pt-10">
                    <span>Don't already have an account?</span><span className="pl-2 underline text-blue-200 cursor-pointer">Sign Up</span>
                </div>
                <div className="ml-8 mt-2">
                    <span className="underline text-blue-200 cursor-pointer">Forgot Password?</span>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0">
                <img src={brainPic} alt="brain held by hand" className="h-screen"></img>
            </div>
        </div>
    </div>
  );
};

export default SignIn;
