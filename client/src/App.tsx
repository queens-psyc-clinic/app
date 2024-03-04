import React from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import AdminCards from "./components/AdminCards";

export function App() {

  const userRole = "admin";


  return (
    <div className="w-screen h-screen bg-white flex px-4">
      <div className="items-center ">
        <Navbar />
      </div>
      <div className="flex flex-row">
        <div className="pl-10 pt-24">
          <AdminCards userRole={userRole} />
        </div>
        <div className="pt-32 pl-10">
          <Modal modalTitle="Add Item" buttonLabel="Save" secButtonLabel="Cancel"/>
        </div>
      </div>
    </div>
  );
}

export default App;
