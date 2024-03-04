import React, { useState, useEffect, useRef } from "react";
import dropdown from "../assets/icons/dropdown.svg";

interface DropdownProps {
  placeholder?: string;
  label?: string;
  important?: boolean;
  type?: string;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder = "",
  label = "",
  important = false,
  type = "text",
  options,
}: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleContainerClick = () => {
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      {label && (
        <label
          htmlFor="inputText"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          {label} {important && <span className="text-red-200">*</span>}
        </label>
      )}

      <div className="mt-2 rounded-md relative min-w-full">
        <div className="flex" onClick={handleContainerClick}>
          <input
            type={type}
            name="inputText"
            id="inputText"
            value={selectedOption}
            readOnly
            className="block w-full rounded-tl-lg rounded-bl-lg pr-4 bg-gray-100 border-0 py-2 text-gray-900 placeholder:text-gray-300 focus:ring-3 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 shadow-sm"
            placeholder={placeholder}
          />
          <button
            className="bg-gray-100 rounded-tr-lg rounded-br-lg pr-4 py-2"
            onClick={toggleDropdown}
          >
            <img src={dropdown} alt="dropdown"></img>
          </button>
        </div>
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-40 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
