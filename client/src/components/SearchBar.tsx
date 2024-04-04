import { IoSearchOutline } from "react-icons/io5";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import {
  getSearchSuggestions,
  initializeSearchTree,
} from "../services/SearchService";
import uuid from "react-uuid";

export interface searchSuggestion {
  value: string;
  kind: string;
}

const SearchBar = ({
  onSelectSuggestion,
  onQuerySearch,
  placeholder,
}: {
  onSelectSuggestion?: (suggestion: searchSuggestion) => void;
  onQuerySearch?: (query: string) => void;
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<searchSuggestion[]>([]);

  const handleSelectSuggestion = (suggestion: searchSuggestion) => {
    console.log(suggestion);
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }
    setQuery(suggestion.value);
    setSuggestions([]);
  };
  async function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    if (e.target.value.replace(/\s/g, "") != "") {
      const newSuggestions = await getSearchSuggestions(e.target.value);
      console.log(newSuggestions);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  console.log(suggestions);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSuggestions([]);
      if (onQuerySearch) {
        onQuerySearch(query);
      }
    }
  };
  return (
    <div>
      <div className="flex relative items-center  max-w-fit rounded-full">
        <input
          id="searchbar"
          placeholder={placeholder || "Search by name or acronym"}
          className="border-2 border-[#E9E9E9] outline-none rounded-full pl-10 py-2 text-base w-[50vw] h-12"
          onChange={handleQueryChange}
          onKeyDown={handleKeyPress}
          value={query}
        ></input>
        <i className="absolute ml-4">
          <IoSearchOutline size={25} />
        </i>
      </div>
      {suggestions.length > 0 && (
        <div className="absolute shadow-lg z-40 w-[50vw] max-h-[50vh] overflow-y-scroll bg-white p-4  rounded">
          {suggestions.map((suggestion) => {
            return (
              <div
                className="flex items-center justify-between text-sm px-2 py-4 bg-white cursor-pointer  hover:bg-gray-50"
                onClick={() => handleSelectSuggestion(suggestion)}
                key={uuid()}
              >
                <section className="flex items-center">
                  <i className="justify-self-start mr-4">
                    <IoSearchOutline size={15} />
                  </i>
                  <p className="max-w-[30vw]">{suggestion.value}</p>
                </section>
                <p className="text-gray-200 text-xs border border-gray-200 py-1 px-2 w-max rounded-full ">
                  {suggestion.kind == "Name"
                    ? "Test Name"
                    : suggestion.kind == "ID"
                    ? "Acronym"
                    : suggestion.kind == "ItemID"
                    ? "Item name"
                    : "User"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
