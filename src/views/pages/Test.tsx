import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
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
import { Link } from "react-router-dom";

const ALLOWED_IMAGES = ["image/jpg", "image/png", "image/jpeg", "image/avif"];

const Test = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
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
          setShowModal(false);
          sendNotification("warning", res.data.message);
          setImages([]);
          setPreviews([]);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
      } else {
        setShowModal(true);
        sendNotification("warning", "Please select and image");
      }
    } catch (error: any) {
      sendNotification("error", error?.response?.data?.message);
      setImages([]);
      setPreviews([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
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
                    <img src={file} alt="preview" className="h-full w-full" />
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
          Allowed JPG, PNG. Max file size 200KB.
        </span>
        <br />
        <span className="text-sm italic font-Montserrat">
          If your upload image is larger than 200KB allowed, reduce the size of
          the image if you want to reduce the size of the image click this link.
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
        </div>
      </>
    </ThemeContainer>
  );
};

export default Test;
