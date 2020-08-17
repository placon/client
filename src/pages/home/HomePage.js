import React, { useEffect, useCallback } from "react";
import PostList from "../../components/Post/PostList";
import Home from "../../components/home";

function HomePage() {
  return (
    <>
      <Home />
      <PostList />
    </>
  );
}

export default HomePage;
