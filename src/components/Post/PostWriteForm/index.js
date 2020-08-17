import React, { useState } from "react";
import "./index.scss";
import Button from "../../UI/Button";
import S3FileUpload from "react-s3";
import amazonS3 from "../../../config/amazonS3";

function PostWriteForm(props) {
  const [images, setImages] = useState([]);
  const { content, onChangeContent, onSubmit } = props;

  const onChangeImages = (e) => {
    console.log("파일 체크", e.target.files[0]);

    S3FileUpload.uploadFile(e.target.files[0], amazonS3)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="post-write-form">
      <h4>포스트 작성</h4>
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
  );
}

export default PostWriteForm;
