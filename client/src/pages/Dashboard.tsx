import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  defaultMockData,
  signedOutMockData,
  overdueMockData,
  lowStockMockData,
} from "../utils/mockData";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import { Role } from "../models/User";
import OverviewBox from "../components/OverviewBox";

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
    <div className="flex flex-col overflow-x-hidden items-center p-6 w-full h-full text-xs">
      <section className="w-full flex justify-between mb-6">
        <section className="flex space-x-4">
          {/* Quantity should be pulled from backend in the useEffect, these are
          mock values  */}
          <OverviewBox type="signedOut" quantity={23} />
          <OverviewBox type="overdue" quantity={23} />
          <OverviewBox type="lowStock" quantity={23} />
        </section>
        <section className="flex w-fit items-end">
          <button className="text-white h-max p-4 bg-black m-4 rounded-lg flex items-center">
            <i className="mr-4">
              <IoMdAdd size={20} />
            </i>
            <p>Add</p>
          </button>
          <button
            className="text-black m-4 h-max p-4 rounded-lg border-2 border-black flex items-center"
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
