import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import ThemeContainer from "../../components/layout/ThemeContainer";
import api from "../../utils/axios";
import { sendNotification } from "../../utils/notifications";
import { deleteImage, getFiles } from "../../services/api/user";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import CustomLoader from "../../components/Loader";

const ALLOWED_IMAGES = ["image/jpg", "image/png", "image/jpeg", "image/avif"];

const Test = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Filter out the accepted files

      const isImageNoteAllowed = acceptedFiles.some(
        (file) => !ALLOWED_IMAGES.includes(file.type)
      );

      if (isImageNoteAllowed) {
        sendNotification("warning", "This image format not allowed");
      } else {
        const accepted = acceptedFiles.filter(
          (file) =>
            !fileRejections.find((rejectedFile) => rejectedFile.file === file)
        );
        setImages(accepted);

        const previewUrls = accepted.map((file) => URL.createObjectURL(file));
        setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
      }
    },
    []
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  const handleUpload = async () => {
    try {
      dispatch(startLoading());
      if (images?.length) {
        const formData = new FormData();
        for (const image of images) {
          formData.append("image", image);
        }
        let res = await api.post("/auth/files/upload", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          sendNotification("warning", res.data.message);
          setImages([]);
          setPreviews([]);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
      } else {
        sendNotification("warning", "Please select and image");
      }
    } catch (error: any) {
      sendNotification("warning", error?.response?.data?.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <ThemeContainer>
      {isLoading ? <CustomLoader /> : null}
      <>
        <div
          {...getRootProps()}
          className={`border min-h-[300px] p-5 ${
            previews?.length === 0 ? "flex__center text-white" : ""
          }`}
        >
          <input {...getInputProps()} ref={inputRef} />
          {previews?.length ? (
            <div className="grid grid-cols-6 gap-3">
              {previews?.map((file) => {
                return (
                  <div className="h-24 mx-auto">
                    <img src={file} alt="preview" className="h-full" />
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
        <button
          className="bg-white text-black px-10 py-2 my-5 rounded-lg"
          onClick={handleUpload}
        >
          Upload
        </button>
      </>
    </ThemeContainer>
  );
};

export default Test;
