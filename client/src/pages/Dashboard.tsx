import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  defaultMockData,
  // signedOutMockData,
  // overdueMockData,
  // lowStockMockData,
} from "../utils/mockData";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import { Role } from "../models/User";
import AdminCards from "../components/AdminCards";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Card from "../components/Card";
import cardSampleData from "../models/cardSampleData";
import Modal from "../components/Modal";
import logo from "../assets/logo.png";

const Dashboard = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<Record<string, string | Object>[]>([]);

  useEffect(() => {
    if (props.userRole === "admin") {
      setData(defaultMockData);
    }
  });
  /* FETCHING REAL DATA */
  useEffect(() => {
    /*
  Fetch real data from backend, preprocess using services if needed, and then set it to the data useState above
   */
    console.log(data);
  }, [data]);

  const deleteSelectedRows = () => {
    // TODO: SHOULD POP MODAL FIRST
    setData(data.filter((row) => !selectedRows.includes(row.id as string)));
    setSelectedRows([]);
  };
  return (
    <div className="flex flex-col overflow-x-hidden p-6 py-10 w-full h-full">
      {props.userRole == "client" && (
        <section className={`space-y-4 m-auto flex flex-col`}>
          {/* <img src={logo} className="mb-8" /> */}
          <h1 className="text-3xl">Queen’s Psychology Clinic Test Library</h1>
          <SearchBar />
          <Filter />
        </section>
      )}
      {/* <section className="mt-6 space-y-6 mb-6">
        <SearchBar />
        <Filter />
      </section> */}

      {/* ADMIN DASHBOARD */}
      {props.userRole == "admin" && (
        <>
          <section className="mt-6 space-y-6 mb-6">
            <SearchBar />
            <Filter />
          </section>
          <section className="relative w-full h-fit flex justify-between items-end mb-10">
            <section className="flex">
              {/* Quantity should be pulled from backend in the useEffect, these are
            mock values  */}
              <AdminCards userRole="admin" />
            </section>
            <section className="absolute bottom-0 right-0 space-x-4 flex w-min items-end justify-end self-end">
              <Modal modalTitle="Add Item" buttonLabel="Add" />
              <button
                onClick={deleteSelectedRows}
                className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center"
              >
                <i className="mr-4">
                  <MdDelete size={20} />
                </i>
                <p>Delete</p>
              </button>
            </section>
          </section>

          <Table
            tableType="default"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}

      {/* CLIENT DASHBOARD */}
      {props.userRole === "client" && data.length > 0 && (
        <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {cardSampleData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

Dashboard.defaultProps = {
  userRole: "admin",
};
export default Dashboard;
