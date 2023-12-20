import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlus } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ThemeContainer from "../layout/ThemeContainer";
import CustomModal from "../layout/CustomModal";
import CustomLoader from "../Loader";
import { deleteStory, getStories, postStories } from "../../services/api/user";
import useWindowSize from "../../hooks/useWindowSize";
import { useTheme } from "../../context/themeContext";
import { useAuth } from "../../context/authContext";
import { FILE_VALIDATION } from "../../utils/constants";
import { formattedDate } from "../../utils/helper";
import { sendNotification } from "../../utils/notifications";

type TStory = {
  username?: string;
  type: string;
  show: boolean;
  link?: string | undefined;
  message: string;
  postDate: string;
};

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [story, setStory] = useState<any>({
    message: "",
    image: "",
  });
  const [showStory, setShowStory] = useState<TStory>({
    username: "",
    type: "",
    show: false,
    link: "",
    message: "",
    postDate: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isThemeLight } = useTheme();
  const { authUser } = useAuth();

  const windowSize = useWindowSize();

  const inputRef = useRef<HTMLInputElement>(null);

  const personalStory: any = stories?.find(
    (story: { userId: { _id: string } }) => story.userId._id === authUser._id
  );

  const socialStories: any = stories?.filter(
    (story: { userId: string }) => story.userId !== authUser._id
  );

  // fetching stories =====================
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setIsLoading(true);
    let res = await getStories();
    if (res.status === 200) {
      setStories(res?.data?.stories);
    } else {
      setStories([]);
    }
    setIsLoading(false);
  };

  // uploading image ======================
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.files) {
      const file = event?.target.files[0];

      if (!FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type)) {
        sendNotification(
          "warning",
          `This format ${file.type} is not supported.`
        );

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
        sendNotification("warning", `Allowed file size 200KB`);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else if (
        FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type) &&
        file.size < FILE_VALIDATION.MAX_FILE_SIZE
      ) {
        setStory({
          ...story,
          image: file,
        });
      }
    }
  };

  // posting story =================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (story?.message) {
      const formData = new FormData();
      if (story.image) {
        formData.append("image", story.image);
      }
      formData.append("message", story.message);
      let res = await postStories(formData);
      if (res.status === 200) {
        fetchStories();
        setShowModal(false);
        sendNotification("success", res.data.message);
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
      sendNotification("warning", "Message field is required");
    }
  };

  const handleDelteStory = async () => {
    // setIsLoading(true);
    let res = await deleteStory();
    if (res.status === 200) {
      setShowStory({
        username: "",
        type: "",
        show: false,
        link: "",
        message: "",
        postDate: "",
      });
      fetchStories();
      sendNotification("success", res.data.message);
    } else {
      setShowStory({
        username: "",
        type: "",
        show: false,
        link: "",
        message: "",
        postDate: "",
      });
      sendNotification("error", res?.response?.data?.message);
    }
    // setIsLoading(false);
  };

  // story slider settings ================
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      windowSize.width <= 546
        ? 1
        : windowSize.width >= 546 && windowSize.width <= 746
        ? 2
        : windowSize.width <= 992
        ? 3
        : socialStories.length > 4
        ? 4
        : socialStories.length,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* story section */}
      <section className="my-32">
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className={`grid grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-10`}>
            {/* personal story ================== */}
            <div
              className={` ${
                windowSize.width < 992
                  ? ""
                  : socialStories?.length > 1
                  ? "col-span-2"
                  : "col-span-2"
              }`}
            >
              {personalStory ? (
                <>
                  <div className="h-48 cursor-pointer relative">
                    {personalStory?.image ? (
                      <img
                        src={personalStory?.image}
                        alt="story"
                        className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-green-500"
                        onClick={() =>
                          setShowStory({
                            username: personalStory.userId.name,
                            type: "PERSONAL",
                            show: true,
                            link: personalStory.image,
                            message: personalStory.message,
                            postDate: personalStory.createdAt,
                          })
                        }
                      />
                    ) : (
                      // if no story image added by user showing default image
                      <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 bg-white flex__center border-4  border-green-500">
                        <RiChatHistoryFill
                          size={25}
                          onClick={() =>
                            setShowStory({
                              username: personalStory.userId.name,
                              type: "PERSONAL",
                              show: true,
                              link: "",
                              message: personalStory.message,
                              postDate: personalStory.createdAt,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // add story ================

                <div key={story?._id} className="h-48 flex__center">
                  <div className="cursor-pointer h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-white flex__center border-4 border-green-500">
                    <FaPlus
                      size={25}
                      onClick={() => setShowModal(true)}
                      className="hover:scale-110 transition-all duration-300 text-slate-600"
                    />
                  </div>
                  {/* <p className="text-xs text-center">@{authUser.name}</p> */}
                </div>
              )}
            </div>

            {/* story slider   =========================== */}
            <div
              className={` ${
                windowSize.width < 992
                  ? ""
                  : socialStories?.length === 1
                  ? "col-span-2"
                  : socialStories?.length === 2
                  ? "col-span-4"
                  : socialStories?.length === 3
                  ? "col-span-6"
                  : socialStories?.length === 4
                  ? "col-span-8"
                  : socialStories?.length === 5
                  ? "col-span-10"
                  : "col-span-10"
              }`}
            >
              <Slider {...settings}>
                {socialStories?.map(
                  (story: {
                    _id: string;
                    image: string;
                    message: string;
                    createdAt: string;
                    userId: {
                      name: string;
                    };
                  }) => {
                    return (
                      <>
                        <div
                          key={story?._id}
                          className="cursor-pointer h-44 relative"
                          onClick={() =>
                            setShowStory({
                              username: story.userId.name,
                              type: "SOCIAL",
                              show: true,
                              link: story.image,
                              message: story.message,
                              postDate: story.createdAt,
                            })
                          }
                        >
                          {story.image ? (
                            // if my social story has image
                            <img
                              src={story.image}
                              alt="story"
                              className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300"
                            />
                          ) : (
                            // if my social story has no image then showing default icon

                            <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 bg-white flex__center">
                              <RiChatHistoryFill
                                size={25}
                                onClick={() =>
                                  setShowStory({
                                    username: personalStory.userId.name,
                                    type: "SOCIAL",
                                    show: true,
                                    link: "",
                                    message: personalStory.message,
                                    postDate: personalStory.createdAt,
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-center">
                          @{story.userId.name}
                        </p>
                      </>
                    );
                  }
                )}
              </Slider>
            </div>
          </div>
        )}
      </section>

      {/* story posting form */}
      {showModal ? (
        <CustomModal showModal={showModal}>
          <ThemeContainer themeCenter={true}>
            {isLoading ? <CustomLoader /> : null}
            <>
              <form
                onSubmit={handleSubmit}
                className="text-white border p-10 rounded-md relative "
              >
                <div className="form-control mb-6 flex flex-col">
                  <label className="mb-4">Message</label>
                  <input
                    autoComplete="off"
                    spellCheck={false}
                    className={`border-b mb-10 outline-none bg-transparent text-white ${
                      isThemeLight ? "border-black" : "border-white"
                    }`}
                    onChange={(event) =>
                      setStory({ ...story, message: event?.target.value })
                    }
                  />
                  <input
                    type="file"
                    className="border py-2 rounded-md px-2"
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </div>

                {/* file upload validation message */}
                <div className="mb-8">
                  <span className="text-sm">
                    Allowed JPG, JPEG, WEBP, PNG. Max file size 200KB.
                  </span>
                  <span className="text-sm">
                    If your upload image is larger than 200KB allowed, reduce
                    the size of the image if you want to reduce the size of the
                    image click this link.
                  </span>
                  {`  `}
                  <a
                    href="https://picresize.com/"
                    className="text-sm pointer-events-auto font-semibold"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Click Here To Convert
                  </a>
                </div>

                <button
                  type="submit"
                  className="mb-6 bg-white text-black px-7 py-2 rounded-lg border w-full text-sm"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
                <Link to="/">
                  <button
                    className="bg-slate-800 text-white px-10 py-2 my-5 rounded-lg text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Go back
                  </button>
                </Link>
              </form>
            </>
          </ThemeContainer>
        </CustomModal>
      ) : null}

      {/* full preview story */}
      {showStory.show ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center ">
          <IoClose
            size={22}
            className="text-white fixed top-10 right-10 cursor-pointer"
            onClick={() =>
              setShowStory({
                username: "",
                type: "",
                show: false,
                link: "",
                message: "",
                postDate: "",
              })
            }
          />
          <div className="w-[500px] flex  flex-col gap-y-5 border p-5 bg-white text-black">
            <div className="flex gap-x-8">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-center text-sm">@{showStory.username}</h1>
                {showStory.type === "PERSONAL" ? (
                  <MdDelete
                    size={22}
                    className="hover:scale-110 transition-all duration-300 cursor-pointer"
                    onClick={() => handleDelteStory()}
                  />
                ) : null}
              </div>
            </div>

            <span className=" text-xs">
              {formattedDate(new Date(showStory.postDate))}
            </span>

            {showStory.link ? (
              <div className="h-[400px]">
                <img
                  src={showStory.link}
                  alt="story"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : null}
            <p className="text-sm capitalize">{showStory.message}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Stories;
