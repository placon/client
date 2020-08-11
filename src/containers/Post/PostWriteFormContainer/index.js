import React from "react";
import PostWriteForm from "../../../components/Post/PostWriteForm";
import useInput from "../../../lib/hooks/useInput";

function PostWriteFormContainer() {
  const [content, onChangeContent] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(content);
  };

  return (
    <>
      <PostWriteForm />
    </>
  );
}

export default PostWriteFormContainer;
