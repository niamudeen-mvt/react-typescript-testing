import React, { useCallback, useRef, useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import ThemeContainer from "../../components/layout/ThemeContainer";
import api from "../../utils/axios";

const Test = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Filter out the accepted files
      const accepted = acceptedFiles.filter(
        (file) =>
          !fileRejections.find((rejectedFile) => rejectedFile.file === file)
      );
      setImages(accepted);

      const previewUrls = accepted.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
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
      const formData = new FormData();
      for (const image of images) {
        formData.append("image", image);
      }
      let res = await api.post("/auth/upload", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        // Clear input value after uploading
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setImages([]); // Clear images state after uploading
        setPreviews([]); // Clear previews state after uploading
      }
      // Handle the response as needed
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <ThemeContainer>
      <>
        <div {...getRootProps()} className="border min-h-[300px] flex__center">
          <input {...getInputProps()} ref={inputRef} />
          {isDragActive ? (
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

        <div className="grid grid-cols-4 gap-3">
          {previews?.map((file) => {
            return <img src={file} alt="preview" />;
          })}
        </div>
      </>
    </ThemeContainer>
  );
};

export default Test;
