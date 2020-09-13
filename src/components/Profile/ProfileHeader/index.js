import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";
import Button from "../../ui/Button";
import { amazonS3Url } from "../../../config/config";
import { Link } from "react-router-dom";

function ProfileBox(props) {
  const { userInfo, setShowImageModal, isMe } = props;
  console.log(props);

  return (
    <>
      {userInfo && (
        <div>
          <div className="profile-box">
            <section className="image-section">
              <ProfileImage
                isMe={isMe}
                onClick={() => {
                  if (isMe) {
                    setShowImageModal(true);
                  } else {
                    return;
                  }
                }}
                imageUrl={
                  !userInfo.profile_image
                    ? `${amazonS3Url}/profile-default.png`
                    : `${amazonS3Url}/user/${userInfo._id}/${userInfo.profile_image}`
                }
              />
            </section>
            <section className="info-section">
              <div className="row">
                <h3>{userInfo.name}</h3>
                {isMe ? (
                  <Button size="small" outline>
                    프로필 편집
                  </Button>
                ) : (
                  <Link to={{ pathname: "/chat", state: { userInfo } }}>
                    <Button size="small" outline>
                      메세지
                    </Button>
                  </Link>
                )}
              </div>
              <div className="row">
                <span>
                  {userInfo.native_language} {"->"} {userInfo.target_language}
                </span>
              </div>
              <div className="row">
                <ul>
                  <li>
                    <span>게시물 3</span>
                  </li>
                  <li>
                    <span>첨삭 47</span>
                  </li>
                </ul>
              </div>
              <div className="row">33333</div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileBox;
