const CustomLoader = ({ content }: { content?: string }) => {
  return (
    <div
      className={`text-white bg-slate-800/50 fixed top-0 left-0 flex__center z-50 h-screen w-full`}
    >
      {`Loading ${content}.......`}
    </div>
  );
};

export default CustomLoader;
