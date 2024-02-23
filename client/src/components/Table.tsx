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

const Table = (props: {
  tableType: string;
  setSelectedRows: Function;
  selectedRows: string[];
  data: Record<string, string | Object>[];
}) => {
  /* the tableType props must match the data given!*/

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

  return (
    <div className="overflow-scroll w-[95%] h-auto max-h-[75%] text-xs">
      <table className="">
        <thead className="bg-black font-semibold">
          <tr className="text-white h-auto" key={uuid()}>
            <td className="px-4 py-4 min-w-min" key={uuid()}>
              <input type="checkbox" className="cursor-pointer ml-2"></input>
            </td>
            <td className="px-4 py-4 min-w-min" key={uuid()}>
              <span></span>
            </td>
            {columns.map((col, ind) => {
              return (
                <td
                  className={`px-4 py-4 ${
                    col.size === "large" ? "min-w-80" : null
                  }
                  ${col.size === "medium" ? "min-w-60" : null}
                  ${col.size === "small" ? "min-w-28" : null}`}
                >
                  <p
                    className={`${
                      centerIndices.includes(ind)
                        ? "flex justify-center items-center"
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
            return (
              <tr
                className={`rounded-full relative ${
                  rowInd % 2 !== 0 ? "bg-gray-100" : null
                }`}
                key={uuid()}
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
                  <i className="text-black cursor-pointer">
                    <FiEdit size={15} />
                  </i>
                </td>

                {columns.map((col, ind) => {
                  if (!Object.hasOwn(row[col.title] as Object, "type")) {
                    const cell = row[col.title].toString();
                    return (
                      <td className="px-4 py-2" key={uuid()}>
                        <p
                          className={`text-wrap h-min ${
                            centerIndices.includes(ind)
                              ? "flex justify-center items-center"
                              : null
                          }`}
                        >
                          {cell}
                        </p>
                      </td>
                    );
                  } else {
                    const customData = row[col.title] as {
                      type: columnCustomComponents;
                      data: Object;
                    };

                    return (
                      <td className="px-4 py-2" key={uuid()}>
                        {
                          <ColumnComponent
                            type={customData.type}
                            data={customData.data}
                          />
                        }
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  tableType: "default",
};

export default Table;
