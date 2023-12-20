import { ReactNode } from "react";

const CustomModal = ({
  showModal,
  children,
}: {
  showModal: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={`bg-slate-300/50 z-40 ${
        showModal ? "block" : "hidden"
      } fixed inset-0 `}
    >
      {children}
    </div>
  );
};

export default CustomModal;
