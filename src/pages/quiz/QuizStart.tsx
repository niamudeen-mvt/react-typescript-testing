import { useTheme } from "../../context/themeContext";

const QuizStart = () => {
  const { isThemeLight } = useTheme();
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-5xl leading-[60px]">
        Welcome to the{` `}
        <span className={`${isThemeLight ? "text-black" : "text-blue-600"}`}>
          Frontend Quiz!
        </span>
      </h1>
      <p className="text-sm font-normal">Pick a subject to get started.</p>
    </div>
  );
};

export default QuizStart;
