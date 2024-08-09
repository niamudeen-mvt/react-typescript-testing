
type TextErrorProps = {
  msg?: string;
}

const TextError = ({ msg = "msg" }: TextErrorProps) => {
  return <p className="text-white text-xs">{msg}</p>;
};

export default TextError;
