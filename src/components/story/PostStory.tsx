import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUploadcareImg, postStories } from "../../services/api/user";
import { TStoryDetails } from "../../utils/types";
import { sendNotification } from "../../utils/notifications";
import { useTheme } from "../../context/themeContext";
import FileValidationBox from "../shared/FileValidationBox";
import { config } from "../../config";
import ThemeContainer from "../layout/ThemeContainer";
import { showStoryUploader } from "../../store/features/storyUploaderSlice";
import Loader from "../Loader";
import { FaCheck } from "react-icons/fa";
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import "@uploadcare/react-uploader/core.css"


const PostStory = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isThemeLight } = useTheme();

  const [story, setStory] = useState<TStoryDetails>({
    message: "",
    image: "",
  });


  const handleUploadStory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!story.message) return sendNotification("warning", "Message is required");
    storyUpload(story)
  };

  const { mutate: storyUpload, isPending: isStoryUploading } = useMutation({
    mutationFn: async (story: TStoryDetails) => {
      const response = await postStories(story);
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      dispatch(showStoryUploader(false));
      sendNotification("success", "Story uploaded successfully");
    }
    ,
    onError: (error: any) => {
      dispatch(showStoryUploader(true));
      sendNotification("error", error?.response?.data?.message);

    }
  })

  const handleGoBack = async () => {
    if (story.image) {
      const fileId = story.image.split("/")[0];
      await deleteUploadcareImg(fileId);
    }
    dispatch(showStoryUploader(false));
  };
  const handleChangeEvent = (items: { allEntries: any[]; }) => {
    const file = items.allEntries.filter((file) => file.status === 'success').map(file => file.cdnUrl)
    if (!file) return sendNotification("error", "No file selected");
    setStory({
      ...story,
      image: file[0]
    })
  };
  return (
    <ThemeContainer>
      {isStoryUploading && <Loader />}
      <form
        onSubmit={handleUploadStory}
        className="text-white border p-10 rounded-md relative"
      >
        <div className="form-control mb-6 flex flex-col">
          <label className="mb-4">Message</label>
          <input
            autoComplete="off"
            spellCheck={false}
            className={`border-b mb-10 outline-none bg-transparent text-white ${isThemeLight ? "border-black" : "border-white"
              }`}
            onChange={(event) =>
              setStory({ ...story, message: event?.target.value })
            }
          />

          <div className="flex items-center gap-x-4">
            <FileUploaderRegular
              pubkey={config.UPLOADCARE_PUBLIC_KEY}
              maxLocalFileSizeBytes={200000}
              multiple={false}
              imgOnly={true}
              sourceList="local, url, camera, dropbox"
              classNameUploader="file__uploader uc-light" onChange={handleChangeEvent}
            />
            {
              story.image &&
              <div className="bg-green-600 w-max px-4 py-2 rounded-lg capitalize text-sm flex items-center gap-x-2">
                <div className="p-1 bg-green-800 rounded-full">

                  <FaCheck className="" size={12} />
                </div>
                file uploaded</div>
            }
          </div>
        </div>
        <FileValidationBox />
        <button
          type="submit"
          className="mb-6 bg-white text-black px-7 py-2 rounded-lg border w-full text-sm mt-8 hover:bg-white/90 transition-all duration-300"
          disabled={isStoryUploading}
        >
          {isStoryUploading ? "Wait....." : "Submit"}
        </button>
        <Link to="/">
          <button
            className="bg-slate-800 text-white px-10 py-2 my-5 rounded-lg text-sm"
            onClick={handleGoBack}
          >
            Go back
          </button>
        </Link>
      </form>
    </ThemeContainer >
  );
};

export default PostStory;
