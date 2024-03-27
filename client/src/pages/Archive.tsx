import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import archive from "../assets/icons/archive.svg";
import Table from "../components/Table";
import { defaultMockData } from "../utils/mockData";
import { Test } from "../models/BEModels";

const Archive = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState("archive");
  // WAITING ON loan controller

  const [data, setData] = useState<Test[]>([]);

  /* FETCHING REAL DATA */
  useEffect(() => {
    // WAITING on isArchvied to be added to tests
    setData([]);
  }, []);

  if (props.userRole !== "admin") {
    return <></>;
  }

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4 `}>Archived Items </h1>
      <>
        <section className="mt-6 space-y-2 mb-6">
          <SearchBar />
          <Filter />
          <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
            <button className="text-black border border-black w-max bg-white px-3 py-2 rounded-lg flex items-center">
              <img src={archive} className="mr-4" alt="archive icon" />
              <p>Unarchive</p>
            </button>
          </section>
        </section>
        <Table
          tableType="default"
          currentPage={currentPage}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          data={data}
        />
      </>
    </div>
  );
};

export default Archive;
