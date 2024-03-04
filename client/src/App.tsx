import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import cardSampleData from './models/cardSampleData';
import Modal from "./components/Modal";

export function App() {

  const userRole = "admin";


  return (
    <div className="w-screen h-screen bg-white flex items-center px-4">
      <Navbar />
      <div className="m-10 pb-10 w-full mt-96 max-w-screen-lg">
        <div className="ml-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {cardSampleData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </div>
      <Modal modalTitle="Add Item" buttonLabel="Save" secButtonLabel="Cancel"/>
    </div>
  );
}

export default App;

