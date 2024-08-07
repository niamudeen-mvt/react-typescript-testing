import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TStoryDetails } from "../../utils/types";
import { deleteUploadcareImg, postStories } from "../../services/api/user";
import { sendNotification } from "../../utils/notifications";
import { FILE_VALIDATION } from "../../utils/constants";
import { useTheme } from "../../context/themeContext";
import FileValidationBox from "../shared/FileValidationBox";
import { BaseOptions, base, info } from "@uploadcare/upload-client";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { config } from "../../config";
import { useQueryClient } from "@tanstack/react-query";
import ThemeContainer from "../layout/ThemeContainer";
import { showStoryUploader } from "../../store/features/storyUploaderSlice";

const VALIDATE_FILE = (file: any) => {
  if (!file) return;
  if (!FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type)) {
    sendNotification("warning", `This format ${file.type} is not supported.`);
    return false;
  } else if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
    sendNotification("warning", `Allowed file size 200KB`);
    return false;
  } else {
    return true;
  }
};

const PostStory = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isThemeLight } = useTheme();
  const [story, setStory] = useState<TStoryDetails>({
    message: "",
    image: "",
  });
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  // uploading image ======================

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.files) {
      const file = event.target.files[0];

      // checking the file type ==========================
      if (!FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type)) {
        sendNotification(
          "warning",
          `This format ${file.type} is not supported.`
        );

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
        // checking the size of file ===================
        sendNotification("warning", `Allowed file size 200KB`);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else if (
        FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type) &&
        file.size < FILE_VALIDATION.MAX_FILE_SIZE
      ) {
        // if respective file met above conditions then uploading file to uploadcare
        const publicKey: string | undefined = config.UPLOADCARE_PUBLIC_KEY;
        if (publicKey) {
          const options: BaseOptions = {
            publicKey,
            store: "auto",
            metadata: {
              subsystem: "uploader",
            },
          };
          dispatch(startLoading());
          const result = await base(file, options);
          // upload done and now fetching file info from uploadcare
          if (result) {
            const fileDetails = await info(result.file, {
              publicKey,
            });
            dispatch(stopLoading());
            setStory({
              ...story,
              image: `${fileDetails.fileId}/${fileDetails.filename}`,
            });
          }
        }
      }
    }
  };

  // posting story =================

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startLoading());
    if (story.message !== "") {
      let res = await postStories(story);

      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["stories"] });
        dispatch(showStoryUploader(false));
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
      dispatch(showStoryUploader(true));
      sendNotification("warning", "Message field is required");
    }
    dispatch(stopLoading());
  };

  const handleGoBackToStories = async () => {
    if (story.image) {
      const fileId = story.image.split("/")[0];
      await deleteUploadcareImg(fileId);
    }
    dispatch(showStoryUploader(false));
    setStory({
      message: "",
      image: "",
    });
  };

  return (
    <ThemeContainer>
      <form
        onSubmit={handleSubmit}
        className="text-white border p-10 rounded-md relative"
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
        <FileValidationBox />
        <button
          type="submit"
          className="mb-6 bg-white text-black px-7 py-2 rounded-lg border w-full text-sm mt-8 hover:bg-white/90 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Wait....." : "Submit"}
        </button>
        <Link to="/">
          <button
            className="bg-slate-800 text-white px-10 py-2 my-5 rounded-lg text-sm"
            onClick={handleGoBackToStories}
            disabled={isLoading}
          >
            Go back
          </button>
        </Link>
      </form>
    </ThemeContainer>
  );
};

export default PostStory;
