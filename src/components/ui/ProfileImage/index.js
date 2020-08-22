import React from "react";
import "./index.scss";

function ProfileImage({ children, size, imageUrl, ...rest }) {
  return (
    <figure
      className={`ProfileImage  ${size}`}
      title="프로필 사진 바꾸기"
      {...rest}
    >
      <img src={imageUrl} alt="프로필 사진 바꾸기" />
    </figure>
  );
}

ProfileImage.defaultProps = {
  imageUrl: "",
  size: "large",
};

export default ProfileImage;
