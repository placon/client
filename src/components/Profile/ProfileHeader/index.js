import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";
import Button from "../../ui/Button";

function ProfileBox(props) {
  const { userInfo, setShowImageModal } = props;
  return (
    <div>
      <div className="profile-box">
        <section className="image-section">
          <ProfileImage
            onClick={() => {
              setShowImageModal(true);
            }}
            imageUrl={
              "https://placon-photo-bucket.s3.ap-northeast-2.amazonaws.com/placon/avatar.jpg"
            }
          />
        </section>
        <section className="info-section">
          <div className="row">
            <h3>JUNGWON</h3>
            <Button size="small" outline>
              프로필 편집
            </Button>
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
  );
}

export default ProfileBox;
