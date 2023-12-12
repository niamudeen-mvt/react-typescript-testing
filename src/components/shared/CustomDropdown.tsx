import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomDropdown = ({ showMenu, setShowMenu }: Props) => {
  return (
    <div className="group relative cursor-pointer">
      <span
        onClick={(event) => {
          event.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        <BsThreeDotsVertical className="font-medium text-white" />
      </span>
      {showMenu ? (
        <div className="bg-white h-full min-h-[100px]  rounded-lg text-sm absolute top-8 -translate-x-[80%] p-3 transition-all duration-500 active:block shadow-2xl">
          <ul className="h-full flex flex-col justify-between w-full">
            {[1, 2, 3].map((e) => {
              return (
                <li
                  key={e}
                  className="flex gap-x-2 hover:bg-blue-300 px-3 py-1 rounded-md transition-all duration-300 "
                >
                  <span className="text-xs">x</span>
                  <span className="text-xs">Comments</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDropdown;
