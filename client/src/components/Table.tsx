import {
  Column,
  defaultColumns,
  signedOutColums,
  overdueColumns,
  lowStockColumns,
  columnCustomComponents,
} from "../models/tableColumns";

import { FiEdit } from "react-icons/fi";
import "./Table.css";
import uuid from "react-uuid";
import ColumnComponent from "./ColumnComponent";
import expandedRowsData from "../models/tableExpandRows";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import React from "react";
import { mapColumnTitleToDataIndex } from "../utils/data";

const Table = (props: {
  tableType: string;
  setSelectedRows: Function;
  selectedRows: string[];
  data: Record<string, string | Object>[];
  currentPage?: string;
  isCheckable?: boolean;
  isEditable?: boolean;
}) => {
  /* the tableType props must match the data given!*/
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  let columns: Column[];

  switch (props.tableType) {
    case "default":
      columns = defaultColumns;
      break;
    case "signedOut":
      columns = signedOutColums;
      break;
    case "overdue":
      columns = overdueColumns;
      break;
    case "lowStock":
      columns = lowStockColumns;
      break;
    default:
      columns = defaultColumns;
      break;
  }

  const data = props.data;
  console.log(data);

  // all columns where I want the text centered instead of left-aligned
  const centerIndices: number[] = [];
  columns.forEach((col, ind) => {
    if (col.center) {
      centerIndices.push(ind);
    }
  });

  const handleCheckbox = (id: string) => {
    props.setSelectedRows((prev: string[]) => {
      const selectedIndex = prev.indexOf(id);
      if (selectedIndex === -1) {
        return [...prev, id];
      } else {
        return prev.filter((rowId) => rowId !== id);
      }
    });
  };

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  const isRowExpanded = (id: string) => expandedRows.includes(id);

  return (
    <div className="overflow-scroll h-[55vh] max-h-[75%] text-xs shadow-sm">
      <table className="w-full">
        <thead className="sticky top-0 z-10 bg-[#393939] font-semibold">
          <tr className="text-white h-auto" key={uuid()}>
            <td className="px-4 py-4 min-w-min" key={uuid()}>
              <input type="checkbox" className="cursor-pointer ml-2"></input>
            </td>
            <td className="px-4 py-4 min-w-min" key={uuid()}>
              <span></span>
            </td>
            <td className="px-4 py-4 min-w-min" key={uuid()}>
              <span></span>
            </td>
            {columns.map((col, ind) => {
              return (
                <td
                  key={ind}
                  className={`px-4 py-4 ${
                    col.size === "large" ? "min-w-80" : null
                  }
                  ${col.size === "medium" ? "min-w-60" : null}
                  ${col.size === "small" ? "min-w-28" : null}`}
                >
                  <p
                    className={`${
                      centerIndices.includes(ind)
                        ? "flex justify-center items-center "
                        : null
                    }`}
                  >
                    {col.title}
                  </p>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowInd: number) => {
            if (row.ID) {
              const isExpanded = isRowExpanded(row.ID.toString());
              return (
                <React.Fragment key={row.ID.toString()}>
                  <tr
                    className={`rounded-full relative ${
                      rowInd % 2 !== 0 ? "bg-gray-100" : null
                    }`}
                    onClick={() => toggleRowExpansion(row.ID.toString())}
                  >
                    <td className="px-4 py-2" key={uuid()}>
                      <input
                        type="checkbox"
                        checked={props.selectedRows.includes(row.id as string)}
                        onChange={() => handleCheckbox(row.id as string)}
                        className="cursor-pointer mx-2"
                      />
                    </td>
                    <td className="px-4 py-2" key={uuid()}>
                      <FaAngleDown
                        className={
                          isRowExpanded(row.ID.toString()) ? "rotate-180" : ""
                        }
                      />
                    </td>
                    {props.isEditable && (
                      <td className="px-4 py-2" key={uuid()}>
                        <i className="text-black cursor-pointer">
                          <FiEdit size={15} />
                        </i>
                      </td>
                    )}
                    {columns.map((col, ind) => {
                      if (row[mapColumnTitleToDataIndex(col.title)]) {
                        const cellContent =
                          row[mapColumnTitleToDataIndex(col.title)].toString();
                        // const cellContent = row[col.title].toString();

                        return (
                          <td key={ind} className="px-4 py-2">
                            <p
                              className={`text-wrap h-min ${
                                centerIndices.includes(ind)
                                  ? "flex justify-center items-center"
                                  : null
                              }`}
                            >
                              {cellContent}
                            </p>
                          </td>
                        );
                      } else {
                        return (
                          <td key={ind} className="px-4 py-2">
                            <p
                              className={`text-wrap h-min ${
                                centerIndices.includes(ind)
                                  ? "flex justify-center items-center"
                                  : null
                              }`}
                            >
                              <span></span>
                            </p>
                          </td>
                        );
                      }
                    })}
                  </tr>
                  {isExpanded &&
                    (props.currentPage === "dashboard" ||
                      props.currentPage === "archive") && (
                      <tr>
                        <td colSpan={columns.length + 3}>
                          <div className="ml-32 mb-4">
                            {expandedRowsData
                              .filter((item) => item.id === row.id.toString())
                              .map((expandedRow) =>
                                expandedRow.items.map((item, index) => (
                                  <div
                                    className="flex items-center p-3 pl-6 rounded relative bg-gray-50 my-2 border-gray-100 border"
                                    key={index}
                                  >
                                    <div>
                                      <p
                                        className={`mr-4 rounded-full px-5 py-1 text-gray-900 bg-${item.color}-100`}
                                      >
                                        {item.item}
                                      </p>
                                    </div>
                                    <div className="pl-10">
                                      <p>{item.itemName}</p>
                                    </div>
                                  </div>
                                ))
                              )}
                          </div>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  tableType: "default",
  isCheckable: true,
  isEditable: true,
};

export default Table;
