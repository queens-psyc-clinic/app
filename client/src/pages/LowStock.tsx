import { useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Table from "../components/Table";
import { lowStockMockData } from "../utils/mockData";

const SignedOut = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const data = lowStockMockData;
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
          <section className="mt-6 space-y-4 mb-16">
            <SearchBar />
            <Filter />
          </section>
          <Table
            tableType="lowStock"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}
    </div>
  );
};

export default SignedOut;
