import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useAsync from "hooks/useAsync";
import { Spinner } from "styles/app";

const fakeImg = "https://via.placeholder.com/250x250";
const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
const MAX_SIZE = 400000;

const UploadImage = ({ img, updatePhoto }) => {
  const [file, setFile] = useState(null);
  const [renderImg, setRenderImg] = useState(fakeImg);
  const [imgError, setImgError] = useState(null);

  const { data, isError, isSuccess, isLoading, isIdle, error, run } =
    useAsync();

  useEffect(() => {
    if (img) {
      setRenderImg(img);
    } else {
      setRenderImg(fakeImg);
    }
  }, [img]);

  const fileRef = useRef();

  function selectFile() {
    const file = fileRef.current.files && fileRef.current.files[0];

    if (!file) {
      return;
    }
    const tooLarge = file.size > MAX_SIZE;
    if (!allowedTypes.includes(file.type) || tooLarge) {
      const msg = tooLarge ? "File too large" : "not allowed type";
      setImgError(msg);
      return;
    }
    setFile(file);
  }

  async function handleFile(e) {
    if (!file || imgError) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    await run(
      axios.post("/api/upload", formData).then(async (res) => {
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        updatePhoto(res.data.file);
        setRenderImg(res.data.file);
        setFile(null);
        return res.data;
      })
    );
  }

  return (
    <div className="upload-box">
      <div className="image-box">
        <img src={renderImg} alt="fake img" />

        <label
          disabled={isLoading}
          htmlFor="photo"
          className="image-box__label"
        >
          Choose
        </label>
      </div>

      <input ref={fileRef} onChange={selectFile} type="file" id="photo" />

      <button
        onClick={handleFile}
        className="ui basic red button btn-upload"
        type="button"
      >
        Upload {isLoading && <Spinner />}
      </button>
      {file && <div>{file.name}</div>}
    </div>
  );
};

export default UploadImage;
