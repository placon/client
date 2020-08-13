import React from "react";
import "./index.scss";

function PostForm(props) {
  // const {userInfo, content, images, hashtags, like} = props;

  return (
    <div className="post-form-container">
      <div className="profile">여기에 사용자 정보</div>
      <div className="content">
        <div className="text">
          여기에 내용이 입력된다.여기에 내용이 입력된다.여기에 내용이
          입력된다.여기에 내용이 입력된다.여기에 내용이 입력된다.여기에 내용이
          입력된다.
        </div>
        <div className="hashtag">
          <ul className="hashtag-list">
            <li>#일상회화</li>
            <li>#맞춤법</li>
            <li>#존댓말</li>
          </ul>
        </div>
      </div>
      <div className="content image">
        <figure>이미지1</figure>
        <figure>이미지2</figure>
        <figure>이미지3</figure>
      </div>
    </div>
  );
}

export default PostForm;
