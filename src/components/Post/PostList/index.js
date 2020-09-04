import React, { useEffect, useState, useCallback } from "react";
import "./index.scss";
import Post from "../PostForm";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../api/post";
import { deletePostRequest, updatePostRequest } from "../../../reducers/post";

function PostList(props) {
  const dispatch = useDispatch();
  const { isProfilePage, profileUser } = props;
  const { deletedPost, updatedPost, newPost } = useSelector(
    (state) => state.post
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);
  const [myInFo, setMyInFo] = useState();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (Math.floor(scrollHeight - scrollTop) <= clientHeight + 0) {
      setPageIndex((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!hasMore) {
      return;
    }
    if (myInFo) {
      const page_size = 5; // 몇 개씩 불러올건지
      const loadMorePosts = async () => {
        const sendingData = {
          page_index: pageIndex,
          page_size,
          native_language: myInFo.native_language,
          target_language: myInFo.target_language,
        };

        let result = null;
        if (isProfilePage && profileUser) {
          sendingData.user_id = profileUser._id;
          result = await postApi.userPostList(sendingData);
        } else {
          result = await postApi.postList(sendingData);
        }

        if (result) {
          setList((prev) => [...prev, ...result.display_info]);
          if (result.display_info.length < page_size) {
            setHasMore(false);
          }
        }
      };
      loadMorePosts();
    }
  }, [pageIndex, deletedPost, updatedPost, myInFo, isProfilePage]);

  useEffect(() => {
    let info = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInFo(info);
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
    <div className="post-list-container">
      <>
        {list &&
          myInFo &&
          list.map((post, idx) => (
            <Post
              key={idx}
              postData={post}
              onDeletePost={onDeletePost}
              onUpdatePost={onUpdatePost}
              isMyPost={post.posted_by._id === myInFo._id}
              myInfo={myInFo}
            />
          ))}
      </>
    </div>
  );
}

export default PostList;
