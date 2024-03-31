import React, { useState } from "react";
import brainPic from "../assets/brain.png";
import clinicLogo from "../assets/clinic-logo.svg";
import InputField from "../components/InputField";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    window.location.href = "/account-type";
  };

  const handleSignIn = () => {
    onSignIn(email, password);
  };

  return (
    <div>
      <div className="absolute inset-y-0 left-0 pl-10 pt-10">
        <img
          src={clinicLogo}
          alt="Queen's Psychology Clinic logo"
          className="w-32"
        ></img>
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="pl-8 pt-10 flex flex-col">
              <div>
                <h1 className="font-bold text-2xl pt-14 pb-10">Sign In</h1>
              </div>
            </div>
            <div className="pl-8 flex flex-col">
              <div className="flex flex-col">
                <div className="">
                  <InputField
                    label="Queen's Email"
                    type="email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />{" "}
                </div>
                <div className="py-8">
                  <InputField
                    label="Password"
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-200 p-4 w-full rounded text-white font-semibold"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-8 pt-10">
              <span>Don't already have an account?</span>
              <span
                className="pl-2 underline text-blue-200 cursor-pointer"
                onClick={handleSignUp}
              >
                Sign Up
              </span>
            </div>
            <div className="ml-8 mt-2">
              <span className="underline text-blue-200 cursor-pointer">
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
