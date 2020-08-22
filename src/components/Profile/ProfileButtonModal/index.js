import React from "react";
import Button from "../../ui/Button";
import "./index.scss";

function ProfileButtonModal(props) {
  const { setShowImageModal, onChangeProfileImage } = props;
  return (
    <div className="profile-button-modal">
      <div className="inner">
        <h4>프로필 사진 변경</h4>
        <ul className="button-list">
          <li>
            <input
              type="file"
              id="profile-image-file"
              onChange={onChangeProfileImage}
            />
            <div className="change-profile">
              <label htmlFor="profile-image-file">프로필 사진 업로드</label>
            </div>
          </li>
          <li>
            <Button fullWidth outline style={{ borderBottom: "0px" }}>
              프로필 사진 삭제
            </Button>
          </li>
          <li>
            <Button
              fullWidth
              outline
              onClick={() => {
                setShowImageModal(false);
              }}
            >
              취소
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButtonModal;
