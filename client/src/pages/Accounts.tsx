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

const Accounts = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Omit<
    Test,
    "OrderingCompany"
  > | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminData, setAdminData] = useState<SignedOutItem[]>([]);
  const [clientData, setClientData] = useState<Omit<Test, "OrderingCompany">[]>(
    []
  );

  /* FETCHING REAL DATA */
  useEffect(() => {
    if (props.userRole === "admin") {
      setIsLoading(true);
      getAllSignedOutItems().then((res) => {
        setAdminData(res as SignedOutItem[]);
        setIsLoading(false);
      });
    } else if (props.userRole === "client") {
      setIsLoading(true);
      getAllSignedOutItemsByUser("1").then(async (res) => {
        // WAITING ON me to set up routing for now I am just using client id 1, but this should use the signed in client's id

        for (const signedOutItem of res) {
          const itemMeasure = await getItemMeasure(signedOutItem.Acronym);
          const item = await getItemById(signedOutItem.Acronym);

          setClientData((prev) =>
            _.unionBy(
              [
                ...prev,
                {
                  ...item,
                  MeasureOf: itemMeasure,
                  EditionNumber: "",
                  LevelOfUser: "",
                  LoanID: signedOutItem.ID,
                  StartDate: signedOutItem.StartDate,
                  EndDate: signedOutItem.EndDate,
                },
              ],
              "LoanID"
            )
          );
        }
        setIsLoading(false);
        console.log("done");
      });
    }
  }, []);

  useEffect(() => {
    console.log("CLIENT DATA: ", clientData);
  }, [clientData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (data: Omit<Test, "OrderingCompany">) => {
    setSelectedCard(data);
    setIsModalOpen(true);
  };
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
                  data={adminData}
                />
              </div>
            </>
          )}
          {props.userRole === "client" && (
            <>
              <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {clientData.map((item) => {
                  return <Card key={uuid()} data={item} type="item" />;
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Accounts;
