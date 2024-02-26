import React, { useState } from 'react'
import Table from '../components/Table'
import { lowStockMockData } from '../utils/mockData';

const LowStock = () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] =
    useState<Record<string, string | Object>[]>(lowStockMockData);
  return (
    <div className="flex flex-col overflow-x-hidden  items-center py-4 w-full h-full">
    <h1 className="self-start text-2xl mt-4 mb-24 ml-8">Low Stock Items</h1>
    <Table
      tableType="lowStock"
      setSelectedRows={setSelectedRows}
      selectedRows={selectedRows}
      data={data}
    />
  </div>
  )
}

export default LowStock