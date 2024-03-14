import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  defaultMockData,
  // signedOutMockData,
  // overdueMockData,
  // lowStockMockData,
} from "../utils/mockData";
import { MdDelete } from "react-icons/md";

import { Role } from "../models/User";
import AdminCards from "../components/AdminCards";
import SearchBar from "../components/SearchBar";
// import Filter from "../components/Filter";
import Card from "../components/Card";
import cardSampleData, { CardData } from "../models/cardSampleData";
import Modal from "../components/Modal";
import CardsModal from "../components/CardsModal";
import Filter2 from "../components/Filter2";

const Dashboard = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (data: CardData) => {
    setSelectedCard(data);
    setIsModalOpen(true);
  };
  const [data, setData] =
    useState<Record<string, string | Object>[]>(defaultMockData);

  /* FETCHING REAL DATA */
  useEffect(() => {
    /*
  Fetch real data from backend, preprocess using services if needed, and then set it to the data useState above
   */
    // console.log(data);
  }, [data]);

  const deleteSelectedRows = () => {
    // TODO: SHOULD POP MODAL FIRST
    setData(data.filter((row) => !selectedRows.includes(row.id as string)));
    setSelectedRows([]);
  };
  return (
    <div className="flex flex-col overflow-x-hidden p-6 py-10 w-full h-full">
      {props.userRole === "client" && (
        <h1 className="text-3xl mb-4">
          Queen’s Psychology Clinic Test Library
        </h1>
      )}
      <section className="mt-6 flex align-center space-x-4 mb-10">
        <SearchBar />
        <Filter2 />
      </section>

      {/* ADMIN DASHBOARD */}
      {props.userRole === "admin" && (
        <>
          <section className="relative w-full h-fit flex justify-between items-end mb-10">
            <section className="flex">
              {/* Quantity should be pulled from backend in the useEffect, these are
            mock values  */}
              <AdminCards userRole="admin" />
            </section>
            <section className="absolute bottom-0 right-0 space-x-4 flex w-min items-end justify-end self-end">
              <Modal modalTitle="Add Item" buttonLabel="Add" />
              <button
                onClick={deleteSelectedRows}
                className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center"
              >
                <i className="mr-4">
                  <MdDelete size={20} />
                </i>
                <p>Delete</p>
              </button>
            </section>
          </section>

          <Table
            tableType="default"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}

      {/* CLIENT DASHBOARD */}
      {props.userRole === "client" && (
        <>
          <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {cardSampleData.map((data) => (
              <Card
                key={data.id}
                data={data}
                openModal={() => handleCardClick(data)}
              />
            ))}
          </div>
          <CardsModal
            modalTitle={selectedCard?.Name || ""}
            buttonLabel="Add to Cart"
            secButtonLabel="Close"
            isOpen={isModalOpen}
            closeModal={toggleModal}
            cardData={selectedCard}
          />
        </>
      )}
    </div>
  );
};

Dashboard.defaultProps = {
  userRole: "admin",
};
export default Dashboard;
