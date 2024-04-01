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
import { SignedOutItem, Test } from "../models/BEModels";
import PageNotFound from "./PageNotFound";
import {
  getAllReservedItems,
  markItemAsSignedOut,
  unReserveItem,
} from "../services/TestService";
import SignedOutTable from "../components/SignedOutTable";

const Requests = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<(SignedOutItem & { Quantity: number })[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllReservedItems().then((res) => {
      setData(res as (SignedOutItem & { Quantity: number })[]);
    });
  }, []);

  async function markAsPickedUp() {
    // Turn reservation item into a loan
    // markItemAsSignedOut()
    const errors: any[] = [];
    for (const loanId of selectedRows) {
      await markItemAsSignedOut(loanId).catch((e) => errors.push(e));
    }
    if (errors.length > 0) {
      alert("There was an issue signing out these items.");
    } else {
      alert("Items signed out successfully!");
      window.location.reload();
    }
  }

  async function markAsUnreserved() {
    // Remove items from reservations, which should increment the item quantities
    const errors: any[] = [];
    for (const loanId of selectedRows) {
      await unReserveItem(loanId).catch((e) => errors.push(e));
    }
    if (errors.length > 0) {
      alert("There was an issue removing these reservations.");
    } else {
      alert("Reservations removed successfully!");
      window.location.reload();
    }
  }

  if (props.userRole == "admin") {
    return (
      <div
        className={`relative flex flex-col ${
          props.userRole === "admin" ? "justify-end" : "py-16"
        }  overflow-x-hidden p-6 py-10 w-full h-full`}
      >
        <h1 className={`text-3xl mb-4`}>Requested Items </h1>

        <>
          <section className="mt-6 space-y-4 pb-5">
            <SearchBar />
            <Filter />
            <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
              <button
                className="bg-black w-max border border-black text-white px-3 py-2 rounded-lg flex items-center"
                onClick={markAsPickedUp}
              >
                <i className="mr-4">
                  <MdCheckCircle size={20} />
                </i>
                <p>Mark as Picked Up</p>
              </button>
              <button
                className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center"
                onClick={markAsUnreserved}
              >
                <i className="mr-4">
                  <MdRemoveCircle size={20} />
                </i>
                <p>Unreserve</p>
              </button>
            </section>
          </section>
          <SignedOutTable
            tableType="reservations"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Requests;
