import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Table from "../components/Table";
import { Item, Test } from "../models/BEModels";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";
import { MdDelete } from "react-icons/md";

import {
  deleteEntireTest,
  getAllArchivedTests,
  isTestAvailable,
  unArchiveTest,
} from "../services/TestService";
import uuid from "react-uuid";
import {
  ItemTypeOptions,
  MaximumAge,
  Measure,
  MinimumAge,
} from "../models/libraryItem";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import ConfirmModal from "../components/ConfirmModal";

const Archive = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState("archive");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Omit<
    Test,
    "OrderingCompany"
  > | null>(null);
  const [data, setData] = useState<Omit<Test, "OrderingCompany">[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  async function unArchiveTests() {
    const errors = [];
    for (const itemId of selectedRows) {
      await unArchiveTest(itemId).catch((e) => errors.push(e));
    }
    if (errors.length > 0) {
      alert("There was an issue archiving these tests.");
    } else {
      alert("Items Unarchived Successfully");
      window.location.reload();
    }
  }

  const deleteSelectedRows = async () => {
    // TODO: SHOULD POP MODAL FIRST
    for (const testId of selectedRows) {
      try {
        await deleteEntireTest(testId);
      } catch (e) {
        console.log(e);
      }
    }
    window.location.reload();
  };

  const handleDeleteButtonClick = () => {
    setShowConfirmModal(true);
  };

  useEffect(() => {
    getAllArchivedTests().then((res) => setData(res));
  }, []);

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4 `}>Archived Items </h1>
      {props.userRole === "admin" && (
        <>
          <section className="mt-6 space-y-2 mb-6">
            <SearchBar />
            <Filter
              placeholders={["Measure", "Item", "Min Age", "Max Age"]}
              options={[
                Object.values(Measure),
                ItemTypeOptions,
                MinimumAge,
                MaximumAge,
              ]}
            />
            <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
              <button
                className="text-white w-max bg-gray-900 px-3 py-2 rounded-lg flex items-center"
                onClick={() => unArchiveTests()}
              >
                <i className="mr-4">
                  <RiInboxUnarchiveFill size={20} />
                </i>
                <p>Unarchive</p>
              </button>
              <button
                onClick={handleDeleteButtonClick}
                className="text-white bg-red-800 px-3 py-2 rounded-lg flex items-center"
              >
                <i className="mr-4">
                  <MdDelete size={20} />
                </i>
                <p>Delete</p>
              </button>
            </section>
          </section>
          <div>
            <ConfirmModal
              header="Are you sure?"
              description="This action cannot be reversed."
              secondButton="Cancel"
              button="Delete"
              isOpen={showConfirmModal}
              closeModal={() => setShowConfirmModal(false)}
              onOk={async () => deleteSelectedRows()}
            />
          </div>
          <Table
            tableType="default"
            currentPage={currentPage}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}
      {props.userRole === "client" && (
        <>
          <p className="max-w-[70%]">
            These legacy archived items at the psychology clinic are older
            materials available for sign-out upon request, offering users access
            to historical psychological resources.
          </p>
          <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {data.map((data) => (
              <Card
                key={uuid()}
                type="test"
                data={data}
                openModal={handleCardClick}
              />
            ))}
          </div>
          <CardsModal
            modalTitle={selectedCard?.Name || ""}
            buttonLabel="Send Request"
            secButtonLabel="Close"
            isOpen={isModalOpen}
            closeModal={toggleModal}
            cardData={selectedCard}
            items={selectedItems}
          />
        </>
      )}
    </div>
  );
};

export default Archive;
