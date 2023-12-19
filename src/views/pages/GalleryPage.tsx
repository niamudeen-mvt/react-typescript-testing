import { useEffect, useState } from "react";
import ThemeContainer from "../../components/layout/ThemeContainer";
import { deleteImage, getFiles } from "../../services/api/user";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import CustomLoader from "../../components/Loader";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { FaPlus } from "react-icons/fa6";
import CustomModal from "../../components/layout/CustomModal";
import Test from "./Test";

const GalleryPage = () => {
  const [userImages, setUserImages] = useState([]);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchFiles();
  }, [showModal]);

  const fetchFiles = async () => {
    dispatch(startLoading());
    let res = await getFiles();
    if (res.status === 200) {
      dispatch(stopLoading());
      setUserImages(res?.data?.images[0]?.images);
    }
  };

  // const handleDelete = async (id: string) => {
  //   dispatch(startLoading());
  //   let res = await deleteImage(id);
  //   if (res.status === 200) {
  //     sendNotification("warning", res.data.message);
  //   } else {
  //     sendNotification("warning", res?.response?.data?.message);
  //   }
  //   dispatch(stopLoading());
  // };

  return (
    <ThemeContainer>
      {isLoading ? <CustomLoader /> : null}
      <div>
        <h1 className="text-2xl text-white mb-10">
          {isLoading ? "" : "Gallery"}
        </h1>
        <div className="columns-3xs">
          {userImages?.map((file: { image: string; _id: string }) => {
            return (
              <div
                className="bg-white p-1 relative rounded-lg mb-4"
                key={file._id}
              >
                <img src={file.image} alt="preview" className="h-full w-full" />
                {/* <MdDelete
                  size={22}
                  className="absolute top-3 right-3 text-red-700 cursor-pointer hover:scale-150 transition-all duration-300"
                  onClick={() => handleDelete(file._id)}
                /> */}
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="fixed top-[85%] left-[50%] h-14 w-14 bg-slate-900 flex__center text-white rounded-full"
        onClick={() => setShowModal(true)}
      >
        <FaPlus size={25} />
      </button>

      {showModal ? (
        <CustomModal showModal={showModal}>
          <Test setShowModal={setShowModal} />
        </CustomModal>
      ) : null}
    </ThemeContainer>
  );
};

export default GalleryPage;
