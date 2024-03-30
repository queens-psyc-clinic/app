import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

import Table from "../components/Table";
import { requestsMockData } from "../utils/mockData";
import cardSampleData, { CardData } from "../models/cardSampleData";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import { Test } from "../models/BEModels";

const Requests = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<Omit<Test, "OrderingCompany">[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // WAITING ON reservations table or isConfirmed column in loans!
    setData([]);
  }, []);

  const markAsPickedUp = () => {
    // Turn reservation item into a loan, and delete from reservations table
  };

  const unReserveItem = () => {
    // Remove items from reservations, which should increment the item quantities
  };
  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4`}>Requested Items </h1>
      {props.userRole === "admin" && (
        <>
          <section className="mt-6 space-y-4 pb-5">
            <SearchBar />
            <Filter />
            <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
              <button className="bg-black w-max border border-black text-white px-3 py-2 rounded-lg flex items-center">
                <i className="mr-4">
                  <MdCheckCircle size={20} />
                </i>
                <p>Mark as Picked Up</p>
              </button>
              <button className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center">
                <i className="mr-4">
                  <MdRemoveCircle size={20} />
                </i>
                <p>Unreserve</p>
              </button>
            </section>
          </section>
          <Table
            tableType="signedOut"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}
    </div>
  );
};

export default Requests;
