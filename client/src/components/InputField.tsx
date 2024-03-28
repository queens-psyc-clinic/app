import React from "react";

interface InputFieldProps {
  placeholder?: string;
  label: string;
  important?: boolean;
  type?: string;
  styles?: string;
  canEdit?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = "",
  label = "",
  important = false,
  type = "text",
  styles = "",
  canEdit = true,
  value = "",
  onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    console.log(e.target.value),
}: InputFieldProps) => {
  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    if (type === "Number") {
      const pattern = /^[0-9\b]+$/;
      if (!pattern.test(event.key)) {
        event.preventDefault();
      }
    } else if (type === "text") {
      const pattern = /^[0-9a-zA-Z-]+$/;
      if (!pattern.test(event.key)) {
        event.preventDefault();
      }
    } else if (type === "email") {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Not working!!
      if (!pattern.test(inputValue) && inputValue !== "") {
        event.preventDefault();
      }
    }
  };
  return (
    <div>
      <label
        htmlFor="inputText"
        className="block text-base font-medium leading-6 text-gray-900"
      >
        {label} {important && <span className="text-red-200">*</span>}
      </label>
      <input
        type={type}
        name="inputText"
        id="inputText"
        className={`block w-full mt-2 pl-3 rounded-md bg-gray-100 border-0 py-2 text-gray-900 placeholder:text-gray-300 focus:ring-3 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 shadow-sm ${styles}`}
        placeholder={placeholder}
        onKeyPress={handleInput}
        readOnly={!canEdit}
        value={value ? value : undefined}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
