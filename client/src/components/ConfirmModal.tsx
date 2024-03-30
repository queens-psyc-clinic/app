import { FaRegCircleXmark } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const ConfirmModal = ({
  isOpen = true,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: Function;
}) => {
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed inset-0 z-30 w-screen h-[screen] bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white z-60 space-y-6 rounded m-auto max-w-[350px] p-8 flex flex-col items-center text-center">
        <MdDeleteForever size={50} className="text-red-100" />
        <h1 className="text-xl font-bold">Delete Items</h1>
        <p className="text-wrap">Are you sure you would like to delete these items?</p>
        <div className="flex justify-end pt-5">
          <button
            onClick={() => closeModal()}
            className="hover:bg-gray-100 hover:text-gray-900 px-6 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold mr-4"
          >
            Cancel
          </button>
          <button
            onClick={() => closeModal()}
            className="text-white hover:bg-gray-800 bg-gray-900 px-6 py-2 rounded-lg text-sm font-semibold"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
