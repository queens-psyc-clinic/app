import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { BiSolidBell } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import _ from "lodash";

import { OverdueItem, Test } from "../models/BEModels";
import {
  Item,
  getAllOverdueItems,
  getAllOverdueTestsByUser,
  getItemById,
  getItemMeasure,
  isTestAvailable,
} from "../services/TestService";
import OverdueTable from "../components/OverdueTable";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const Overdue = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Test | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminData, setAdminData] = useState<OverdueItem[]>([]);
  const [clientData, setClientData] = useState<Omit<Test, "OrderingCompany">[]>(
    []
  );

  useEffect(() => {
    if (props.userRole === "admin") {
      getAllOverdueItems().then((res) => {
        setAdminData(res as OverdueItem[]);
        setIsLoading(false);
      });
    } else if (props.userRole === "client") {
      // WAITING ON me to set up routing for now I am just using client id 1, but this should use the signed in client's id
      getAllOverdueTestsByUser("1").then(async (res) => {
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (data: Test) => {
    isTestAvailable(data.ID, 1).then((res) => {
      if (res.isTestAvailable) {
        setSelectedCard(data);
        setIsModalOpen(true);
      }
    });
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
                <button className="text-white  bg-black px-3 py-2.5 rounded-lg flex items-center">
                  <i className="mr-4">
                    <MdDelete size={20} />
                  </i>
                  <p>Delete</p>
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
