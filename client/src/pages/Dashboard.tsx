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
import Filter from "../components/Filter";
import Card from "../components/Card";
import cardSampleData, { CardData } from "../models/cardSampleData";
import Modal from "../components/Modal";
import CardsModal from "../components/CardsModal";
import {
  deleteEntireTest,
  deleteItem,
  deleteTest,
  getAllOverdueItems,
  getAllSignedOutItems,
  getAllTests,
  getItemById,
  getItemsForTest,
  getLowStockItems,
  getTestById,
  isTestAvailable,
} from "../services/TestService";
import { Test, Item } from "../models/BEModels";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Omit<
    Test,
    "OrderingCompany"
  > | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [data, setData] = useState<Test[]>([]);
  const [adminCardInfo, setAdminCardInfo] = useState<{
    signedOut: number;
    lowStock: number;
    overdue: number;
  }>({ signedOut: 0, lowStock: 0, overdue: 0 });

  /* FETCHING REAL DATA */
  useEffect(() => {
    getAllTests().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getAllSignedOutItems().then((res) =>
      setAdminCardInfo({ ...adminCardInfo, signedOut: res.length })
    );
    getAllOverdueItems().then((res) =>
      setAdminCardInfo({ ...adminCardInfo, overdue: res.length })
    );
    getLowStockItems().then((res) =>
      setAdminCardInfo({ ...adminCardInfo, lowStock: res.length })
    );
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  console.log(adminCardInfo);
  const handleCardClick = (
    data: Omit<Test, "OrderingCompany">,
    items: Item[]
  ) => {
    isTestAvailable(data.ID, 1).then((res) => {
      if (res.isTestAvailable) {
        setSelectedCard(data);
        setIsModalOpen(true);
      }
    });
    setSelectedItems(items);
  };

  const deleteSelectedRows = async () => {
    // TODO: SHOULD POP MODAL FIRST

    for (const testId of selectedRows) {
      try {
        deleteEntireTest(testId);
      } catch (e) {
        console.log(e);
      }
    }
    window.location.reload();
  };

  if (props.userRole === "admin") {
    return (
      <>
        <div className="flex flex-col overflow-x-hidden p-6 py-10 w-full h-full">
          <section className="mt-6 space-y-6 mb-6">
            <SearchBar />
            <Filter />
          </section>
          {!isLoading ? (
            <>
              <section className="relative w-full h-fit flex justify-between items-end mb-10">
                <section className="flex">
                  {/* Quantity should be pulled from backend in the useEffect, these are
           mock values  */}
                  <AdminCards userRole="admin" cardCounts={adminCardInfo} />
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
                currentPage={currentPage}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                data={data}
              />
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </>
    );
  } else if (props.userRole === "client") {
    return (
      <div className="flex flex-col overflow-x-hidden p-6 py-10 w-full h-full">
        <h1 className="text-3xl mb-4">
          Queen’s Psychology Clinic Test Library
        </h1>

        <section className="mt-6 space-y-6 mb-6">
          <SearchBar />
          <Filter />
        </section>

        {/* CLIENT DASHBOARD */}
        {!isLoading ? (
          <>
            <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {data.map((test) => (
                <Card
                  key={test.ID}
                  data={test}
                  openModal={handleCardClick}
                  type="test"
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
              items={selectedItems}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

Dashboard.defaultProps = {
  userRole: "admin",
};
export default Dashboard;
