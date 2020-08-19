import React from "react";
import "./index.scss";

function PostForm(props) {
  const { postData, isMyPost = true, onDeletePost, onUpdatePost } = props;
  const {
    _id,
    hashtags,
    name,
    natvie_language,
    post_context,
    post_images,
    profile_image,
    profile_text,
    target_language,
    user_id,
  } = postData;

  return (
    <div className="post-form-container">
      <div className="profile">
        여기에 사용자 정보
        {isMyPost && (
          <button
            size="small"
            onClick={() => {
              onDeletePost(postId);
            }}
          >
            삭제
          </button>
        )}
      </div>
      <div className="content">
        <div className="text">{post_context}</div>
        <div className="hashtag">
          <ul className="hashtag-list">
            {hashtags &&
              hashtags.map((hashtag, idx) => <li key={idx}>#{hashtag}</li>)}
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
