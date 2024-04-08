import { useEffect, useState } from "react";
import Table from "../components/Table";
import { MdArchive } from "react-icons/md";

import { MdDelete } from "react-icons/md";

import { Role } from "../models/User";
import AdminCards from "../components/AdminCards";
import Filter, { PossibleFilters } from "../components/Filter";
import SearchBar, { searchSuggestion } from "../components/SearchBar";
import Card from "../components/Card";
import Modal from "../components/Modal";
import CardsModal from "../components/CardsModal";
import _ from "lodash";
import {
  archiveTest,
  deleteEntireTest,
  deleteItem,
  deleteTest,
  getAllTests,
  getAllUnArchivedTests,
  getDashboardTests,
  getItemById,
  getItemsForTest,
  getTestById,
  getTestByName,
  isTestAvailable,
} from "../services/TestService";
import { Test, Item } from "../models/BEModels";
import LoadingSpinner from "../components/LoadingSpinner";
import { Measure, ItemTypeOptions } from "../models/libraryItem";
import ConfirmModal from "../components/ConfirmModal";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";
import { clearCart } from "../services/ShoppingCartService";

const Dashboard = (props: { userRole: Role }) => {
  let backup: Test[] = [];
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
  const [original, setOriginal] = useState<Test[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  /* FETCHING REAL DATA */
  useEffect(() => {
    // getAllUnArchivedTests().then((res) => {
    //   setData(res);
    //   setIsLoading(false);
    // });
    initializeSearchTree("DASHBOARD");

    getDashboardTests().then((res) => {
      setData(res);
      backup = res;
      setOriginal(res);
      setIsLoading(false);
    });
  }, []);

  const handleSearchSuggestionSelect = (suggestion: searchSuggestion) => {
    if (suggestion.kind === "Name") {
      getTestByName(suggestion.value).then((res) => {
        setData(res);
      });
    } else if (suggestion.kind === "ID") {
      getTestById(suggestion.value).then((res) => {
        setData([res]);
      });
    }
  };

  async function handleQueryEnter(query: string) {
    if (query == "") {
      setIsLoading(true);
      getAllUnArchivedTests().then((res) => {
        setData(res);
        setIsLoading(false);
      });
    }
    const suggestions = await getSearchSuggestions(query);
    const possibleResults: Test[] = await Promise.all(
      suggestions.map(async (suggestion: searchSuggestion) => {
        if (suggestion.kind === "Name") {
          const tests = await getTestByName(suggestion.value);
          return tests;
        } else if (suggestion.kind === "ID") {
          const tests = await getTestById(suggestion.value);
          return tests;
        }
      })
    );
    setData(_.flatten(possibleResults));
  }

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

  const handleDeleteButtonClick = () => {
    setShowConfirmModal(true);
  };

  const deleteSelectedRows = async () => {
    // TODO: SHOULD POP MODAL FIRST
    // ensure when you press cancel it doesn't delete :)

    for (const testId of selectedRows) {
      try {
        await deleteEntireTest(testId);
      } catch (e) {
        console.log(e);
      }
    }
    window.location.reload();
  };

  function applyFilter(filters: PossibleFilters) {
    let filteredData = original;
    if (filters.Measure) {
      filteredData = filteredData.filter((test) => {
        return test.MeasureOf == filters.Measure;
      });
    }
    if (filters.Item) {
      filteredData = filteredData.filter((test) => {
        return (
          test.Items && test.Items.some((item) => item.ItemType == filters.Item)
        );
      });
    }

    setData(filteredData);
  }

  async function archiveTests() {
    const errors = [];
    for (const itemId of selectedRows) {
      await archiveTest(itemId).catch((e) => errors.push(e));
    }
    if (errors.length > 0) {
      alert("There was an issue archiving these tests.");
    } else {
      alert("Items Archived Successfully");
      window.location.reload();
    }
  }
  if (props.userRole === "admin") {
    return (
      <>
        <div className="flex flex-col overflow-x-hidden p-6 py-10 w-full h-full">
          <section className="mt-6 space-y-6 mb-6">
            <SearchBar
              onSelectSuggestion={handleSearchSuggestionSelect}
              onQuerySearch={handleQueryEnter}
            />

            <Filter
              placeholders={["Measure", "Item"]}
              options={[Object.values(Measure), ItemTypeOptions]}
              onChange={applyFilter}
              onClear={() => setData(original)}
            />
          </section>
          {!isLoading ? (
            <>
              <section className="relative w-full h-fit flex justify-between items-end mb-10">
                <section className="flex">
                  {/* Quantity should be pulled from backend in the useEffect, these are
           mock values  */}
                  <AdminCards userRole="admin" />
                </section>
                <section className="absolute bottom-0 right-0 space-x-4 flex w-min items-end justify-end self-end">
                  <button
                    onClick={archiveTests}
                    className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center"
                  >
                    <i className="mr-4">
                      <MdArchive size={20} />
                    </i>
                    <p>Archive</p>
                  </button>
                  <Modal modalTitle="Add Test" buttonLabel="Add" />
                  <button
                    // onClick={deleteSelectedRows}
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
          <SearchBar
            onSelectSuggestion={handleSearchSuggestionSelect}
            onQuerySearch={handleQueryEnter}
          />

          <Filter
            placeholders={["Measure", "Item"]}
            options={[Object.values(Measure), ItemTypeOptions]}
            onChange={applyFilter}
          />
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
