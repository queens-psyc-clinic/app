import { useEffect, useState } from "react";
import { Role } from "../models/User";
import Filter, { PossibleFilters } from "../components/Filter";
import SearchBar, { searchSuggestion } from "../components/SearchBar";
import { BiSolidBell } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import _ from "lodash";

import { OverdueItem, Test, Item } from "../models/BEModels";
import {
  getAllOverdueItems,
  getAllOverdueTestsByUser,
  getItemById,
  getItemMeasure,
  getLoanByName,
  getLoanByUserName,
  getLoansForItemFormatted,
  isTestAvailable,
  markOverdueItemAsGone,
} from "../services/TestService";
import OverdueTable from "../components/OverdueTable";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { ItemTypeOptions, Measure } from "../models/libraryItem";
import cardSampleData from "../models/cardSampleData";
import { getSessionId } from "../services/UserService";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";

const Overdue = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminData, setAdminData] = useState<
    (OverdueItem & { ItemType: string })[]
  >([]);
  const [original, setOriginal] = useState<
    (OverdueItem & { ItemType: string })[]
  >([]);
  const [session, setSession] = useState<string>("");
  const [clientData, setClientData] = useState<Omit<Test, "OrderingCompany">[]>(
    []
  );
  const borrowedByOptions: string[] = cardSampleData.map(
    (item) => item["Borrowed By"].data
  );

  useEffect(() => {
    initializeSearchTree("OVERDUE");
    if (props.userRole === "admin") {
      getAllOverdueItems().then((res) => {
        setAdminData(res as (OverdueItem & { ItemType: string })[]);
        setOriginal(res as (OverdueItem & { ItemType: string })[]);
        setIsLoading(false);
      });
    } else if (props.userRole === "client") {
      // WAITING ON me to set up routing for now I am just using client id 1, but this should use the signed in client's id
      getAllOverdueTestsByUser(getSessionId() || "").then(async (res) => {
        for (const overdueItem of res) {
          const itemMeasure = await getItemMeasure(overdueItem.Acronym);
          const item = await getItemById(overdueItem.Acronym);
          setClientData((prev) =>
            _.unionBy(
              [
                ...prev,
                {
                  ...item,
                  MeasureOf: itemMeasure,
                  EditionNumber: "",
                  LevelOfUser: "",
                  LoanID: overdueItem.ID,
                  StartDate: overdueItem.StartDate,
                  EndDate: overdueItem.EndDate,
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

  const deleteSelected = async () => {
    try {
      for (const loanId of selectedRows) {
        await markOverdueItemAsGone(loanId);
      }
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };

  const handleSearchSuggestionSelect = (suggestion: searchSuggestion) => {
    setIsLoading(true);
    if (suggestion.kind === "ItemID") {
      // Item Name
      // get loan by item name and set data to it
      getLoanByName(suggestion.value, true).then((res) => {
        setAdminData(
          res.map((elem) => {
            return {
              ...elem,
              LastNotified: new Date(),
            };
          }) as (OverdueItem & { ItemType: string })[]
        );
        setIsLoading(false);
      });
    } else if (suggestion.kind === "ID") {
      // get loan by item ID and set data to it
      getLoansForItemFormatted(suggestion.value).then((res) => {
        setAdminData(
          res.map((elem) => {
            return {
              ...elem,
              LastNotified: new Date(),
            };
          }) as (OverdueItem & { ItemType: string })[]
        );
        setIsLoading(false);
      });
    } else if (suggestion.kind == "FirstLastName") {
      // get loan by user and set data to it
      getLoanByUserName(suggestion.value, true).then((res) => {
        setAdminData(
          res.map((elem) => {
            return {
              ...elem,
              LastNotified: new Date(),
            };
          }) as (OverdueItem & { ItemType: string })[]
        );
        setIsLoading(false);
      });
    }
  };

  function applyFilter(filters: PossibleFilters) {
    let filteredData = original;
    if (filters.Measure) {
      filteredData = filteredData.filter((item) => {
        return item.MeasureOf == filters.Measure;
      });
    }
    if (filters.Item) {
      filteredData = filteredData.filter((item) => {
        return item.ItemType == filters.Item;
      });
    }

    setAdminData(filteredData);
  }

  async function handleQueryEnter(query: string) {
    if (query == "") {
      setIsLoading(true);
      getAllOverdueItems().then((res) => {
        setAdminData(res as (OverdueItem & { ItemType: string })[]);
        setIsLoading(false);
      });
    }
    const suggestions = await getSearchSuggestions(query);
    const possibleResults: (OverdueItem & { ItemType: string })[] =
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
    setAdminData(
      _.flatten(possibleResults) as (OverdueItem & { ItemType: string })[]
    );
  }

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4 `}>Overdue Items </h1>
      {props.userRole === "admin" && (
        <>
          <section className="mt-6 space-y-2 mb-6">
            <SearchBar
              placeholder="Search by borrower name or item name or acronym"
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
              <button className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center">
                <i className="mr-4">
                  <BiSolidBell size={20} />
                </i>
                <p>Notify</p>
              </button>
              <button
                className="text-white  bg-black px-3 py-2.5 w-max rounded-lg flex items-center"
                onClick={() => deleteSelected()}
              >
                <i className="mr-4">
                  <MdDelete size={20} />
                </i>
                <p>Mark As Returned</p>
              </button>
            </section>
          </section>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <OverdueTable
              tableType="overdue"
              currentPage="overdue"
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              data={adminData}
            />
          )}
        </>
      )}
      {props.userRole === "client" && (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {clientData.map((data) => (
                <div key={data.ID} className="relative">
                  <Card data={data} type="item" OverduePage={true} />
                  <FaExclamationTriangle
                    className="absolute top-0 right-0 -mt-2 mr-[4rem] text-yellow-100 transform rotate-[15deg]"
                    size={35}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
// };

export default Overdue;
