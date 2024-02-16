import { defaultColumns } from "../models/tableColumns";
import { mockData } from "../utils/mockData";
import "./Table.css";

const Table = (props: { tableType: string }) => {
  const columns = defaultColumns;
  const data = mockData;

  //   store indices of measures and item type and check them for special styling
  const measureInd = defaultColumns.findIndex((col) => col.title === "Measure");
  const itemTypeInd = defaultColumns.findIndex((col) => col.title === "Item");
  const centerIndices: number[] = [];
  defaultColumns.forEach((col, ind) => {
    if (col.center) {
      centerIndices.push(ind);
    }
  });

  return (
    <div className="overflow-scroll">
      <table className="">
        <thead className="bg-black">
          <tr className="text-white h-auto">
            <td className="px-4 py-4 min-w-min">
              <input type="checkbox" className="cursor-pointer ml-2"></input>
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
          {data.map((row, ind) => {
            return (
              <tr
                className={`rounded-full ${
                  ind % 2 != 0 ? "bg-gray-100" : null
                }`}
              >
                <td className="px-4 py-4">
                  <input type="checkbox" className="cursor-pointer mx-2" />
                </td>
                {row.map((cell, ind) => {
                  return (
                    <td className="px-4 py-4">
                      <p
                        className={`text-wrap ${
                          centerIndices.includes(ind)
                            ? "flex justify-center items-center"
                            : null
                        }`}
                      >
                        {cell}
                      </p>
                    </td>
                  );
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
