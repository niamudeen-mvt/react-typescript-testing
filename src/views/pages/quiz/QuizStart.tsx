const QuizStart = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-5xl leading-[60px]">
        Welcome to the{` `}
        <span className="text-black">Frontend Quiz!</span>
      </h1>
      <p className="text-sm font-normal">Pick a subject to get started.</p>
    </div>
  );
};

export default QuizStart;
