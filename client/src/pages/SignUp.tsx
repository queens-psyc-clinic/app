import React, { useState } from "react";
import clinicLogo from "../assets/clinic-logo.svg";
import InputField from "../components/InputField";
import { useParams } from "react-router-dom";
import { Role } from "../models/User";

interface SignUpProps {
  onSignUp: (info: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const { type } = useParams();
  const [signUpInfo, setSignUpInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: type === "admin" ? true : false,
  });
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSignIn = () => {
    window.location.href = "/sign-in";
  };

  const handleSignUp = () => {
    if (password1 == password2) {
      onSignUp({
        ...signUpInfo,
        password: password1,
      });
    } else {
      alert("Please ensure both passwords match.");
    }
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
            <div>
              <h1 className="font-bold text-2xl pl-8">Sign Up</h1>
            </div>
            <div className="pl-8 flex flex-col pt-10">
              <div className="flex flex-col">
                <div className="flex flex-row pb-8 mt-10">
                  <div className="">
                    <InputField
                      label="First Name"
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          firstName: e.target.value,
                        })
                      }
                    />{" "}
                  </div>
                  <div className="pl-5">
                    <InputField
                      label="Last Name"
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSignUpInfo({
                          ...signUpInfo,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="">
                  <InputField
                    label="Queen's Email"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSignUpInfo({
                        ...signUpInfo,
                        email: e.target.value,
                      })
                    }
                  />{" "}
                </div>
                <div className="py-8">
                  <InputField
                    label="Password"
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword1(e.target.value)
                    }
                  />
                </div>
                <div className="pb-8">
                  <InputField
                    label="Confirm Password"
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword2(e.target.value)
                    }
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-200 p-4 w-full rounded text-white font-semibold"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-8 pt-8">
              <span>Already have an account?</span>
              <span
                className="pl-2 underline text-blue-200 cursor-pointer"
                onClick={handleSignIn}
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

export default SignUp;
