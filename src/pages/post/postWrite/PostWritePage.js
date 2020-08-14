import React, { useEffect } from "react";
import PostWriteFormContainer from "../../../containers/Post/PostWriteFormContainer";

function PostWritePage(props) {
  console.log("흠흠", props);
  return (
    <>
      <PostWriteFormContainer props={props} />
    </>
  );
}

export default PostWritePage;
