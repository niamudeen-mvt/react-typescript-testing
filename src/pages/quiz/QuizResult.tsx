import CustomButton from "../../components/shared/CustomButton";
import { TQuizResullt } from "../../utils/types";

interface IProps {
  quizResult: TQuizResullt | undefined;
  handleReset: () => void;
}

const QuizResult = ({ quizResult, handleReset }: IProps) => {
  return (
    <div className={`bg-green-600/50 py-32 flex__center flex-col gap-y-5`}>
      <h1 className="text-3xl">
        Result: {quizResult?.result}/{quizResult?.total}
      </h1>
      <p>Total questions: {quizResult?.total}</p>
      <p>Attempted Questions: {quizResult?.attempted}</p>
      <p>
        Unattempted Quesitons:{`  `}
        {quizResult?.unattempted}
      </p>
      <p>Right Questions: {quizResult?.right}</p>
      <CustomButton text="Reset" onClick={handleReset} />
    </div>
  );
};

export default QuizResult;
