import { useState } from "react";
import InputField from "./InputField";

const ChangePasswordModal = ({
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
  onOk: (old: string, new1: string, new2: string) => void;
  onClose: () => void;
}) => {
  const [old, setOld] = useState("");
  const [new1, setNew1] = useState("");
  const [new2, setNew2] = useState("");
  async function handleOk() {
    await onOk(old, new1, new2);
    closeModal();
  }
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed inset-0 z-30 w-screen h-[screen] bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white z-60 space-y-6 rounded m-auto p-8 flex flex-col max-w-[490px]">
        <h1 className="text-xl font-bold">{header}</h1>
        <p className="text-wrap">{description}</p>
        <InputField
          label="Old Password"
          placeholder="old password"
          important={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOld(e.target.value)
          }
        />
        <InputField
          label="New Password"
          placeholder="new password"
          important={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNew1(e.target.value)
          }
        />
        <InputField
          label="Confirm New Password"
          placeholder="new password"
          important={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNew2(e.target.value)
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
            onClick={() => handleOk()}
            className="text-white hover:bg-gray-800 bg-gray-900 px-6 py-2 rounded-lg text-sm font-semibold"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
