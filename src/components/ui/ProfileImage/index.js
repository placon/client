import React from "react";
import "./index.scss";
import classNames from "classnames";

function ProfileImage({ children, size, imageUrl, isMe, ...rest }) {
  return (
    <figure
      className={classNames("ProfileImage", size, { isMe })}
      title="프로필 사진 바꾸기"
      {...rest}
    >
      <img src={imageUrl} />
      {/* <img src={imageUrl} alt="프로필 사진 바꾸기" /> */}
    </figure>
  );
}

ProfileImage.defaultProps = {
  imageUrl: "",
  size: "large",
};

export default ProfileImage;
