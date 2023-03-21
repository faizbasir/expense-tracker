import React, { useEffect, useRef, useState } from "react";

const ImageUploader = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const content = previewUrl ? (
    <p>Select A Different Profile Image</p>
  ) : (
    <p>Select a Profile Image</p>
  );

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      console.log(e.target.files);
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setFile(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
    console.log(filePickerRef);
  };

  return (
    <>
      <input
        ref={filePickerRef}
        type="file"
        accept=".jpg, .png, .jpeg"
        id={props.id}
        onChange={pickHandler}
        className="hidden"
      />
      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="chosen profile photo"
            className="rounded-full h-48 border-[1px] border-whitesmoke mx-auto"
          />
        </div>
      )}
      <button
        type="button"
        onClick={pickImageHandler}
        className="w-full bg-secondary px-[2rem] py-[0.5rem] rounded-full mr-[0.5rem] my-[0.5rem] border-2 border-[#ccc] mt-4"
      >
        {content}
      </button>
      {!isValid && previewUrl && props.errorText}
    </>
  );
};
export default ImageUploader;
