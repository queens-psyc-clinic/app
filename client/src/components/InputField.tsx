import React from 'react';

interface InputFieldProps {
  placeholder?: string;
  label: string;
  important?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder = "", label = "", important = false, type = "text" }: InputFieldProps) => {
    return (
    <div>
      <label htmlFor="inputText" className="block text-base font-medium leading-6 text-gray-900">
        {label} {important && <span className="text-red-200">*</span>}
      </label>
      <div className="mt-2 rounded-md">
        <input
          type={type}
          name="inputText"
          id="inputText"
          className="block w-full rounded-md bg-gray-100 border-0 py-2 text-gray-900 placeholder:text-gray-300 focus:ring-3 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 shadow-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default InputField;