import React from "react";
import { quizCategories } from "../../utils/constants";
import CustomButton from "../../components/shared/CustomButton";

interface IProps {
  quizCategory: string;
  setQuizCategory: React.Dispatch<React.SetStateAction<string>>;
  handleShowQuizMenu: () => void;
}

const QuizCategories = ({
  quizCategory,
  setQuizCategory,
  handleShowQuizMenu,
}: IProps) => {
  return (
    <div>
      {quizCategories.map((category) => {
        return (
          <div
            key={category.id}
            className={` ${quizCategory === category.name ? "bg-blue-300" : " bg-white"
              } text-black text-sm mb-4 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 shadow-md shadow-slate-900/10`}
            onClick={() => setQuizCategory(category.name)}
          >
            {category.name}
          </div>
        );
      })}
      <CustomButton text="Start" onClick={handleShowQuizMenu} />
    </div>
  );
};

export default QuizCategories;
