import React, {useRef, useState} from "react";
import Button from "../shared/UIElements/Button"

const ImageUploader = (props) => {
    const filePickerRef = useRef()
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState()

    const pickHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            
        }
     }
    
    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    return (
        <>
            <input ref={filePickerRef} type="file" accept=".jpg, .png, .jpeg" id={props.id} onChange={ pickHandler} className="hidden"/>
            <button type="button" onClick={pickImageHandler} className="bg-secondary px-[2rem] py-[0.5rem] rounded-full mr-[0.5rem] my-[0.5rem] border-2 border-[#ccc]">Pick Image</button>
        </>
    )
}
export default ImageUploader