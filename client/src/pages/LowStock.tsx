import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar, { searchSuggestion } from "../components/SearchBar";
import Filter, { PossibleFilters } from "../components/Filter";
import Table from "../components/Table";
import { Item, Test } from "../models/BEModels";
import {
  getAllOrderingCompanies,
  getItemEditionNumber,
  getItemOrderingCompany,
  getLowStockItems,
  getTestById,
  getTestNameByItem,
} from "../services/TestService";
import LowStockTable from "../components/LowStockTable";
import LoadingSpinner from "../components/LoadingSpinner";
import _ from "lodash";
import { ItemTypeOptions, OrderingCompany } from "../models/libraryItem";
import cardSampleData from "../models/cardSampleData";
import PageNotFound from "./PageNotFound";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";

const LowStock = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<
    (Item & { OrderingCompany: string; Name: string; EditionNumber: string })[]
  >([]);

  const [quantityOptions, setQuantityOptions] = useState<string[]>([]);
  const [orderingCompanyOptions, setOrderingCompanyOptions] = useState<
    string[]
  >([]);
  const [original, setOriginal] = useState<
    (Item & { OrderingCompany: string; Name: string; EditionNumber: string })[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    initializeSearchTree("LOWSTOCK"); // WAITING ON LOW STOCK SEARCH TREE
    setIsLoading(true);
    // getLowStockItems().then(async (res) => {
    //   for (const lowStockItem of res) {
    //     // const testName =
    //     //   (await getTestNameByItem(lowStockItem.ID).catch((e) =>
    //     //     console.log("TESTNAME ERROR: ", e)
    //     //   )) || "";

    //     // const orderingCompany =
    //     //   (await getItemOrderingCompany(lowStockItem.ID).catch((e) =>
    //     //     console.log("ORDERING ERROR: ", e)
    //     //   )) || "";

    //     // const editionNumber =
    //     //   (await getItemEditionNumber(lowStockItem.ID).catch((e) =>
    //     //     console.log("EDITION ERROR: ", e)
    //     //   )) || "";

    //     // setData((prev) =>
    //     //   _.unionBy(
    //     //     [
    //     //       ...prev,
    //     //       {
    //     //         ...lowStockItem,
    //     //         OrderingCompany: orderingCompany,
    //     //         Name: testName,
    //     //         EditionNumber: editionNumber,
    //     //       },
    //     //     ],
    //     //     "ID"
    //     //   )
    //     // );
    //     setQuantityOptions([...quantityOptions, lowStockItem.Stock.toString()]);
    //     setOrderingCompanyOptions((prev) => {
    //       if (orderingCompany) {
    //         return _.uniq([...prev, orderingCompany]);
    //       } else {
    //         return prev;
    //       }
    //     });
    //   }
    //   setOriginal(data);
    //   // setQuantityOptions(
    //   //   _.uniq(data.map((lowStockItem) => lowStockItem.Stock.toString()))
    //   // );
    //   // setOrderingCompanyOptions(
    //   //   _.uniq(data.map((lowStockItem) => lowStockItem.OrderingCompany))
    //   // );
    //   setIsLoading(false);
    // });

    getLowStockItems().then((res) => {
      setData(res);
      setOriginal(res);
      setIsLoading(false);
    });
    getAllOrderingCompanies().then((res) => setOrderingCompanyOptions(res));
    setQuantityOptions(["0", "1", "2", "3", "4"]);
  }, []);
  function applyFilter(filters: PossibleFilters) {
    let filteredData = original;
    if (filters["Ordering Company"]) {
      filteredData = filteredData.filter((item) => {
        return item.OrderingCompany == filters["Ordering Company"];
      });
    }
    if (filters.Item) {
      filteredData = filteredData.filter((item) => {
        return item.ItemType == filters.Item;
      });
    }
    if (filters.Quantity) {
      filteredData = filteredData.filter((item) => {
        return item.Stock == parseInt(filters.Quantity!);
      });
    }

    setData(filteredData);
  }

  const handleSearchSuggestionSelect = (suggestion: searchSuggestion) => {
    setIsLoading(true);
    if (suggestion.kind === "ItemName") {
      setData(
        original.filter(
          (e) => e.ItemName.toLowerCase() == suggestion.value.toLowerCase()
        )
      );

      setIsLoading(false);
    } else if (suggestion.kind === "ID") {
      setData(original.filter((e) => e.ID == suggestion.value));

      setIsLoading(false);
    }
  };

  async function handleQueryEnter(query: string) {
    if (query == "") {
      setIsLoading(true);
      setData(original);
      setIsLoading(false);
    } else {
      const suggestions = await getSearchSuggestions(query);
      const possibleResults: (Item & {
        OrderingCompany: string;
        Name: string;
        EditionNumber: string;
      })[] = await Promise.all(
        suggestions.map(async (suggestion: searchSuggestion) => {
          if (suggestion.kind === "ItemName") {
            // const items = await getLoanByName(suggestion.value);
            return original.filter(
              (e) => e.ItemName.toLowerCase() === suggestion.value.toLowerCase()
            );
          } else if (suggestion.kind === "ID") {
            // const items = await getLoansForItemFormatted(suggestion.value);
            return original.filter(
              (e) => e.ID.toLowerCase() === suggestion.value.toLowerCase()
            );
          }
        })
      );
      setData(_.flatten(possibleResults));
    }
  }

  if (props.userRole === "client") {
    return <PageNotFound />;
  }
  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4 `}>Low Stock Items </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className="mt-6 space-y-2 mb-6">
            <SearchBar
              onSelectSuggestion={handleSearchSuggestionSelect}
              onQuerySearch={handleQueryEnter}
            />
            <Filter
              placeholders={["Ordering Company", "Item", "Quantity"]}
              options={[
                orderingCompanyOptions,
                ItemTypeOptions,
                quantityOptions,
              ]}
              onChange={applyFilter}
              onClear={() => setData(original)}
            />
          </section>
          {/* <Table
            tableType="lowStock"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          /> */}

          <LowStockTable
            tableType="lowStock"
            currentPage="lowStock"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
            isCheckable={false}
          />
        </>
      )}
    </div>
  );
};

export default LowStock;
