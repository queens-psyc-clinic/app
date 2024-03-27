import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

import { Test, SignedOutItem } from "../models/BEModels";
import {
  Item,
  getAllSignedOutItems,
  getAllSignedOutItemsByUser,
} from "../services/TestService";
import SignedOutTable from "../components/SignedOutTable";

const SignedOut = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Test | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [data, setData] = useState<SignedOutItem[]>([]);

  /* FETCHING REAL DATA */
  useEffect(() => {
    if (props.userRole === "admin") {
      getAllSignedOutItems().then((res) => setData(res as SignedOutItem[]));
    } else if (props.userRole === "client") {
      getAllSignedOutItemsByUser("1").then((res) =>
        setData(res as SignedOutItem[])
      ); // WAITING ON me to set up routing
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (data: Test) => {
    setSelectedCard(data);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      }  overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      <h1 className={`text-3xl mb-4 `}>Signed Out Items </h1>
      {props.userRole === "admin" && (
        <>
          <section className="mt-6 space-y-4 mb-16">
            <SearchBar />
            <Filter />
          </section>
          <SignedOutTable
            tableType="signedOut"
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            data={data}
          />
        </>
      )}
      {/* {props.userRole === "client" && (
        <>
          <div className="ml-4 mt-4 sm:ml-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {data.map((test) => (
              <Card
                key={test.ID}
                data={test}
                openModal={() => handleCardClick(test)}
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
      )} */}
    </div>
  );
};

export default SignedOut;
