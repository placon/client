import React, { useState, useEffect } from "react";
import "./index.scss";
import Button from "../../ui/Button";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";
import { Link } from "react-router-dom";
import CommentList from "../../Comment/CommentList";
import { postLikeRequest } from "../../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

function PostForm(props) {
  const { postData, isMyPost, onDeletePost, onUpdatePost, myInfo } = props;
  const {
    _id,
    hashtags,
    post_context,
    post_images,
    posted_by,
    like_users,
  } = postData;
  // console.log(postData);
  const {
    gender,
    name,
    email,
    profile_image,
    native_language,
    target_language,
  } = posted_by;
  const [showComment, setShowComment] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const dispatch = useDispatch();
  const { likePostId, likeUsers, isLike } = useSelector((state) => state.post);

  const onClickLike = () => {
    dispatch(
      postLikeRequest({
        post_id: _id,
      })
    );
  };

  useEffect(() => {
    setLikeCount(like_users.length);
    if (like_users.includes(myInfo._id)) {
      setIsRed(true);
    } else {
      setIsRed(false);
    }
  }, [likePostId, likeUsers]);

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
        <div className="text">{post_context}</div>
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
        <figure className="status-icon" onClick={onClickLike}>
          {(likeUsers.includes(myInfo._id) && likePostId === _id && isLike) ||
          like_users.includes(myInfo._id) ? (
            <img src={`${amazonS3Url}/fullheart.svg`} />
          ) : (
            <img src={`${amazonS3Url}/emptyheart.svg`} />
          )}
        </figure>
        <span className="number-data">{like_users.length}</span>
        <figure
          className="status-icon"
          onClick={() => {
            setShowComment((prev) => !prev);
          }}
        >
          <img src={`${amazonS3Url}/comment.svg`} />
        </figure>
        {/* <span className="number-data">{postData.annotation_users.length}</span> */}
      </section>
      {showComment && <CommentList postId={_id} />}
    </div>
  );
}

export default PostForm;
