import React, { useEffect, useState, useCallback } from "react";
import "./index.scss";
import Post from "../PostForm";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../api/post";
import { deletePostRequest, updatePostRequest } from "../../../reducers/post";

function PostList() {
  const dispatch = useDispatch();
  const { deletedPost, updatedPost } = useSelector((state) => state.post);

  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);
  const [myId, setMyId] = useState("");

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (Math.floor(scrollHeight - scrollTop) === clientHeight) {
      setPageIndex((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!hasMore) {
      return;
    }
    const page_size = 5; // 몇 개씩 불러올건지
    const loadMorePosts = async () => {
      const sendingData = {
        page_index: pageIndex,
        page_size,
        native_language: "KR",
        target_language: "EN",
      };
      const result = await postApi.postList(sendingData);
      console.log(result.display_info);
      if (result) {
        setList((prev) => [...prev, ...result.display_info]);
        if (result.display_info.length < page_size) {
          setHasMore(false);
        }
      }
    };
    loadMorePosts();
  }, [pageIndex, deletedPost, updatedPost]);

  useEffect(() => {
    setMyId(JSON.parse(window.sessionStorage.getItem("myInfo")));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 포스트 삭제
  const onDeletePost = (postId) => {
    dispatch(
      deletePostRequest({
        postId,
      })
    );
    setList(list.filter((post) => post._id !== postId));
  };

  // 포스트 수정
  const onUpdatePost = (postId) => {
    dispatch(
      updatePostRequest({
        postId,
      })
    );
  };

  return (
    <>
      <div>
        {list &&
          list.map((post, idx) => (
            <Post
              key={idx}
              postId={post._id}
              hashtags={post.hashtags}
              postImages={post.post_images}
              content={post.post_context}
              onDeletePost={onDeletePost}
              onUpdatePost={onUpdatePost}
              // isMyPost={post.user_id === myId}
            />
          ))}
      </div>
    </>
  );
}

export default PostList;
