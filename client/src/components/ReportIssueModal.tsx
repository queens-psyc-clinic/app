import InputField from "./InputField";

const ReportIssueModal = ({
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
    onOk: () => void;
    onClose: () => void;
  }) => {
    async function handleOk() {
      await onOk();
      closeModal();
    }
    return (
      <div
        className={`${
          !isOpen && "hidden"
        } fixed inset-0 z-30 w-screen h-[screen] bg-black bg-opacity-50 flex justify-center items-center`}
      >
        <div className="bg-white z-60 space-y-6 rounded m-auto p-8 flex flex-col max-w-[450px]">
          <h1 className="text-xl font-bold">{header}</h1>
          <p className="text-wrap">{description}</p>
          <InputField label="Item Name" placeholder="Adult Form"/>
          <InputField label="Item Acronym" placeholder="ABAS-2"/>
          <InputField label="What is wrong?" placeholder="Description of issue"/>
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
  
  export default ReportIssueModal;
  