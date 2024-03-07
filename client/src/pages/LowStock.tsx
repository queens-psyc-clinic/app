import { useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

import Table from "../components/Table";
import { lowStockMockData } from "../utils/mockData";
import cardSampleData from "../models/cardSampleData";
import Card from "../components/Card";

const SignedOut = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const data = lowStockMockData;
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
      {props.userRole === "client" && (
        <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {cardSampleData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SignedOut;