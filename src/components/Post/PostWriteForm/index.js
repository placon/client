import React, { useState } from "react";
import "./index.scss";
import Button from "../../UI/Button";

function PostWriteForm() {
  const onChangeImages = (e) => {
    const [images, setImages] = useState([]);
    setImages(e.target.files);
    console.log("파일 체크", e.target.files);
  };

  return (
    <div className="post-write-form">
      <h4>포스트 작성</h4>
      <div className="data-area">
        <form>
          <textarea />
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
