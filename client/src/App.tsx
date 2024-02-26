import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

export function App() {
  return (
    <div className="w-screen h-screen bg-white flex items-center px-4">
      <Navbar />
      <Modal modalTitle="Add Item" buttonLabel="Save" secButtonLabel="Cancel"/>
    </div>
  );
}

export default App;
