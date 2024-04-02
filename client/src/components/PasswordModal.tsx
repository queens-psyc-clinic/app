import { useState } from "react";
import InputField from "./InputField";
import LoadingSpinner from "./LoadingSpinner";

const PasswordModal = ({
  isOpen = true,
  closeModal,
  header,
  description,
  button,
  secondButton,
  onOk,
  onClose,
}: {
  isOpen: boolean;
  closeModal: Function;
  header: String;
  description: String;
  button: String;
  secondButton: string;
  onOk: (email: string) => Promise<boolean>;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleOk(email: string) {
    setIsLoading(true);
    const isSuccess = await onOk(email);
    setIsLoading(false);
    if (isSuccess) {
      alert("Account reset email sent! Check your email.");
      closeModal();
    } else {
      alert(
        "There was an issue resetting your account, ensure you have entered the correct email."
      );
    }
  }
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed inset-0 z-30 w-screen h-[screen] bg-black bg-opacity-50 flex justify-center items-center`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white z-60 space-y-6 rounded m-auto p-8 flex flex-col max-w-[490px]">
          <h1 className="text-xl font-bold">{header}</h1>
          <p className="text-wrap">{description}</p>
          <InputField
            label="Email"
            placeholder="email"
            important={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <div className="flex pt-5">
            <button
              onClick={() => closeModal()}
              className="hover:bg-gray-100 hover:text-gray-900 px-6 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold mr-4"
            >
              {secondButton}
            </button>
            <button
              onClick={() => handleOk(email)}
              className="text-white hover:bg-gray-800 bg-gray-900 px-6 py-2 rounded-lg text-sm font-semibold"
            >
              {button}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordModal;
