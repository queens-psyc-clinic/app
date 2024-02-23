import { useEffect, useState } from "react";
import Table from "../components/Table";
import { defaultMockData } from "../utils/mockData";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import { Role } from "../models/User";

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
    <div className="flex flex-col justify-end items-center py-4 w-full h-full">
      <section className="flex">
        <button className="text-white bg-black px-3 py-2 m-4 rounded-lg flex items-center">
          <i className="mr-4">
            <IoMdAdd size={20} />
          </i>
          <p>Add</p>
        </button>
        <button
          className="text-black px-2 py-2 m-4 rounded-lg border-2 border-black flex items-center"
          onClick={deleteSelectedRows}
        >
          <i className="mr-2">
            <MdDelete size={20} />
          </i>
          <p>Delete</p>
        </button>
      </section>
      <Table
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
