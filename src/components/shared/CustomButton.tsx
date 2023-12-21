import React from "react";

interface IProps {
  text?: string;
  color?: string;
  textColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton = ({
  text,
  color = "bg-slate-800",
  textColor = "text-white",
  onClick,
}: IProps) => {
  return (
    <button
      className={`max-w-[150px] ${color} ${textColor} font-medium text-sm px-4 py-2 rounded-lg`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
