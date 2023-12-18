import React from "react";

interface Props {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
}

const CustomInput = ({ value, name, handleChange, label }: Props) => {
  return (
    <div className="flex flex-col py-2 px-4 bg-white shadow rounded">
      <label className="mb-1 capitalize">{label}</label>
      <input
        type="text"
        className="outline-none text-slate-400"
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
};

export default CustomInput;
