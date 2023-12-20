import { BsThreeDotsVertical } from "react-icons/bs";
import { usePost } from "../../context/postContext";

type Props = {
  showMenu: boolean;
  dropMenu: {
    id: number;
    title: string;
  }[];
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomDrodown = ({ setShowMenu, showMenu, dropMenu }: Props) => {
  const { handleShowComments, handleContentTitle } = usePost();
  return (
    <div className="group relative cursor-pointer">
      <span
        onClick={(event) => {
          event.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        <BsThreeDotsVertical className="font-medium text-black" />
      </span>

      {showMenu ? (
        <div className="bg-white h-full min-w-[150px] min-h-[50px]  rounded-lg text-sm absolute top-8 -translate-x-[80%] p-3 transition-all duration-500 active:block shadow-2xl z-10">
          <ul className="h-full flex flex-col justify-between w-full">
            {dropMenu.map((e) => {
              return (
                <li
                  key={e.id}
                  onClick={() => {
                    handleShowComments(true);
                    handleContentTitle("Comments");
                  }}
                  className="flex gap-x-2 hover:bg-blue-300 px-3 py-1 rounded-md transition-all duration-300 text-black"
                >
                  {/* <span className="text-xs">x</span> */}
                  <span className="text-xs">{e.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDrodown;
