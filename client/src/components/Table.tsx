import {
  Column,
  defaultColumns,
  signedOutColums,
  overdueColumns,
  lowStockColumns,
  columnCustomComponents,
  accountColumns,
} from "../models/tableColumns";
import { getPillColor } from "../models/libraryItem";

import { FiEdit } from "react-icons/fi";
import "./Table.css";
import uuid from "react-uuid";
import ColumnComponent from "./ColumnComponent";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import React from "react";
import { mapColumnTitleToDataIndex } from "../utils/data";
import { testUser } from "../utils/mockData";
import { getItemsForTest } from "../services/TestService";
import { Test, Item } from "../models/BEModels";
import EditModal from "./EditModal";

const Table = (props: {
  tableType: string;
  setSelectedRows: Function;
  selectedRows: string[];
  data: Omit<Test, "OrderingCompany">[];
  currentPage?: string;
  isCheckable?: boolean;
  isEditable?: boolean;
}) => {
  /* the tableType props must match the data given!*/

  const [expandedRows, setExpandedRows] = useState<
    { rowId: string; items: Item[] }[]
  >([]);

  const [expandedRowsItems, setExpandedRowsItems] = useState<Item[]>([]);

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
    case "accounts":
      columns = accountColumns;
      break;
    default:
      columns = defaultColumns;
      break;
  }

  const data = props.data;

  // all columns where I want the text centered instead of left-aligned
  const centerIndices: number[] = [];
  const pilledColumns: string[] = ["Measure", "Item", "Ages"];
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
      // getItemsForTest(selectedRow.ID).then((res: Item[]) => {
      //   setExpandedRows((prev) => [
      //     ...prev,
      //     { rowId: selectedRow.ID, items: res },
      //   ]);
      //   setExpandedRowsItems(res);
      // });

      setExpandedRows((prev) => [
        ...prev,
        { rowId: selectedRow.ID, items: selectedRow.Items! },
      ]);
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    toggleRowExpansion(row);
    setIsEditModalOpen(true);
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
                <td className="px-4 py-4 min-w-min" key={uuid()}>
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
                    className={`rounded-full relative ${
                      rowInd % 2 !== 0 ? "bg-gray-100" : null
                    }`}
                  >
                    <td className="px-4 py-2" key={uuid()}>
                      <input
                        type="checkbox"
                        checked={props.selectedRows.includes(row.ID as string)}
                        onChange={() => handleCheckbox(row.ID as string)}
                        className="cursor-pointer mx-2"
                      />
                    </td>
                    <td
                      className="px-4 py-2 cursor-pointer"
                      key={uuid()}
                      onClick={() => toggleRowExpansion(row as unknown as Test)}
                    >
                      <FaAngleDown
                        size={15}
                        className={isRowExpanded(row.ID) ? "rotate-180" : ""}
                      />
                    </td>
                    {props.isEditable && (
                      <td className="px-4 py-2" key={uuid()}>
                        <i
                          className="text-black cursor-pointer"
                          onClick={() => handleEditClick(row)}
                        >
                          <FiEdit size={15} />
                        </i>
                      </td>
                    )}
                    {columns.map((col, ind) => {
                      if (
                        row[
                          mapColumnTitleToDataIndex(col.title) as keyof Omit<
                            Test,
                            "OrderingCompany"
                          >
                        ]
                      ) {
                        if (!pilledColumns.includes(col.title)) {
                          const cell =
                            row[
                              mapColumnTitleToDataIndex(
                                col.title
                              ) as keyof Omit<Test, "OrderingCompany">
                            ]!.toString();
                          return (
                            <td key={uuid()} className="px-4 py-2">
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

                          if (
                            col.title === "Measure" ||
                            col.title === "Item" ||
                            col.title === "Ages"
                          ) {
                            customData = {
                              type: columnCustomComponents.pill,
                              data: {
                                title:
                                  row[
                                    mapColumnTitleToDataIndex(
                                      col.title
                                    ) as keyof Omit<Test, "OrderingCompany">
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
                                  ) as keyof Omit<Test, "OrderingCompany">
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
                                <div className="pl-5">
                                  <p>{item.ItemName}</p>
                                </div>
                                {item.Ages && (
                                  <div className="pl-5">
                                    <p className="mr-4 rounded-full px-5 py-1 text-gray-900 border border-gray-900">
                                      {item.Ages}
                                    </p>
                                  </div>
                                )}
                                {item.Notes && (
                                  <div className="pl-10 italic">
                                    <p>{`Notes: ${item.Notes}`}</p>
                                  </div>
                                )}
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
      {isEditModalOpen && (
        <EditModal
          modalTitle="Edit Test"
          buttonLabel="Save Changes"
          secButtonLabel="Cancel"
          test={selectedRow}
          items={selectedRow.Items}
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

Table.defaultProps = {
  tableType: "default",
  isCheckable: true,
  isEditable: true,
};

export default Table;
