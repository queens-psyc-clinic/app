import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import _ from "lodash";
import { Test, SignedOutItem, Item } from "../models/BEModels";
import {
  getAllSignedOutItems,
  getAllSignedOutItemsByUser,
  getItemById,
  getItemMeasure,
} from "../services/TestService";
import SignedOutTable from "../components/SignedOutTable";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdAssignmentTurnedIn } from "react-icons/md";
import uuid from "react-uuid";
import { PropaneSharp } from "@mui/icons-material";
import { getSessionId } from "../services/UserService";
import ReportIssueModal from "../components/ReportIssueModal";

const SignedOut = (props: { userRole: Role }) => {
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
      getAllSignedOutItemsByUser(getSessionId() || "").then(async (res) => {
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
  }, [props]);

  useEffect(() => {
    console.log("CLIENT DATA: ", clientData);
  }, [clientData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleReportIssueClick = () => {
    setIsModalOpen(true);
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
          <h1 className={`text-3xl mb-4 `}>Signed Out Items </h1>
          {props.userRole === "admin" && (
            <>
              <section className="mt-6 space-y-4 pb-5">
                <SearchBar />
                <Filter />
                <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
                  <button className="text-black border border-black w-max bg-white px-3 py-2 rounded-lg flex items-center">
                    <i className="mr-4">
                      <MdAssignmentTurnedIn size={20} />
                    </i>
                    <p>Mark As Returned</p>
                  </button>
                </section>
              </section>
              <SignedOutTable
                tableType="signedOut"
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                data={adminData}
              />
            </>
          )}
          {props.userRole === "client" && (
            <>
              <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {clientData.map((item) => {
                  return <Card key={uuid()} data={item} type="item" />;
                })}
              </div>
              <div className="text-sm fixed bottom-10 right-10 bg-white p-6 rounded-lg shadow-md max-w-64 text-center">
                <p className="text-wrap py-1">
                  Issue with an item? Something missing or damaged?
                </p>
                <button
                  className="cursor-pointer text-blue-200 underline"
                  onClick={handleReportIssueClick}
                >
                  Report Issue Here
                </button>
              </div>
              {isModalOpen && (
                <ReportIssueModal
                  isOpen={isModalOpen}
                  closeModal={() => setIsModalOpen(false)}
                  header="Report an Issue"
                  description="If you noticed something wrong with an item you signed out, please let us know here:"
                  button="Send"
                  secondButton="Cancel"
                  onOk={() => {}}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SignedOut;
