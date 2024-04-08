import { useEffect, useState } from "react";
import { Role } from "../models/User";
import Filter, { PossibleFilters } from "../components/Filter";
import SearchBar, { searchSuggestion } from "../components/SearchBar";

import Table from "../components/Table";
import { requestsMockData } from "../utils/mockData";
import cardSampleData, { CardData } from "../models/cardSampleData";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import { ItemTypeOptions, Measure } from "../models/libraryItem";
import { SignedOutItem, Test } from "../models/BEModels";
import PageNotFound from "./PageNotFound";
import {
  getAllReservedItems,
  getItemById,
  getLoanByName,
  getLoanByUserName,
  getLoansForItem,
  getLoansForItemFormatted,
  markItemAsSignedOut,
  unReserveItem,
} from "../services/TestService";
import SignedOutTable from "../components/SignedOutTable";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";
import _ from "lodash";

const Requests = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<
    (SignedOutItem & { Quantity: number; ItemType: string })[]
  >([]);
  const [original, setOriginal] = useState<
    (SignedOutItem & { Quantity: number; ItemType: string })[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeSearchTree("REQUESTS");
    setIsLoading(true);
    getAllReservedItems().then((res) => {
      setData(
        res as (SignedOutItem & { Quantity: number; ItemType: string })[]
      );
      setOriginal(
        res as (SignedOutItem & { Quantity: number; ItemType: string })[]
      );
      setIsLoading(false);
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

  function applyFilter(filters: PossibleFilters) {
    console.log(filters);
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

    setData(filteredData);
  }

  const handleSearchSuggestionSelect = (suggestion: searchSuggestion) => {
    setIsLoading(true);
    if (suggestion.kind === "ItemID") {
      // Item Name
      // get loan by item name and set data to it
      getLoanByName(suggestion.value).then((res) => {
        setData(
          res as (SignedOutItem & { Quantity: number; ItemType: string })[]
        );
        setIsLoading(false);
      });
    } else if (suggestion.kind === "ID") {
      // get loan by item ID and set data to it
      getLoansForItemFormatted(suggestion.value).then((res) => {
        setData(
          res as (SignedOutItem & { Quantity: number; ItemType: string })[]
        );
        setIsLoading(false);
      });
    } else if (suggestion.kind == "FirstLastName") {
      // get loan by user and set data to it
      getLoanByUserName(suggestion.value).then((res) => {
        setData(
          res as (SignedOutItem & { Quantity: number; ItemType: string })[]
        );
        setIsLoading(false);
      });
    }
  };

  async function handleQueryEnter(query: string) {
    if (query == "") {
      setIsLoading(true);
      getAllReservedItems().then((res) => {
        setData(
          res as (SignedOutItem & { Quantity: number; ItemType: string })[]
        );
        setIsLoading(false);
      });
    }
    const suggestions = await getSearchSuggestions(query);
    const possibleResults: (SignedOutItem & {
      Quantity: number;
      ItemType: string;
    })[] = await Promise.all(
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
    setData(_.flatten(possibleResults));
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
            <SearchBar
              placeholder="Search by borrower name or item name or acronym"
              onSelectSuggestion={handleSearchSuggestionSelect}
              onQuerySearch={handleQueryEnter}
            />
            <Filter
              placeholders={["Measure", "Item"]}
              options={[Object.values(Measure), ItemTypeOptions]}
              onChange={applyFilter}
            />
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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <SignedOutTable
              tableType="reservations"
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              data={data}
            />
          )}
        </>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Requests;
