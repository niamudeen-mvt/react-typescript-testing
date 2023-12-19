import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import ThemeContainer from "../../components/layout/ThemeContainer";
import { sendNotification } from "../../utils/notifications";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import CustomLoader from "../../components/Loader";
import { Link } from "react-router-dom";
import { uploadFiles } from "../../services/api/user";

const ALLOWED_IMAGES = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

const FileUploader = ({
  setShowModal,
  setUserImages,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setUserImages: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const isImageNoteAllowed = acceptedFiles.some(
        (file) => !ALLOWED_IMAGES.includes(file.type)
      );

      if (isImageNoteAllowed) {
        sendNotification("warning", "This format is not supported");
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
    dispatch(startLoading());
    if (images?.length) {
      const formData = new FormData();
      for (const image of images) {
        formData.append("image", image);
      }
      let res = await uploadFiles(formData);

      if (res.status === 200) {
        setUserImages(res?.data?.images?.images);
        setShowModal(false);
        sendNotification("success", res.data.message);
        setImages([]);
        setPreviews([]);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        sendNotification("error", res?.response?.data?.message);
        setImages([]);
        setPreviews([]);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    } else {
      setShowModal(true);
      sendNotification("warning", "Please select an image");
    }
    dispatch(stopLoading());
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
          Allowed JPG, JPEG, WEBP, PNG. Max file size 200KB.
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

export default FileUploader;
