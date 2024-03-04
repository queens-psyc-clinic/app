import { useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { BiSolidBell } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Table from "../components/Table";
import { overdueMockData, signedOutMockData } from "../utils/mockData";
import cardSampleData from "../models/cardSampleData";
import Card from "../components/Card";

const SignedOut = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const data = signedOutMockData;
  if (props.userRole !== "admin") {
    return <></>;
  }
  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4 `}>Signed Out Items </h1>

      <>
        <section className="mt-6 space-y-4 mb-16">
          <SearchBar />
          <Filter />
        </section>
        <Table
          tableType="signedOut"
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          data={data}
        />
      </>
    </div>
  );
};

export default SignedOut;
