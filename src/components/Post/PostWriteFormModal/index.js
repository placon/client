import React, { useState } from "react";
import "./index.scss";
import Button from "../../UI/Button";
import S3FileUpload from "react-s3";
import amazonS3 from "../../../config/amazonS3";
import { amazonS3Url } from "../../../config/config";

function PostWriteFormModal(props) {
  const [images, setImages] = useState([]);
  const { content, onChangeContent, onSubmit } = props;

  const onChangeImages = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    console.log("파일 체크", e.target.files[0]);
    amazonS3.dirName = "placon";
    console.log(amazonS3);

    S3FileUpload.uploadFile(e.target.files[0], amazonS3)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="postFormModalWrapper">
      <div className="post-write-modal">
        <h4>
          포스트 작성 <img src={`${amazonS3Url}close-button.png`} />
        </h4>
        <div className="data-area">
          <form onSubmit={onSubmit}>
            <textarea value={content} onChange={onChangeContent} />
            <div className="icon-list">
              <input type="file" onChange={onChangeImages} />
              이미지
              <span>해쉬태그</span>
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
