import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  defaultMockData,
  signedOutMockData,
  overdueMockData,
  lowStockMockData,
} from "../utils/mockData";
import { MdDelete } from "react-icons/md";
import { IoMdArchive } from "react-icons/io";

import { Role } from "../models/User";

const Archive = (props: { userRole: Role }) => {
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
    <div className="flex flex-col overflow-x-hidden justify-end items-center py-4 w-full h-full">
      <section className="flex ml-auto">
        <button
          className="text-white bg-black px-3 py-2 m-4 rounded-lg flex items-center"
          onClick={deleteSelectedRows}
        >
          <i className="mr-2">
            <IoMdArchive size={20} />
          </i>
          <p>Unarchive</p>
        </button>
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

Archive.defaultProps = {
  userRole: "admin",
};
export default Archive;
