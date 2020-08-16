import React, { useEffect, useState } from "react";
import "./index.scss";
import Post from "../PostForm";
import { useDispatch, useSelector } from "react-redux";
import { postListRequest } from "../../../reducers/post";

function PostList() {
  const dispatch = useDispatch();
  const { postList, hasMorePost } = useSelector((state) => state.post);
  const [pageIndex, setPageIndex] = useState(0);
  const [myId, setMyId] = useState("");

  useEffect(() => {
    setMyId(JSON.parse(window.sessionStorage.getItem("myInfo")));
  }, []);

  useEffect(() => {
    // 포스트가 더 있을 경우에만 불러오도록.
    if (hasMorePost) {
      dispatch(
        postListRequest({
          page_index: pageIndex,
          page_size: 5,
          native_language: "KR",
          target_language: "EN",
        })
      );
    }
  }, [pageIndex]);

  return (
    <>
      {postList.loading ? (
        <div>로딩중 ...</div>
      ) : (
        <div className="post-list">
          {postList.posts &&
            postList.posts.map((post, idx) => (
              <Post
                key={post._id}
                postId={post._id}
                hashtags={post.hashtags}
                postImages={post.post_images}
                content={post.post_context}
                // isMyPost={post.user_id === myId}
              />
            ))}

          <button
            type="button"
            onClick={() => {
              setPageIndex((prevState) => prevState + 1);
            }}
          >
            다음 리스트
          </button>
        </div>
      )}
    </>
  );
}

export default PostList;
