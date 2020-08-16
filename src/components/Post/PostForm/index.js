import React from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { deletePostRequest, updatePostRequest } from "../../../reducers/post";
import Button from "../../ui/Button";

function PostForm(props) {
  const { postId, content, postImages, hashtags, isMyPost = true } = props;
  const dispatch = useDispatch();

  // 포스트 삭제
  const onRemovePost = () => {
    dispatch(
      deletePostRequest({
        postId,
      })
    );
  };

  // 포스트 수정
  const onUpdatePost = () => {
    dispatch(
      updatePostRequest({
        postId,
      })
    );
  };

  return (
    <div className="post-form-container">
      <div className="profile">
        여기에 사용자 정보
        {isMyPost && (
          <button size="small" onClick={onRemovePost}>
            삭제
          </button>
        )}
      </div>
      <div className="content">
        <div className="text">{content}</div>
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
