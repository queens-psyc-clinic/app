import { useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

import Table from "../components/Table";
import { requestsMockData } from "../utils/mockData";
import cardSampleData, { CardData } from "../models/cardSampleData";
import Card from "../components/Card";
import CardsModal from "../components/CardsModal";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";

const Requests = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const data = requestsMockData;
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
      <h1 className={`text-3xl mb-4`}>Requested Items </h1>
      {props.userRole === "admin" && (
        <>
          <section className="mt-6 space-y-4 pb-5">
            <SearchBar />
            <Filter />
            <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
              <button className="bg-black w-max border border-black text-white px-3 py-2 rounded-lg flex items-center">
                <i className="mr-4">
                  <MdCheckCircle size={20} />
                </i>
                <p>Mark as Picked Up</p>
              </button>
              <button className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center">
                <i className="mr-4">
                  <MdRemoveCircle size={20} />
                </i>
                <p>Unreserve</p>
              </button>
            </section>
          </section>
          {/* <Table
            tableType="signedOut"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          /> */}
        </>
      )}
      {/* {props.userRole === "client" && (
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
      )} */}
    </div>
  );
};

export default Requests;
