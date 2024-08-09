import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdError } from "react-icons/md";
import { MdWarning } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";

const THEME_COLOR = "colored";
const POSITION = "bottom-right";
const CLASS_NAME = 'text-xs'

export const sendNotification = (type: string, msg: string) => {

  if (type === "success") {
    return toast.success(`${msg}`, {
      position: POSITION,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: THEME_COLOR,
      icon: <IoShieldCheckmark size={22} />,
      className: CLASS_NAME,
    });
  } else if (type === "warning") {
    return toast.warning(`${msg}`, {
      position: POSITION,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: THEME_COLOR,
      icon: <MdWarning size={22} />,
      className: CLASS_NAME,
    });
  } else {
    return toast.error(` ${msg}`, {
      position: POSITION,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: THEME_COLOR,
      icon: <MdError size={22} />,
      className: CLASS_NAME,
    });
  }
};

export const ToastContainerNotification = () => {
  return (
    <ToastContainer
      position={POSITION}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={THEME_COLOR}
    />
  );
};
