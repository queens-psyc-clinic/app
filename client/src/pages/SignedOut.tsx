import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar, { searchSuggestion } from "../components/SearchBar";
import Filter from "../components/Filter";
import _ from "lodash";
import { Test, Item, SignedOutItem } from "../models/BEModels";
import {
  getAllSignedOutItems,
  getAllSignedOutItemsByUser,
  getItemById,
  getItemMeasure,
  getLoanByAcronym,
  getLoanByName,
  getLoanByUserName,
  getLoansForItemFormatted,
  markItemAsAvailable,
} from "../services/TestService";
import SignedOutTable from "../components/SignedOutTable";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdAssignmentTurnedIn } from "react-icons/md";
import uuid from "react-uuid";
import { PropaneSharp } from "@mui/icons-material";
import {
  Measure,
  ItemTypeOptions,
  MaximumAge,
  MinimumAge,
} from "../models/libraryItem";
import cardSampleData, { BorrowedBy } from "../models/cardSampleData";
import { getSessionId } from "../services/UserService";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";
import ReportIssueModal from "../components/ReportIssueModal";

const SignedOut = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Omit<
    Test,
    "OrderingCompany"
  > | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminData, setAdminData] = useState<
    (SignedOutItem & { Quantity: number })[]
  >([]);
  const [clientData, setClientData] = useState<Omit<Test, "OrderingCompany">[]>(
    []
  );

  /* FETCHING REAL DATA */
  useEffect(() => {
    initializeSearchTree("SIGNEDOUT").then(() => console.log("initialized"));
    if (props.userRole === "admin") {
      setIsLoading(true);
      getAllSignedOutItems().then((res) => {
        setAdminData(res as SignedOutItem[]);
        setIsLoading(false);
      });
    } else if (props.userRole === "client") {
      setIsLoading(true);
      getAllSignedOutItemsByUser(getSessionId() || "").then(async (res) => {
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
                  // Quantity: signedOutItem.Quantity,
                },
              ],
              "LoanID"
            )
          );
        }
        setIsLoading(false);
      });
    }
  }, [props]);

  const handleSearchSuggestionSelect = (suggestion: searchSuggestion) => {
    setIsLoading(true);
    if (suggestion.kind === "ItemName") {
      // Item Name
      // get loan by item name and set data to it
      getLoanByName(suggestion.value, true).then((res) => {
        console.log(res);
        setAdminData(res as (SignedOutItem & { Quantity: number })[]);
        setIsLoading(false);
      });
    } else if (suggestion.kind === "ItemID") {
      // get loan by item ID and set data to it
      getLoansForItemFormatted(suggestion.value).then((res) => {
        console.log(res);
        setAdminData(res as (SignedOutItem & { Quantity: number })[]);
        setIsLoading(false);
      });
    } else if (suggestion.kind == "FirstLastName") {
      // get loan by user and set data to it
      getLoanByUserName(suggestion.value, true).then((res) => {
        setAdminData(res as (SignedOutItem & { Quantity: number })[]);
        setIsLoading(false);
      });
    }
  };

  async function handleQueryEnter(query: string) {
    if (query == "") {
      setIsLoading(true);
      getAllSignedOutItems().then((res) => {
        setAdminData(res as (SignedOutItem & { Quantity: number })[]);
        setIsLoading(false);
      });
    }
    const suggestions = await getSearchSuggestions(query);
    const possibleResults: (SignedOutItem & { Quantity: number })[] =
      await Promise.all(
        suggestions.map(async (suggestion: searchSuggestion) => {
          if (suggestion.kind === "ItemID") {
            const items = await getLoanByName(suggestion.value);
            return items;
          } else if (suggestion.kind === "ID") {
            const items = await getLoansForItemFormatted(suggestion.value);
            return items;
          } else if (suggestion.kind === "FirstLastName") {
            const items = await getLoanByUserName(suggestion.value);
            return items;
          }
        })
      );
    setAdminData(_.flatten(possibleResults));
  }
  const handleReportIssueClick = () => {
    setIsModalOpen(true);
  };

  const handleCardClick = (data: Omit<Test, "OrderingCompany">) => {
    setSelectedCard(data);
    setIsModalOpen(true);
  };

  async function handleMarkAsReturned() {
    const errors: any[] = [];
    for (const loanId of selectedRows) {
      await markItemAsAvailable(loanId).catch((e) => errors.push(e));
    }
    if (errors.length > 0) {
      alert("There was an issue marking these items as returned.");
    } else {
      alert("Items returned successfully!");
      window.location.reload();
    }
  }

  const borrowedByOptions: string[] = cardSampleData.map(
    (item) => item["Borrowed By"].data
  );

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      } overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <h1 className={`text-3xl mb-4 `}>Signed Out Items </h1>
        {props.userRole === "admin" && (
          <>
            <section className="mt-6 space-y-4 pb-5">
              <SearchBar
                placeholder="Search by item name or acronym"
                onSelectSuggestion={handleSearchSuggestionSelect}
                onQuerySearch={handleQueryEnter}
              />

              <Filter
                placeholders={["Measure", "Item"]}
                options={[
                  borrowedByOptions,
                  Object.values(Measure),
                  ItemTypeOptions,
                ]}
              />
              <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
                <button
                  className="text-black border border-black w-max bg-white px-3 py-2 rounded-lg flex items-center"
                  onClick={handleMarkAsReturned}
                >
                  <i className="mr-4">
                    <MdAssignmentTurnedIn size={20} />
                  </i>
                  <p>Mark As Returned</p>
                </button>
              </section>
            </section>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <SignedOutTable
                tableType="reservations"
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                data={adminData}
              />
            )}
          </>
        )}
        {props.userRole === "client" && (
          <>
            <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {clientData.map((item) => {
                return <Card key={uuid()} data={item} type="item" />;
              })}
            </div>
            <div className="text-sm fixed bottom-10 right-10 bg-gray-100 p-6 rounded-lg shadow-md max-w-64 text-center">
              <p className="text-wrap py-1">
                Issue with an item? Something missing or damaged?
              </p>
              <button
                className="cursor-pointer text-blue-200 underline hover:text-blue-100"
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
      {/* )} */}
    </div>
  );
};

export default SignedOut;
