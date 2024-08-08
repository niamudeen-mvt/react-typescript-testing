import { Link } from "react-router-dom";
import ReactTyped from "react-typed";

type TextContentProps = {
  heading: string;
  subHeading?: string;
  redirectTo: string;
  btnText: string;
};

const TextContent = ({
  heading,
  subHeading,
  redirectTo,
  btnText,
}: TextContentProps) => {
  return (
    <div className="text-center flex flex-col gap-y-5">
      <h1 className="text-4xl sm:text-5xl font-semibold text-white">
        {heading}
        <ReactTyped strings={[`Taskfiy`]} typeSpeed={200} loop />
      </h1>
      {subHeading && <p> {subHeading}</p>}
      <Link to={redirectTo}>
        <button className="bg-slate-700 px-12 py-4 text-white rounded-lg hover:bg-slate-600 capitalize">
          {btnText}
        </button>
      </Link>
    </div>
  );
};

export default TextContent