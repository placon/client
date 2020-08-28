import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";

function Comment(props) {
  return (
    <div className="comment-component">
      <section className="profile">
        <ProfileImage size="small" imageUrl="" />
      </section>
      <section className="content">
        <div className="user-id">
          <h4>Jungwon</h4>
        </div>
        <div className="text">
          댓글 내용입니다 호호호옿옿옿옿옿오호훠훠루룰뤄
        </div>
      </section>
    </div>
  );
}

export default Comment;
