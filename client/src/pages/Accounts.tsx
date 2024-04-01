import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import AccountsTable from "../components/AccountsTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import {
  getAllSignedOutItems,
  getAllSignedOutItemsByUser,
  getItemById,
  getItemMeasure,
} from "../services/TestService";
import _ from "lodash";
import { Test, SignedOutItem } from "../models/BEModels";
import uuid from "react-uuid";
import Card from "../components/Card";

export interface AccountUser {
  FirstName: string;
  LastName: string;
  Email: string;
  ID: string;
}

const Accounts = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Omit<
    Test,
    "OrderingCompany"
  > | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AccountUser[]>([]);

  /* FETCHING REAL DATA */
  useEffect(() => {
    // Waiting on new column for users like IsApproved and for new serch endpoints
  }, []);

  console.log(props);

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      } overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className={`text-3xl mb-4 `}>Account Requests </h1>
          {props.userRole === "admin" && (
            <>
              <section className="mt-6 space-y-4 pb-5">
                <SearchBar placeholder="Search by user's name" />
                <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
                  <button className="bg-black w-max border border-black text-white px-3 py-2 rounded-lg flex items-center">
                    <i className="mr-4">
                      <MdCheckCircle size={20} />
                    </i>
                    <p>Approve</p>
                  </button>
                  <button className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center">
                    <i className="mr-4">
                      <MdRemoveCircle size={20} />
                    </i>
                    <p>Decline</p>
                  </button>
                </section>
              </section>
              <div>
                <AccountsTable
                  tableType="accounts"
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  data={data}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Accounts;