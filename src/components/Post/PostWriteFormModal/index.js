import React, { useState } from "react";
import "./index.scss";
import Button from "../../UI/Button";
import S3FileUpload from "react-s3";
import amazonS3 from "../../../config/amazonS3";
import { amazonS3Url } from "../../../config/config";

function PostWriteFormModal(props) {
  const [images, setImages] = useState([]);
  const { content, onChangeContent, onSubmit, setShowWriteModal } = props;

  const onChangeImages = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    console.log("파일 체크", e.target.files[0]);
    amazonS3.dirName = "placon";

    S3FileUpload.uploadFile(e.target.files[0], amazonS3)
      .then((data) => {
        console.log(data);
        var uploadResult = {
          key: data.key,
          location: data.location,
        };
        setImages((prev) => [...prev, uploadResult]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="postFormModalWrapper">
      <div className="post-write-modal">
        <div className="modal-head">
          <h4>포스트 작성</h4>
          <figure
            className="close-button"
            onClick={() => {
              setShowWriteModal(false);
            }}
          >
            <img src={`${amazonS3Url}/component/close-button.png`} />
          </figure>
        </div>

        <div className="data-area">
          <form onSubmit={onSubmit}>
            <textarea value={content} onChange={onChangeContent} />
            <div className="image-list">
              {images &&
                images.map((image, idx) => (
                  <span className="image-wrapper" key={idx}>
                    <div className="image-item">
                      <img src={image.location} />
                    </div>
                  </span>
                ))}
            </div>
            <div className="icon-list">
              <input
                type="file"
                // name="file"
                id="file"
                className="inputfile"
                onChange={onChangeImages}
              />
              <div>
                <label htmlFor="file">파일 선택</label>
              </div>

              {/* 이미지
              <span>해쉬태그</span> */}
            </div>
            <div className="submit">
              <Button type="submit" size="small">
                작성
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostWriteFormModal;
