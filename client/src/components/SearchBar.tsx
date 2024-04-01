import { IoSearchOutline } from "react-icons/io5";
import "./SearchBar.css";

const SearchBar = ({ placeholder }: { placeholder?: string }) => {
  return (
    <div className="flex relative items-center  max-w-fit rounded-full">
      <input
        id="searchbar"
        placeholder={placeholder || "Search by name or acronym"}
        className="border-2 border-[#E9E9E9] outline-none rounded-full pl-10 py-2 text-base w-[50vw] h-12"
      ></input>
      <i className="absolute ml-4">
        <IoSearchOutline size={25} />
      </i>
    </div>
  );
};

export default SearchBar;
