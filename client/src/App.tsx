import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CardsModal from "./components/CardsModal";
import cardSampleData, { CardData } from "./models/cardSampleData";

export function App() {
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
    <div className="w-screen h-screen bg-white flex items-center px-4">
      <Navbar />
      <div className="m-10 pb-10 w-full mt-96 max-w-screen-lg">
        <div className="ml-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {cardSampleData.map((data) => (
            <Card key={data.id} data={data} openModal={(color) => handleCardClick(data, color)} />
          ))}
        </div>
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
    </div>
  );
}

export default App;