import React, { useState, useEffect } from "react";
import "./index.scss";
import Button from "../../ui/Button";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";
import { Link } from "react-router-dom";
import CommentList from "../../Comment/CommentList";
import CorrectionModal from "../../Comment/CorrectionModal";

function PostForm(props) {
  const { postData, isMyPost, onDeletePost, onUpdatePost } = props;
  const { _id, hashtags, post_context, post_images, posted_by } = postData;
  const {
    gender,
    name,
    email,
    profile_image,
    native_language,
    target_language,
  } = posted_by;
  const [showComment, setShowComment] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [postContent, setPostContent] = useState([]);

  useEffect(() => {
    let text = post_context.replace(/(?:\r\n|\r|\n)/g, "<br>");
    let cutText = text.split("<br>");
    setPostContent(cutText);
  }, []);

  return (
    <div className="post-form-container">
      <div className="my-profile">
        <Link to={{ pathname: "/profile", state: { email: email } }}>
          <div className="profile-image">
            <ProfileImage
              size="medium"
              imageUrl={
                !profile_image
                  ? `${amazonS3Url}/profile-default.png`
                  : `${amazonS3Url}/user/${posted_by._id}/${profile_image}`
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
      <section className="post-content">
        <div className="text">
          {postContent.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
        <div className="hashtag">
          <ul className="hashtag-list">
            {hashtags &&
              hashtags.map((hashtag, idx) => <li key={idx}>#{hashtag}</li>)}
          </ul>
        </div>
      </section>
      <section className="post-content image">
        {post_images.map((postImage, idx) => (
          <figure key={idx}>
            <img
              src={`${amazonS3Url}/user/${posted_by._id}/post/${postImage}`}
            />
          </figure>
        ))}
      </section>
      <section className="post-status-bar">
        <figure className="status-icon">
          <img src={`${amazonS3Url}/heart-empty.svg`} />
        </figure>
        <figure
          className="status-icon"
          onClick={() => {
            setShowComment((prev) => !prev);
          }}
        >
          <img src={`${amazonS3Url}/comment.svg`} />
        </figure>
        <figure
          className="status-icon"
          onClick={() => {
            setShowCorrectionModal(true);
          }}
        >
          <img src={`${amazonS3Url}/correction.svg`} />
        </figure>
      </section>
      {showComment && <CommentList postId={_id} />}
      {showCorrectionModal && (
        <CorrectionModal
          setShowCorrectionModal={setShowCorrectionModal}
          postContent={postContent}
        />
      )}
    </div>
  );
}

export default PostForm;
