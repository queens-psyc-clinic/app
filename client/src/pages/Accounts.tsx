import { useEffect, useState } from "react";
import { Role } from "../models/User";
import SearchBar, { searchSuggestion } from "../components/SearchBar";
import AccountsTable from "../components/AccountsTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import {
  getAllSignedOutItems,
  getAllSignedOutItemsByUser,
  getAllUsers,
  getItemById,
  getItemMeasure,
} from "../services/TestService";
import _ from "lodash";
import { Test, SignedOutItem } from "../models/BEModels";
import uuid from "react-uuid";
import Card from "../components/Card";
import {
  BackendUser,
  approveUser,
  deleteUser,
  getAllUnapprovedUsers,
  getUserByFirstLastName,
} from "../services/UserService";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";

export interface AccountUser {
  FirstName: string;
  LastName: string;
  Email: string;
  ID: string;
}

const Accounts = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Omit<
    Test,
    "OrderingCompany"
  > | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AccountUser[]>([]);

  /* FETCHING REAL DATA */
  useEffect(() => {
    initializeSearchTree("USERS");
    getAllUnapprovedUsers().then((res) => setData(res));
  }, []);

  const removeUser = async () => {
    // setData(data.filter((elem) => elem.ID != id))
    setIsLoading(true);
    for (const userId of selectedRows) {
      await deleteUser(userId).catch((e) =>
        alert("There was an error approving at least one user.")
      );
    }
    setIsLoading(false);
    window.location.reload();
  };

  async function approve() {
    setIsLoading(true);
    for (const userId of selectedRows) {
      await approveUser(userId).catch((e) =>
        alert("There was an error approving at least one user.")
      );
    }
    setIsLoading(false);
    window.location.reload();
  }

  const handleSearchSuggestionSelect = (suggestion: searchSuggestion) => {
    console.log(suggestion);
    if (suggestion.kind === "FirstLastName") {
      getUserByFirstLastName(suggestion.value).then((res) => {
        console.log(res);
        setData(res);
      });
    }
  };

  async function handleQueryEnter(query: string) {
    if (query == "") {
      setIsLoading(true);
      getAllUnapprovedUsers().then((res) => {
        setData(res);
        setIsLoading(false);
      });
    }
    const suggestions = await getSearchSuggestions(query);
    const possibleResults: BackendUser[] = await Promise.all(
      suggestions.map(async (suggestion: searchSuggestion) => {
        if (suggestion.kind === "FirstLastName") {
          const users = await getUserByFirstLastName(suggestion.value);
          return users;
        }
      })
    );
    setData(_.flatten(possibleResults));
  }

  return (
    <div
      className={`relative flex flex-col ${
        props.userRole === "admin" ? "justify-end" : "py-16"
      } overflow-x-hidden p-6 py-10 w-full h-full`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className={`text-3xl mb-4 `}>Account Requests </h1>
          {props.userRole === "admin" && (
            <>
              <section className="mt-6 space-y-4 pb-5">
                <SearchBar
                  placeholder="Search by user's name"
                  onSelectSuggestion={handleSearchSuggestionSelect}
                  onQuerySearch={handleQueryEnter}
                />
                <section className="ml-auto space-x-4 flex w-min h-min items-end justify-end self-end">
                  <button
                    className="bg-black w-max border border-black text-white px-3 py-2 rounded-lg flex items-center"
                    onClick={() => approve()}
                  >
                    <i className="mr-4">
                      <MdCheckCircle size={20} />
                    </i>
                    <p>Approve</p>
                  </button>
                  <button
                    className="text-black border border-black bg-white px-3 py-2 rounded-lg flex items-center"
                    onClick={removeUser}
                  >
                    <i className="mr-4">
                      <MdRemoveCircle size={20} />
                    </i>
                    <p>Decline</p>
                  </button>
                </section>
              </section>
              <div>
                <AccountsTable
                  tableType="accounts"
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  isEditable={false}
                  data={data}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Accounts;
