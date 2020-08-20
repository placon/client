import React, { useState, useEffect } from "react";
import PostList from "../../components/Post/PostList";
import PostWriteFormModal from "../../components/Post/PostWriteFormModal";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../lib/hooks/useInput";
import { writePostRequest } from "../../reducers/post";

function HomePage() {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [content, onChangeContent] = useInput("");
  const dispatch = useDispatch();
  const { newPost } = useSelector((state) => state.post);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(content);
    dispatch(
      writePostRequest({
        user_id: userInfo._id,
        post_context: content,
      })
    );
  };

  useEffect(() => {
    setShowWriteModal(false);
  }, [newPost]);

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setUserInfo(myInfo);
  }, []);

  return (
    <>
      {userInfo && (
        <>
          <div>
            <button
              type="button"
              onClick={() => {
                setShowWriteModal(true);
              }}
            >
              포스트 작성
            </button>
          </div>
          {showWriteModal && (
            <PostWriteFormModal
              userInfo={userInfo}
              content={content}
              onChangeContent={onChangeContent}
              onSubmit={onSubmit}
              setShowWriteModal={setShowWriteModal}
            />
          )}
          <PostList />)
        </>
      )}
    </>
  );
}

export default HomePage;
