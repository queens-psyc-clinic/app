import React from "react";
import clinicLogo from "../assets/clinic-logo.svg";
import InputField from "../components/InputField";

interface SignUpProps {
  onSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignIn }) => {
  return (
    <div>
      <div className="absolute inset-y-0 left-0 pl-10 pt-10">
        <img src={clinicLogo} alt="Queen's Psychology Clinic logo" className="w-32"></img>
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div>
              <h1 className="font-bold text-2xl pl-8">Sign Up</h1>
            </div>
            <div className="pl-8 flex flex-col pt-10">
              <div className="flex flex-col">
                <div className="flex flex-row pb-8 mt-10">
                  <div className="">
                    <InputField label="First Name" type="text" />{" "}
                    {/* TEXT RESTRICTION ISN'T WORKING */}
                  </div>
                  <div className="pl-5">
                    <InputField label="Last Name" type="text" />
                  </div>
                </div>
                <div className="">
                  <InputField label="Queen's Email" type="email" />{" "}
                  {/* EMAIL RESTRICTION ISN'T WORKING */}
                </div>
                <div className="py-8">
                  <InputField label="Password" />
                </div>
                <div className="pb-8">
                  <InputField label="Confirm Password" />
                </div>
                <div>
                  <button
                    className="bg-blue-200 p-4 w-full rounded text-white font-semibold"
                    onClick={onSignIn}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-8 pt-8">
              <span>Don't already have an account?</span>
              <span className="pl-2 underline text-blue-200 cursor-pointer">
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
