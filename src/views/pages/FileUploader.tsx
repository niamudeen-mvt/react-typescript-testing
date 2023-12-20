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
import { FILE_VALIDATION } from "../../utils/constants";
import FileValidationBox from "../../components/shared/FileValidationBox";

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
      const images = [];
      for (const file of acceptedFiles) {
        if (!FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type)) {
          sendNotification(
            "warning",
            `This format ${file.type} is not supported.`
          );

          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
        if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
          sendNotification("warning", `Allowed file size 200KB`);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        } else if (
          FILE_VALIDATION.ALLOWED_IMAGES.includes(file.type) &&
          file.size < FILE_VALIDATION.MAX_FILE_SIZE
        ) {
          images.push(file);
        }
      }

      if (images?.length) {
        const accepted = images.filter(
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
    <ThemeContainer themeCenter={true}>
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
        <FileValidationBox />

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
