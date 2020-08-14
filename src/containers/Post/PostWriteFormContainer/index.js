import React, { useEffect } from "react";
import PostWriteForm from "../../../components/Post/PostWriteForm";
import useInput from "../../../lib/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { writePostRequest } from "../../../reducers/post";

function PostWriteFormContainer(props) {
  const [content, onChangeContent] = useInput("");
  const dispatch = useDispatch();
  const { newPost } = useSelector((state) => state.post);
  console.log(props);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(content);
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));

    dispatch(
      writePostRequest({
        user_id: myInfo._id,
        post_context: content,
      })
    );
  };

  useEffect(() => {
    if (newPost.post) {
      alert("포스트가 성공적으로 등록되었습니다.");
      props.history.push("/");
    }
  }, [newPost]);

  return (
    <>
      <PostWriteForm
        onSubmit={onSubmit}
        content={content}
        onChangeContent={onChangeContent}
      />
    </>
  );
}

export default PostWriteFormContainer;
