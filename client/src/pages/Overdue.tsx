import React, { useState } from 'react'
import Table from '../components/Table'
import { overdueMockData } from '../utils/mockData';
import { FaBell } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Overdue = () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] =
    useState<Record<string, string | Object>[]>(overdueMockData);
  return (
    <div className="flex flex-col overflow-x-hidden  items-center py-4 w-full h-full">
    <h1 className="self-start text-2xl mt-4 mb-24 ml-8">Overdue Items</h1>
    <section className="flex ml-auto">
        <button className="text-white bg-black px-3 py-2 m-4 rounded-lg flex items-center">
          <i className="mr-4">
            <FaBell size={20} />
          </i>
          <p>Notify</p>
        </button>
        <button
          className="text-black px-2 py-2 m-4 rounded-lg border-2 border-black flex items-center"
        //   onClick={deleteSelectedRows}
        >
          <i className="mr-2">
            <IoClose size={20} />
          </i>
          <p>Mark as Gone</p>
        </button>
      </section>
    <Table
      tableType="overdue"
      setSelectedRows={setSelectedRows}
      selectedRows={selectedRows}
      data={data}
    />
  </div>
  )
}

export default Overdue