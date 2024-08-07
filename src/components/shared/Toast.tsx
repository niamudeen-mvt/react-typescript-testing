import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { hideToast } from "../../store/features/toastSlice";

export default function ToastComponent() {
  const toast = useSelector((state: RootState) => state.toast);

  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(hideToast());
  };
  const handleCloseToast = () => {
    dispatch(hideToast());
  };
  return (
    <>
      {toast.showToast && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex__center">
          <div
            id="toast-interactive"
            className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow "
            role="alert"
          >
            <div className="flex">
              <div className="space-y-4 p-3">
                <p className="text-xs">{toast.message}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="bg-black text-white text-xs rounded-lg py-2 shadow hover:bg-black/90 transition-all duration-300"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                  <button
                    className="bg-white text-black text-xs rounded-lg py-2 shadow hover:bg-gray-50 transition-all duration-300"
                    onClick={handleCloseToast}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8  "
                onClick={handleCloseToast}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
