import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileButtonModal from "../../components/Profile/ProfileButtonModal";
import S3FileUpload from "react-s3";
import amazonS3 from "../../config/amazonS3";
import ChangeFileName from "../../utils/changeFileName";
import UserApi from "../../api/user";
import { userInfoRequest } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/Post/PostList";

function ProfileContainer(props) {
  const { email } = props;
  const [myInfo, setMyInfo] = useState();
  const [showImageModal, setShowImageModal] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(myInfo);

    // 클릭해서 들어온  userId로 유저 상세정보 요청
    dispatch(
      userInfoRequest({
        email,
      })
    );
  }, []);

  const onChangeProfileImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    // 파일명 랜덤값으로 변경
    const originFile = e.target.files[0];
    var LengthOfFileName = originFile.name.length; // 파일명의 길이
    var lastDotIndex = originFile.name.lastIndexOf("."); // 확장자를 의미하는 .의 위치
    var fileExt = originFile.name
      .substring(lastDotIndex, LengthOfFileName)
      .toLowerCase(); // 파일 "." + 확장자 추출 후 소문자로 변경
    var originFileName = originFile.name.substring(0, lastDotIndex);
    var newFileName = ChangeFileName(originFileName) + fileExt;

    const newImageFile = new File([originFile], newFileName, {
      type: originFile.type,
    });
    amazonS3.dirName = `placon/user/${myInfo._id}`;

    S3FileUpload.uploadFile(newImageFile, amazonS3)
      .then((data) => {
        console.log("업로드 된 데이터 : ", data);
        setMyInfo({ ...myInfo, profile_image: newFileName });
      })
      .catch((err) => {
        console.log(err);
      });

    const sendImageRequest = async () => {
      const result = await UserApi.uploadUserImage({
        _id: userInfo._id,
        profile_image: newFileName,
      });
      console.log(result);
    };
    sendImageRequest();
    window.sessionStorage.setItem("myInfo", JSON.stringify(myInfo));

    window.location.reload();
  };

  return (
    <>
      {userInfo && myInfo && (
        <>
          <ProfileHeader
            setShowImageModal={setShowImageModal}
            userInfo={userInfo}
            isMe={myInfo._id === userInfo._id}
          />
          <PostList isProfilePage={true} profileUser={userInfo} />

          {showImageModal && (
            <ProfileButtonModal
              setShowImageModal={setShowImageModal}
              onChangeProfileImage={onChangeProfileImage}
            />
          )}
        </>
      )}
    </>
  );
}

export default ProfileContainer;
