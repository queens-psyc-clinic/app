import { IoSearchOutline } from "react-icons/io5";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="flex items-center  max-w-fit rounded-full">
      <input
        id="searchbar"
        className="border-black outline-none rounded-full pl-10 py-2 text-base w-[50vw]"
      ></input>
      <i className="absolute ml-2">
        <IoSearchOutline size={25} />
      </i>
    </div>
  );
};

export default SearchBar;
