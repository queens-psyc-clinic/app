import {
  Column,
  defaultColumns,
  signedOutColums,
  overdueColumns,
  lowStockColumns,
  columnCustomComponents,
} from "../models/tableColumns";
import { getPillColor } from "../models/libraryItem";

import { FiEdit } from "react-icons/fi";
import "./Table.css";
import uuid from "react-uuid";
import ColumnComponent from "./ColumnComponent";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import React from "react";
import { testUser } from "../utils/mockData";
import { getItemsForTest } from "../services/TestService";
import { Test, Item } from "../models/BEModels";

const LowStockTable = (props: {
  tableType: string;
  setSelectedRows: Function;
  selectedRows: string[];
  data: Item[];
  currentPage?: string;
  isCheckable?: boolean;
  isEditable?: boolean;
}) => {
  /* the tableType props must match the data given!*/

  const [expandedRows, setExpandedRows] = useState<
    { rowId: string; items: Item[] }[]
  >([]);

  let columns: Column[];
  console.log(props.data);
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

  // all columns where I want the text centered instead of left-aligned
  const centerIndices: number[] = [];
  const pilledColumns: string[] = ["Measure", "Item", "Ordering Company"];
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
  const mapColumnTitleToDataIndex = (colTitle: string) => {
    switch (colTitle) {
      case "Quantity":
        return "Stock";
      case "Name":
        return "Name";
      case "Item Name":
        return "ItemName";
      case "Ordering Company":
        return "OrderingCompany";
      case "Edition":
        return "EditionNumber";
      default:
        return colTitle;
    }
  };

  const toggleRowExpansion = (selectedRow: Test) => {
    // setExpandedRows((prevExpandedRows) =>
    //   prevExpandedRows.includes(id)
    //     ? prevExpandedRows.filter((rowId) => rowId !== id)
    //     : [...prevExpandedRows, id]
    // );
    if (expandedRows.some((elem) => elem.rowId === selectedRow.ID)) {
      setExpandedRows(
        expandedRows.filter((elem) => elem.rowId !== selectedRow.ID)
      );
    } else {
      getItemsForTest(selectedRow.ID).then((res: Item[]) => {
        setExpandedRows((prev) => [
          ...prev,
          { rowId: selectedRow.ID, items: res },
        ]);
      });
    }
  };

  const isRowExpanded = (id: string) => {
    return expandedRows.some((row) => row.rowId === id);
  };

  const getRowExpansionArray = (rowId: string) => {
    const row = expandedRows.find((row) => row.rowId === rowId);
    if (row?.items) return row.items;
    else return [];
  };

  return (
    <div className="overflow-scroll h-[55vh] max-h-[75%] text-xs shadow-sm">
      <table className="w-full">
        <thead className="sticky top-0 z-10 bg-[#393939] font-semibold">
          <tr className="text-white h-auto" key={uuid()}>
            {props.isCheckable && (
              <>
                <td className="px-4 py-4 min-w-min" key={uuid()}>
                  <input
                    type="checkbox"
                    className="cursor-pointer ml-2"
                  ></input>
                </td>
                <td className="px-4 py-4 min-w-min bg-red-200" key={uuid()}>
                  <span></span>
                </td>
              </>
            )}
            {props.isEditable && (
              <td className="px-4 py-4 min-w-min" key={uuid()}>
                <span></span>
              </td>
            )}
            {columns.map((col, ind) => {
              return (
                <td
                  key={uuid()}
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
                <React.Fragment key={uuid()}>
                  <tr
                    className={`rounded-full cursor-pointer relative ${
                      rowInd % 2 !== 0 ? "bg-gray-100" : null
                    }`}
                    onClick={() => toggleRowExpansion(row as unknown as Test)}
                  >
                    {props.isCheckable && (
                      <td className="px-4 py-2" key={uuid()}>
                        <input
                          type="checkbox"
                          checked={props.selectedRows.includes(
                            row.ID as string
                          )}
                          onChange={() => handleCheckbox(row.ID as string)}
                          className="cursor-pointer mx-2"
                        />
                      </td>
                    )}
                    {props.isEditable && (
                      <td className="px-4 py-2" key={uuid()}>
                        <i className="text-black cursor-pointer">
                          <FiEdit size={15} />
                        </i>
                      </td>
                    )}
                    {columns.map((col, ind) => {
                      if (
                        row[mapColumnTitleToDataIndex(col.title) as keyof Item]
                      ) {
                        if (!pilledColumns.includes(col.title)) {
                          const cell =
                            row[
                              mapColumnTitleToDataIndex(col.title) as keyof Item
                            ].toString();
                          return (
                            <td key={ind} className="px-4 py-2">
                              <p
                                className={`text-wrap h-min ${
                                  centerIndices.includes(ind)
                                    ? "flex justify-center items-center p-2"
                                    : null
                                }`}
                              >
                                {cell}
                              </p>
                            </td>
                          );
                        } else {
                          var customData = {
                            type: columnCustomComponents.pill,
                            data: {},
                          };

                          if (col.title === "Measure" || col.title === "Item") {
                            customData = {
                              type: columnCustomComponents.pill,
                              data: {
                                title:
                                  row[
                                    mapColumnTitleToDataIndex(
                                      col.title
                                    ) as keyof Item
                                  ],
                                type: col.title.toLowerCase(),
                              },
                            };
                          }
                          if (col.title.includes("By")) {
                            customData = {
                              type: columnCustomComponents.user,
                              data: testUser, // TODO REPLACE THIS WHEN YOU CHECK LOANS
                            };
                          }

                          if (col.title.includes("Ordering Company")) {
                            customData = {
                              type: columnCustomComponents.link,
                              data: {
                                link: row[
                                  mapColumnTitleToDataIndex(
                                    col.title
                                  ) as keyof Item
                                ],
                              }, // TODO REPLACE THIS WHEN YOU CHECK LOANS
                            };
                          }

                          return (
                            <td className="px-4 py-2" key={uuid()}>
                              <ColumnComponent
                                type={customData.type}
                                data={customData.data}
                              />
                            </td>
                          );
                        }
                      } else {
                        return (
                          <td key={uuid()} className="px-4 py-2">
                            <p
                              className={`text-wrap h-min ${
                                centerIndices.includes(ind)
                                  ? "flex justify-center items-center p-2"
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
                            {getRowExpansionArray(row.ID).map((item, index) => (
                              <div
                                className="flex items-center p-3 pl-6 rounded relative bg-gray-50 my-2 border-gray-100 border"
                                key={uuid()}
                              >
                                <div>
                                  <p
                                    className={`mr-4 rounded-full px-5 py-1 text-gray-900 bg-${getPillColor(
                                      item.ItemType
                                    )}-100`}
                                  >
                                    {item.ItemType}
                                  </p>
                                </div>
                                <div className="pl-10">
                                  <p>{item.ItemName}</p>
                                </div>
                              </div>
                            ))}
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

LowStockTable.defaultProps = {
  tableType: "lowStock",
  isCheckable: false,
  isEditable: false,
};

export default LowStockTable;
