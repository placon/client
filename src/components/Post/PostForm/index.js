import React from "react";
import "./index.scss";
import Button from "../../ui/Button";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";
import { Link } from "react-router-dom";

function PostForm(props) {
  const { postData, isMyPost, onDeletePost, onUpdatePost } = props;
  const { _id, hashtags, post_context, post_images, user_id } = postData;
  const {
    gender,
    name,
    email,
    profile_image,
    native_language,
    target_language,
  } = user_id;

  return (
    <div className="post-form-container">
      <div className="profile">
        <Link to={{ pathname: "/profile", state: { email: email } }}>
          <div className="profile-image">
            <ProfileImage
              size="medium"
              imageUrl={
                !profile_image
                  ? `${amazonS3Url}/profile-default.png`
                  : `${amazonS3Url}/user/${user_id._id}/${profile_image}`
              }
            />
          </div>
        </Link>
        <div className="info">
          <div className="info-data">
            <h4>{name}</h4>
            <span>
              {native_language} {"->"} {target_language}
            </span>
          </div>
          <div className="info-button">
            <button>
              <img src={`${amazonS3Url}/post-hamburger.svg`} />
            </button>
          </div>
          <span>
            {isMyPost && (
              <Button
                size="small"
                onClick={() => {
                  onDeletePost(_id);
                }}
              >
                삭제
              </Button>
            )}
          </span>
        </div>
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
