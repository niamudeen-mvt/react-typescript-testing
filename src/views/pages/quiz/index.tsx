import { useEffect, useState } from "react";
import ThemeContainer from "../../../components/layout/ThemeContainer";
import QuizCategories from "./QuizCategories";
import quizMenu from "../../../utils/data.json";
import CustomButton from "../../../components/shared/CustomButton";
import { sendNotification } from "../../../utils/notifications";
import CustomModal from "../../../components/layout/CustomModal";
import { LuAlarmClock } from "react-icons/lu";
import { QUIZ_TIME } from "../../../utils/constants";
import {
  TActiveQuestionType,
  TAnswerList,
  TQuizResullt,
} from "../../../utils/types";

const QuizPage = () => {
  const [quizCategory, setQuizCategory] = useState("");
  const [showQuizMenu, setShowQuizMenu] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answersList, setAnswersList] = useState<TAnswerList[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [rightAnswersList, setRightAnswersList] = useState<TAnswerList[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<TQuizResullt>();
  const [seconds, setSeconds] = useState(QUIZ_TIME);

  // questions based on the quiz category
  const quizQuestions: TActiveQuestionType[] | undefined = quizMenu.quizzes
    .map((quiz) => {
      if (quiz.title.toLowerCase() === quizCategory.toLowerCase())
        return quiz.questions;
    })
    .filter((quiz) => quiz !== undefined)[0];

  // active quesiton
  const activeQuestion: TActiveQuestionType | undefined = quizQuestions
    ? quizQuestions[questionNumber - 1]
    : undefined;

  // quiz timer
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (seconds === 0 && showQuizMenu && quizQuestions) {
      setShowModal(true);
      return;
    } else if (showQuizMenu) {
      if (seconds <= 0) return;
      timer = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeQuestion, seconds, showQuizMenu, quizQuestions]);

  // showing quiz menu
  const handleShowQuizMenu = () => {
    if (!quizCategory) {
      sendNotification("warning", "Select quiz category to continue");
    } else {
      setSelectedOption("");
      setShowQuizMenu(true);
      setSeconds(QUIZ_TIME);
      setQuestionNumber(1);

      setResult({
        result: 0,
        total: 0,
        attempted: 0,
        unattempted: 0,
        right: 0,
      });
    }
  };

  // selecting answer
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    const tempList = [...answersList];
    tempList[questionNumber - 1] = { id: questionNumber, answer: option };
    setAnswersList(tempList);

    if (option.toLowerCase() === activeQuestion?.answer.toLowerCase()) {
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
      const tempList = [...rightAnswersList];
      tempList.splice(questionNumber - 1, 1);
      setRightAnswersList(tempList);
    }
  };

  // moving to next question
  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    setSelectedOption("");

    if (quizQuestions?.length === questionNumber) {
      console.log("last question");
      setResult({
        result: rightAnswersList.length,
        total: quizQuestions?.length,
        attempted: answersList?.filter((answer) => answer !== undefined)
          ?.length,
        unattempted: quizQuestions.length - answersList?.length,
        right: rightAnswersList.length,
      });
      setQuizCategory("");
    } else {
      setSeconds(QUIZ_TIME);
    }
  };

  // starting quiz again
  const handleReset = () => {
    setAnswersList([]);
    setRightAnswersList([]);
    setShowQuizMenu(false);
    setQuestionNumber(1);
    setQuizCategory("");
  };

  // continuing after quiz timer
  const handleContinuQuiz = () => {
    setQuestionNumber(questionNumber + 1);
    setSeconds(QUIZ_TIME);
    setShowModal(false);
  };

  return (
    <ThemeContainer themeCenter={true} isCenter={true}>
      <div className="w-full h-full font-semibold text-white">
        {!showQuizMenu ? (
          // quiz section  ====================

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-y-5">
              <h1 className="text-5xl leading-[60px]">
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
          // quiz menu ==================

          <div className="flex flex-col gap-5">
            <p className="text-white flex items-center gap-4">
              <LuAlarmClock size={22} /> 00:
              {seconds < 10 ? "0" + seconds : seconds}
            </p>
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
                      selectedOption === option ? "bg-blue-300" : "bg-white"
                    } text-black text-sm mb-4 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 shadow-md shadow-slate-900/10`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {id}.{` `}
                    {option}
                  </li>
                );
              })}
            </ul>
            <CustomButton text="Next" onClick={handleNext} />
          </div>
        ) : (
          // result menu ================================================
          <div
            className={`bg-green-600/50 py-32 flex__center flex-col gap-y-5`}
          >
            <h1 className="text-3xl">
              Result: {result?.result}/{result?.total}
            </h1>
            <p>Total questions: {result?.total}</p>
            <p>Attempted Questions: {result?.attempted}</p>
            <p>
              Unattempted Quesitons:{`  `}
              {result?.unattempted}
            </p>
            <p>Right Questions: {result?.right}</p>
            <CustomButton text="Reset" onClick={handleReset} />
          </div>
        )}
      </div>

      {/* timer alert ======================= */}
      {showModal ? (
        <CustomModal showModal={showModal}>
          <div className="max-w-[400px] w-full py-32 bg-white text-center rounded-lg shadow-xl shadow-slate-900/10">
            <p className="mb-3 text-red-600">You are out of time limit !!</p>
            <CustomButton
              text="Click to continue"
              onClick={handleContinuQuiz}
            />
          </div>
        </CustomModal>
      ) : null}
    </ThemeContainer>
  );
};

export default QuizPage;
