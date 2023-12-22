const FileValidationBox = () => {
  return (
    <div>
      <p className="text-white">
        Note: Image upload feature is disabled temporary*
      </p>
      <span className="text-sm">
        Allowed JPG, JPEG, WEBP, PNG. Max file size 200KB.
      </span>
      <span className="text-sm">
        If your upload image is larger than 200KB allowed, reduce the size of
        the image if you want to reduce the size of the image click this link.
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
  );
};

export default FileValidationBox;
