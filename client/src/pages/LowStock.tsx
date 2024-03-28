import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Table from "../components/Table";
import { Item, Test } from "../models/BEModels";
import {
  getItemOrderingCompany,
  getLowStockItems,
  getTestById,
  getTestNameByItem,
} from "../services/TestService";
import LowStockTable from "../components/LowStockTable";
import LoadingSpinner from "../components/LoadingSpinner";
import _ from "lodash";

const LowStock = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<
    (Item & { OrderingCompany: string; Name: string })[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // WAITING ON trailing spaces fix on backend
  useEffect(() => {
    // WAITING ON stock column to be adjusted in db
    setIsLoading(true);
    getLowStockItems().then(async (res) => {
      for (const lowStockItem of res) {
        const test: Test = await getTestById(lowStockItem.TestID).catch((e) =>
          console.log(e)
        );
        console.log(test);
        // const testName = await getTestNameByItem(lowStockItem.ID).catch((e) =>
        //   console.log("TESTNAME ERROR: ", e)
        // );

        // const orderingCompany = await getItemOrderingCompany(
        //   lowStockItem.ID
        // ).catch((e) => console.log("ORDERING ERROR: ", e));
        setData((prev) =>
          _.unionBy(
            [
              ...prev,
              {
                ...lowStockItem,
                OrderingCompany: test.OrderingCompany,
                Name: test.Name,
                EditionNumber: test.EditionNumber,
              },
            ],
            "ID"
          )
        );
      }

      setIsLoading(false);
    });
  }, []);

  if (props.userRole === "client") {
    return <></>;
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
            <Filter />
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
