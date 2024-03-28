import React, { useState } from "react";
import clinicLogo from "../assets/clinic-logo.svg";
import InputField from "../components/InputField";
import { createNewAccount } from "../services/UserService";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  onSignIn: () => void;
}


const SignUp: React.FC<SignUpProps> = ({ onSignIn }) => {
  const handleSignIn = () => {
    window.location.href = '/sign-in';
  };
  const navigate = useNavigate(); // Hook for programmatically navigating
  const [accountInfo, setAccountInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await createNewAccount(accountInfo.firstName, accountInfo.lastName,
         accountInfo.email, accountInfo.password);
      navigate('/sign-in');
    } catch (error) {
      console.error('Failed to create account', error);
    }
  }

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
                    <InputField 
                      value=""
                      name="firstName" 
                      label="First Name" 
                      type="text" 
                      onChange={handleInputChange}/>{" "}
                  </div>
                  <div className="pl-5">
                    <InputField 
                      value=""
                      name="lastName" 
                      label="Last Name" 
                      type="text" 
                      onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="">
                  <InputField 
                    value=""
                    name="email" 
                    label="Queen's Email" 
                    type="email" 
                    onChange={handleInputChange}/>{" "}
                </div>
                <div className="py-8">
                  <InputField 
                    value=""
                    name="password" 
                    label="Password" 
                    type="password" 
                    onChange={handleInputChange}/>
                </div>
                <div className="pb-8">
                  <InputField 
                    value=""
                    name="confirmPassword" 
                    label="Confirm Password" 
                    type="password" 
                    onChange={handleInputChange}/>
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
              <span className="pl-2 underline text-blue-200 cursor-pointer" onClick={handleSignIn}>
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
