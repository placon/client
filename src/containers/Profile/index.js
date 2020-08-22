import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileButtonModal from "../../components/Profile/ProfileButtonModal";
import S3FileUpload from "react-s3";
import { amazonS3Url } from "../../config/config";
import amazonS3 from "../../config/amazonS3";
import changeFileName from "../../utils/changeFileName";

function ProfileContainer() {
  const [userInfo, setUserInfo] = useState();
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setUserInfo(myInfo);
  }, []);

  const onChangeProfileImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    console.log(e.target.files[0].name);
    // 파일명 랜덤값으로 변경
    const originFile = e.target.files[0];
    const newFileName = ChangeFileName(originFile.name);
    const newPostFile = new File([originFile], newFileName, {
      type: originFile.type,
    });
    amazonS3.dirName = `placon/user/${userInfo._id}`;
  };

  return (
    <>
      <ProfileHeader
        setShowImageModal={setShowImageModal}
        userInfo={userInfo}
      />
      {showImageModal && (
        <ProfileButtonModal
          setShowImageModal={setShowImageModal}
          onChangeProfileImage={onChangeProfileImage}
        />
      )}

      <div>dsf</div>
    </>
  );
}

export default ProfileContainer;
