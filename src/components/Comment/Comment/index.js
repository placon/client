import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";

function Comment(props) {
  const {
    comment_context,
    commented_by,
    register_date,
    _id,
  } = props.commentData;
  const {
    name,
    native_language,
    target_language,
    profile_image,
  } = commented_by;

  return (
    <div className="comment-component">
      <section className="profile">
        <ProfileImage
          size="small"
          imageUrl={`${amazonS3Url}/user/${commented_by._id}/${profile_image}`}
        />
      </section>
      <section className="content">
        <div className="user-id">
          <h4>Jungwon</h4>
        </div>
        <div className="text">{comment_context}</div>
      </section>
    </div>
  );
}

export default Comment;
