import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter, { PossibleFilters } from "../components/Filter";
import Table from "../components/Table";
import { Item, Test } from "../models/BEModels";
import {
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
import { initializeSearchTree } from "../services/SearchService";

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
    initializeSearchTree("DASHBOARD"); // WAITING ON LOW STOCK SEARCH TREE
    setIsLoading(true);
    getLowStockItems().then(async (res) => {
      for (const lowStockItem of res) {
        const testName = await getTestNameByItem(lowStockItem.ID).catch((e) =>
          console.log("TESTNAME ERROR: ", e)
        );

        const orderingCompany = await getItemOrderingCompany(
          lowStockItem.ID
        ).catch((e) => console.log("ORDERING ERROR: ", e));

        const editionNumber = await getItemEditionNumber(lowStockItem.ID).catch(
          (e) => console.log("EDITION ERROR: ", e)
        );

        setData((prev) =>
          _.unionBy(
            [
              ...prev,
              {
                ...lowStockItem,
                OrderingCompany: orderingCompany,
                Name: testName,
                EditionNumber: editionNumber,
              },
            ],
            "ID"
          )
        );
        setQuantityOptions([...quantityOptions, lowStockItem.Stock.toString()]);
        setOrderingCompanyOptions((prev) => {
          if (orderingCompany) {
            return _.uniq([...prev, orderingCompany]);
          } else {
            return prev;
          }
        });
      }
      setOriginal(data);
      // setQuantityOptions(
      //   _.uniq(data.map((lowStockItem) => lowStockItem.Stock.toString()))
      // );
      // setOrderingCompanyOptions(
      //   _.uniq(data.map((lowStockItem) => lowStockItem.OrderingCompany))
      // );
      setIsLoading(false);
    });
  }, []);
  console.log(original);
  function applyFilter(filters: PossibleFilters) {
    console.log(filters);
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
      {props.userRole === "admin" && (
        <>
          <section className="mt-6 space-y-2 mb-6">
            <SearchBar />
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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <LowStockTable
              tableType="lowStock"
              currentPage="lowStock"
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              data={data}
              isCheckable={false}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LowStock;
