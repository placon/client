import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";

function ChatRoom() {
  return (
    <div className="ChatRoomComponent">
      <div className="user-profile">
        <ProfileImage
          size="small"
          imageUrl={`${amazonS3Url}/profile-default.png`}
        />
      </div>
      <div className="text-field">
        <h4 className="user-id">Pretty123</h4>
        <div className="message">meessage dsafad~ ..</div>
      </div>
    </div>
  );
}

export default ChatRoom;
