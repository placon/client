import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";

function ChatRoom(props) {
  const { users, myInfo, onClickRoom, roomId } = props;
  const sender = users[0]._id !== myInfo._id ? users[0] : users[1];
  // console.log(users, myInfo);
  return (
    <div
      className="ChatRoomComponent"
      onClick={() => {
        onClickRoom(roomId);
      }}
    >
      <div className="user-profile">
        <ProfileImage
          size="small"
          imageUrl={`${amazonS3Url}/user/${sender._id}/${sender.profile_image}`}
        />
      </div>
      <div className="text-field">
        <h4 className="user-id">{sender.name}</h4>
        <div className="message">meessage dsafad~ ..</div>
      </div>
    </div>
  );
}

export default ChatRoom;
