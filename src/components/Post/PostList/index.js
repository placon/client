import React from "react";
import "./index.scss";
import Post from "../PostForm";

function PostList() {
  return (
    <div className="post-list">
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default PostList;
