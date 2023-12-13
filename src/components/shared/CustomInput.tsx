import React from "react";

interface Props {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomInput = ({ value, name, handleChange }: Props) => {
  return (
    <input
      type="text"
      className="border-b border-black outline-none"
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default CustomInput;
