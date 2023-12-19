import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { deleteStory, getStories, postStories } from "../../services/api/user";
import { FaPlus } from "react-icons/fa";
import CustomLoader from "../Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CustomModal from "../layout/CustomModal";
import { sendNotification } from "../../utils/notifications";
import ThemeContainer from "../layout/ThemeContainer";
import { useTheme } from "../../context/themeContext";
import { IoClose } from "react-icons/io5";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../context/authContext";
// const ALLOWED_IMAGES = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStory, setShowStory] = useState({
    show: false,
    link: "",
    message: "",
  });
  const [story, setStory] = useState<any>({
    message: "",
    image: "",
  });
  const { isThemeLight } = useTheme();

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const { authUser } = useAuth();

  const personalStory: any = stories?.find(
    (story: { userId: string }) => story.userId === authUser._id
  );

  const socialStories: any = stories?.filter(
    (story: { userId: string }) => story.userId !== authUser._id
  );

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    dispatch(startLoading());
    let res = await getStories();
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
      sendNotification("warning", "Please enter story message");
    }
    dispatch(stopLoading());
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleDelteStory = async () => {
    let res = await deleteStory();
    if (res.status === 200) {
      fetchStories();
      setShowStory({
        show: false,
        link: "",
        message: "",
      });
      sendNotification("warning", res.data.message);
    } else {
      setShowStory({
        show: false,
        link: "",
        message: "",
      });
      sendNotification("error", res?.response?.data?.message);
    }
  };

  if (isLoading) return <CustomLoader />;

  return (
    <>
      <section className="mt-10">
        <div className={`grid grid-cols-2 sm:grid-cols-12`}>
          <div className={`sm:col-span-2 `}>
            {personalStory ? (
              <>
                <div className="h-44 flex__center relative">
                  <img
                    src={personalStory?.image}
                    alt="story"
                    className="h-28 w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setShowStory({
                        show: true,
                        link: personalStory.image,
                        message: personalStory.message,
                      })
                    }
                  />
                </div>
                <p className="text-center">Your Story</p>
              </>
            ) : (
              <>
                <div key={story?._id} className="h-44 flex__center relative">
                  <div className="cursor-pointer h-28 w-28 rounded-full absolute top-1/4 left-1/4 bg-white flex__center">
                    <FaPlus size={25} onClick={() => setShowModal(true)} />
                  </div>
                </div>
                <p className="text-center">Add Story</p>
              </>
            )}
          </div>
          <div className={`sm:col-span-2 `}>
            <Slider {...settings}>
              {socialStories?.map(
                (story: { _id: string; image: string; message: string }) => {
                  return (
                    <div
                      key={story?._id}
                      className="cursor-pointer h-48 relative"
                      onClick={() =>
                        setShowStory({
                          show: true,
                          link: story.image,
                          message: story.message,
                        })
                      }
                    >
                      <img
                        src={story.image}
                        alt="story"
                        className="h-28 w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  );
                }
              )}
            </Slider>
          </div>
        </div>
      </section>

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
                  <label className="mb-4">Message</label>
                  <input
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    className={`border-b mb-10 outline-none bg-transparent text-white ${
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
            </>
          </ThemeContainer>
        </CustomModal>
      ) : null}

      {/* full preview story */}

      {showStory.show ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center">
          <IoClose
            size={22}
            className="text-white fixed top-10 right-10 cursor-pointer borer-black"
            onClick={() =>
              setShowStory({
                show: false,
                link: "",
                message: "",
              })
            }
          />
          <div className="w-[500px]">
            <p className="text-white  mb-10">{showStory.message}</p>
            <img
              src={showStory.link}
              alt="story"
              className="w-full h-full mb-10"
            />

            <button
              className="bg-white text-black px-7 py-2 rounded-lg border"
              onClick={() => handleDelteStory()}
            >
              {isLoading ? "Loading..." : "Delete Story"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Stories;
