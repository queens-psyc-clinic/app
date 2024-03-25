import { useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { BiSolidBell } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Table from "../components/Table";
import { overdueMockData } from "../utils/mockData";
import cardSampleData, { CardData } from "../models/cardSampleData";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";

const Overdue = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const data = overdueMockData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [selectedCardColor, setSelectedCardColor] = useState<string>("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (data: CardData, color: string) => {
    if (data.Stock !== "0") {
      setSelectedCard(data);
      setSelectedCardColor(color);
      setIsModalOpen(true);
    }
  };
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
          <Table
            tableType="overdue"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}
      {props.userRole === "client" && (
        <>
          <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {cardSampleData.map((data) => (
              <Card
                key={data.id}
                data={data}
                openModal={(color) => handleCardClick(data, color)}
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
            cardColor={selectedCardColor}
          />
        </>
      )}
    </div>
  );
};

export default Overdue;
