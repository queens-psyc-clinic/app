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
    <div className="flex flex-col overflow-x-hidden p-6 w-full h-full ">
      <SearchBar />
      <Filter />
      <section className="w-full flex justify-between mb-6">
        <section className="flex space-x-4">
          {/* Quantity should be pulled from backend in the useEffect, these are
          mock values  */}
          <AdminCards userRole="admin" />
        </section>
        <section className="flex w-fit items-end">
          <button className="text-white h-max p-4 bg-black m-4 rounded-lg flex items-center text-xs">
            <i className="mr-4">
              <IoMdAdd size={20} />
            </i>
            <p>Add</p>
          </button>
          <button
            className="text-black m-4 h-max p-4 rounded-lg border-2 border-black flex items-center text-xs"
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
    </div>
  );
};

Dashboard.defaultProps = {
  userRole: "admin",
};
export default Dashboard;
