import React, { useState, useEffect } from "react";
import PostList from "../../components/Post/PostList";
import PostWriteFormModal from "../../components/Post/PostWriteFormModal";
import "../../scss/home.scss";
import Button from "../../components/ui/Button";

function HomePage() {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setUserInfo(myInfo);
  }, []);

  return (
    <>
      {userInfo && (
        <>
          <div className="post-write-button">
            <Button
              outline
              fullWidth
              type="button"
              onClick={() => {
                setShowWriteModal(true);
              }}
            >
              질문하는 것을 두려워하지 말자!
            </Button>
          </div>
          {showWriteModal && (
            <PostWriteFormModal
              userInfo={userInfo}
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
