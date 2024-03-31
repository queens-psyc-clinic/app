import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { BiSolidBell } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import _ from "lodash";

import { OverdueItem, Test, Item } from "../models/BEModels";
import {
  getAllOverdueItems,
  getAllOverdueTestsByUser,
  getItemById,
  getItemMeasure,
  isTestAvailable,
  markOverdueItemAsGone,
} from "../services/TestService";
import OverdueTable from "../components/OverdueTable";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { getSessionId } from "../services/UserService";

const Overdue = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminData, setAdminData] = useState<OverdueItem[]>([]);
  const [session, setSession] = useState<string>("");
  const [clientData, setClientData] = useState<Omit<Test, "OrderingCompany">[]>(
    []
  );

  useEffect(() => {
    setSession(getSessionId() || "");
    if (props.userRole === "admin") {
      getAllOverdueItems().then((res) => {
        setAdminData(res as OverdueItem[]);
        setIsLoading(false);
      });
    } else if (props.userRole === "client") {
      // WAITING ON me to set up routing for now I am just using client id 1, but this should use the signed in client's id
      getAllOverdueTestsByUser(getSessionId() || "").then(async (res) => {
        for (const overdueItem of res) {
          const itemMeasure = await getItemMeasure(overdueItem.Acronym);
          const item = await getItemById(overdueItem.Acronym);
          setClientData((prev) =>
            _.unionBy(
              [
                ...prev,
                {
                  ...item,
                  MeasureOf: itemMeasure,
                  EditionNumber: "",
                  LevelOfUser: "",
                  LoanID: overdueItem.ID,
                  StartDate: overdueItem.StartDate,
                  EndDate: overdueItem.EndDate,
                },
              ],
              "LoanID"
            )
          );
        }
        setIsLoading(false);
      });
    }
  }, []);

  const deleteSelected = async () => {
    try {
      for (const loanId of selectedRows) {
        await markOverdueItemAsGone(loanId);
      }
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };
  if (isLoading) {
    return (
      <div
        className={`relative flex flex-col ${
          props.userRole === "admin" ? "justify-end" : "py-16"
        }  overflow-x-hidden p-6 py-10 w-full h-full`}
      >
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <div
        className={`relative flex flex-col ${
          props.userRole === "admin" ? "justify-end" : "py-16"
        }  overflow-x-hidden p-6 py-10 w-full h-full`}
      >
        <h1 className={`text-3xl mb-4 `}>Overdue Items </h1>
        {props.userRole === "admin" && (
          <>
            <section className="mt-6 space-y-2 mb-6">
              <SearchBar />
              <Filter />
              <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
                <button className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center">
                  <i className="mr-4">
                    <BiSolidBell size={20} />
                  </i>
                  <p>Notify</p>
                </button>
                <button
                  className="text-white  bg-black px-3 py-2.5 w-max rounded-lg flex items-center"
                  onClick={() => deleteSelected()}
                >
                  <i className="mr-4">
                    <MdDelete size={20} />
                  </i>
                  <p>Mark As Gone</p>
                </button>
              </section>
            </section>
            <OverdueTable
              tableType="overdue"
              currentPage="overdue"
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              data={adminData}
            />
          </>
        )}
        {props.userRole === "client" && (
          <>
            <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {clientData.map((data) => (
                <Card
                  key={data.ID}
                  data={data}
                  type="item"
                  // openModal={() => handleCardClick(data)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Overdue;
