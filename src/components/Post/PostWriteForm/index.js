import React from "react";
import "./index.scss";
import Button from "../../UI/Button";

function PostWriteForm() {
  return (
    <div className="post-write-form">
      <h4>포스트 작성</h4>
      <div className="data-area">
        <form>
          <textarea />
          <div className="icon-list">
            <span>이미지</span>
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
