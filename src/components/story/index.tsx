import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { getStories, postStories } from "../../services/api/user";
import { FaPlus } from "react-icons/fa";
import CustomLoader from "../Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CustomModal from "../layout/CustomModal";
import { sendNotification } from "../../utils/notifications";
import ThemeContainer from "../layout/ThemeContainer";
import { useTheme } from "../../context/themeContext";
import { IoClose } from "react-icons/io5";
// const ALLOWED_IMAGES = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showStory, setShowStory] = useState({
    show: false,
    link: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [story, setStory] = useState<any>({
    message: "",
    image: "",
  });
  const { isThemeLight } = useTheme();

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    dispatch(startLoading());
    let res = await getStories();

    console.log(res, "stories");

    if (res.status === 200) {
      setStories(res?.data?.stories);
    }
    dispatch(stopLoading());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.files) {
      console.log(event?.target.files[0]);

      setStory({
        ...story,
        image: event?.target.files[0],
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(startLoading());
    if (story.message) {
      const formData = new FormData();
      if (story.image) {
        formData.append("image", story.image);
      }
      formData.append("message", story.message);

      let res = await postStories(formData);
      console.log(res, "postStories");

      if (res.status === 200) {
        fetchStories();
        setShowModal(false);
        sendNotification("warning", res.data.message);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        sendNotification("error", res?.response?.data?.message);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    } else {
      setShowModal(true);
      sendNotification("warning", "Please select and image");
    }
    dispatch(stopLoading());
  };

  if (isLoading) return <CustomLoader />;

  return (
    <div className="mt-32">
      <div className="grid grid-cols-6 gap-10">
        {stories?.map(
          (story: { _id: string; image: string }, index: number) => {
            return (
              <div
                key={story?._id}
                className="h-48 bg-white rounded-lg flex__center relative hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setShowStory({
                    show: true,
                    link: story.image,
                  })
                }
              >
                {index === 0 ? (
                  <FaPlus
                    size={25}
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer text-slate-800"
                  />
                ) : (
                  <img src={story.image} alt="story" />
                )}
                {index === 0 ? null : (
                  <div
                    className={`bg-slate-800/50 absolute top-0 left-0 h-full w-full rounded-lg`}
                  ></div>
                )}
              </div>
            );
          }
        )}
      </div>

      {showModal ? (
        <CustomModal showModal={showModal}>
          <ThemeContainer>
            {isLoading ? <CustomLoader /> : null}
            <>
              <form
                onSubmit={handleSubmit}
                className="text-white border p-10 rounded-md relative -z-0"
              >
                <div className="form-control mb-6 flex flex-col">
                  <label>Message</label>
                  <input
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    className={`border-b mb-4 outline-none bg-transparent text-white ${
                      isThemeLight ? "border-black" : "border-white"
                    }`}
                    onChange={(event) =>
                      setStory({ ...story, message: event?.target.value })
                    }
                  />
                  <input type="file" onChange={handleChange} ref={inputRef} />
                </div>
                <button
                  type="submit"
                  className="mb-10 bg-white text-black px-7 py-2 rounded-lg border w-full"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </form>
              {/* <div
                {...getRootProps()}
                className={`border min-h-[300px] p-5 mb-4 ${
                  previews?.length === 0 ? "flex__center text-white" : ""
                }`}
              >
                <input {...getInputProps()} ref={inputRef} />
                {previews?.length ? (
                  <div className="grid grid-cols-6 gap-3">
                    {previews?.map((file) => {
                      return (
                        <div className="h-24 w-40 mx-auto">
                          <img
                            src={file}
                            alt="preview"
                            className="h-full w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              <span className="text-sm italic font-Montserrat">
                Allowed JPG, JPEG, WEBP, PNG. Max file size 200KB.
              </span>
              <br />
              <span className="text-sm italic font-Montserrat">
                If your upload image is larger than 200KB allowed, reduce the
                size of the image if you want to reduce the size of the image
                click this link.
              </span>
              {`  `}
              <a
                href="https://picresize.com/"
                className="text-sm italic font-Montserrat pointer-events-auto font-bold"
                rel="noreferrer"
                target="_blank"
              >
                Click Here To Convert
              </a>
              <div className="flex gap-x-4">
                <Link to="/gallery">
                  <button
                    className="bg-slate-800 text-white px-10 py-2 my-5 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Go back
                  </button>
                </Link>
                <button
                  className="bg-white text-black px-10 py-2 my-5 rounded-lg"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div> */}
            </>
          </ThemeContainer>
        </CustomModal>
      ) : null}

      {/* full preview story */}

      {showStory.show ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center">
          <IoClose
            size={22}
            className="text-white fixed top-10 right-10 cursor-pointer"
            onClick={() =>
              setShowStory({
                show: false,
                link: "",
              })
            }
          />
          <div className="border w-[500px]">
            <img src={showStory.link} alt="story" className="w-full h-full" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Stories;
