import React, { useEffect, useState, useCallback } from "react";
import "./index.scss";
import Post from "../PostForm";
import { useDispatch, useSelector } from "react-redux";
import { postListRequest } from "../../../reducers/post";
import postApi from "../../../api/post";
import axios from "axios";

function PostList() {
  const dispatch = useDispatch();
  const { postList, hasMorePost } = useSelector((state) => state.post);
  const [pageIndex, setPageIndex] = useState(0);
  const [list, setList] = useState([]);
  const [myId, setMyId] = useState("");

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // console.log("Scrolltop:", scrollTop);
    // console.log("clientHeight:", clientHeight);
    // console.log("scrollHeight:", scrollHeight);
    if (scrollHeight - scrollTop === clientHeight) {
      setPageIndex((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const loadMorePosts = async () => {
      const sendingData = {
        page_index: pageIndex,
        page_size: 5,
        native_language: "KR",
        target_language: "EN",
      };
      const result = await postApi.postList(sendingData);
      if (result) {
        console.log(result.post_list);
        setList((prev) => [...prev, ...result.post_list]);
      }
    };
    loadMorePosts();
  }, [pageIndex]);

  useEffect(() => {
    setMyId(JSON.parse(window.sessionStorage.getItem("myInfo")));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const onScroll = useCallback(async () => {
  //   if (
  //     window.scrollY + document.documentElement.clientHeight >
  //     document.documentElement.scrollHeight - 50
  //   ) {
  //     console.log("sdfsdf");
  //     const result = await postApi.postList({
  //       page_index: pageIndex,
  //       page_size: 5,
  //       native_language: "KR",
  //       targetLanguage: "EN",
  //     });
  //     console.log(result);
  //   }
  // }, [hasMorePost]);

  // useEffect(() => {
  //   setMyId(JSON.parse(window.sessionStorage.getItem("myInfo")));
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, [list.length]);

  // useEffect(() => {
  //   // 포스트가 더 있을 경우에만 불러오도록.
  //   if (hasMorePost) {
  //     dispatch(
  //       postListRequest({
  //         page_index: pageIndex,
  //         page_size: 5,
  //         native_language: "KR",
  //         target_language: "EN",
  //       })
  //     );
  //   }
  // }, [pageIndex]);

  return (
    <>
      <div>
        {list &&
          list.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              hashtags={post.hashtags}
              postImages={post.post_images}
              content={post.post_context}
              // isMyPost={post.user_id === myId}
            />
          ))}
      </div>
    </>
  );
}

export default PostList;
