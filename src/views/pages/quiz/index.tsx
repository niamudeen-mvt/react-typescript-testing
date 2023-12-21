import { useState } from "react";
import ThemeContainer from "../../../components/layout/ThemeContainer";
import QuizCategories from "./QuizCategories";
import quizMenu from "../../../utils/data.json";
import CustomButton from "../../../components/shared/CustomButton";
import { sendNotification } from "../../../utils/notifications";

type TActiveQuestionType = {
  question: string;
  answer: string;
  options: string[];
};

type TAnswerList = {
  id: number;
  answer: string;
};

const QuizPage = () => {
  const [quizCategory, setQuizCategory] = useState("");
  const [showQuizMenu, setShowQuizMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [answersList, setAnswersList] = useState<TAnswerList[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [rightAnswersList, setRightAnswersList] = useState<TAnswerList[]>([]);

  const handleShowQuizMenu = () => {
    if (!quizCategory) {
      sendNotification("warning", "Select category to continue");
    } else {
      setSelectedOption("");
      setShowQuizMenu(true);
    }
  };

  const quizQuestions: TActiveQuestionType[] | undefined = quizMenu.quizzes
    .map((quiz) => {
      if (quiz.title.toLowerCase() === quizCategory.toLowerCase())
        return quiz.questions;
    })
    .filter((quiz) => quiz !== undefined)[0];

  console.log(quizQuestions, "quizQuestions");

  const activeQuestion: TActiveQuestionType | undefined = quizQuestions
    ? quizQuestions[questionNumber - 1]
    : undefined;

  // console.log(quizQuestions, "quizQuestions");
  // console.log(activeQuestion?.options, "activeQuestion");

  const handleGoBack = () => {
    if (questionNumber === 1) {
      setQuizCategory("");
      setShowQuizMenu(false);
      setAnswersList([]);
      setRightAnswersList([]);
    } else {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    const tempList = [...answersList];
    tempList[questionNumber - 1] = { id: questionNumber, answer: option };
    setAnswersList(tempList);

    if (option.toLowerCase() === activeQuestion?.answer.toLowerCase()) {
      console.log("1111111111");
      // if answer is right

      if (rightAnswersList.length) {
        const index = questionNumber - 1;

        const tempList = [...rightAnswersList];
        tempList[index] = { id: questionNumber, answer: option };

        console.log(tempList);
        setRightAnswersList(tempList);
      } else {
        setRightAnswersList([
          {
            id: questionNumber,
            answer: option,
          },
        ]);
      }
    } else {
      // if answer is wrong remove it
      console.log("2222222222222222222");
      const tempList = [...rightAnswersList];
      tempList.splice(questionNumber - 1, 1);
      setRightAnswersList(tempList);
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      setQuestionNumber(questionNumber + 1);
    } else {
      sendNotification("warning", "Select option");
    }
  };

  const handleReset = () => {
    setAnswersList([]);
    setRightAnswersList([]);
    setShowQuizMenu(false);
    setQuestionNumber(1);
    setQuizCategory("");
  };

  // console.log(quizCategory, "quizCategory");
  // console.log(selectedOption, "selectedOption");
  // console.log(activeQuestion, "activeQuestion");
  // console.log(rightAnswersList, "rightAnswersList");
  // console.log(answersList, "answersList");

  return (
    <ThemeContainer themeCenter={true} isCenter={true}>
      <div className="w-full h-full font-semibold text-white">
        {!showQuizMenu ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-y-5">
              <h1 className="text-5xl leading-[50px]">
                Welcome to the{` `}
                <span className="text-black">Frontend Quiz!</span>
              </h1>
              <p className="text-sm font-normal">
                Pick a subject to get started.
              </p>
            </div>

            <div>
              <QuizCategories
                quizCategory={quizCategory}
                setQuizCategory={setQuizCategory}
                handleShowQuizMenu={handleShowQuizMenu}
              />
            </div>
          </div>
        ) : activeQuestion ? (
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl">
              {questionNumber}.{`  `}
              {activeQuestion?.question}
            </h1>
            <ul>
              {activeQuestion?.options?.map((option, index) => {
                const id = index + 1;
                return (
                  <li
                    className={`${
                      questionNumber === answersList[questionNumber - 1]?.id &&
                      option === answersList[questionNumber - 1]?.answer
                        ? "bg-blue-300"
                        : "bg-white"
                    } text-black text-sm mb-4 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 shadow-md shadow-slate-900/10`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {id}.{` `}
                    {option}
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between">
              <CustomButton
                text="Go back"
                color="bg-white"
                textColor="text-black"
                onClick={handleGoBack}
              />
              <CustomButton text="Next" onClick={handleNext} />
            </div>
          </div>
        ) : (
          <div
            className={`bg-green-600/50 py-32 flex__center flex-col gap-y-5`}
          >
            <h1 className="text-3xl">Result: {rightAnswersList.length}/10</h1>
            <CustomButton text="Reset" onClick={handleReset} />
          </div>
        )}
      </div>
    </ThemeContainer>
  );
};

export default QuizPage;
