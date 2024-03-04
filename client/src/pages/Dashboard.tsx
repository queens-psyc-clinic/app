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

const Dashboard = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] =
    useState<Record<string, string | Object>[]>(defaultMockData);

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
        <h1 className="text-3xl mb-4">
          Queen’s Psychology Clinic Test Library
        </h1>
      )}
      <section className="mt-6 space-y-6 mb-6">
        <SearchBar />
        <Filter />
      </section>
      {props.userRole == "admin" && (
        <>
          <section className="relative w-full h-fit flex justify-between items-end mb-10">
            <section className="flex">
              {/* Quantity should be pulled from backend in the useEffect, these are
            mock values  */}
              <AdminCards userRole="admin" />
            </section>
            <section className="absolute bottom-0 right-0 flex w-min items-end justify-end self-end">
              <button className="text-white h-max p-4 bg-black rounded-lg flex items-center text-xs">
                <i className="mr-4">
                  <IoMdAdd size={20} />
                </i>
                <p>Add</p>
              </button>
              <button
                className="text-black ml-4 h-max p-4 rounded-lg border-2 border-black flex items-center text-xs"
                onClick={deleteSelectedRows}
              >
                <i className="mr-2">
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
    </div>
  );
};

Dashboard.defaultProps = {
  userRole: "admin",
};
export default Dashboard;
