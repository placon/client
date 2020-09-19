import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import "./index.scss";

function Chat(props) {
  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    if (props.userInfo._id !== myInfo._id) {
      // TODO : 메소드 실행해야됨 채팅방 생성/조회
    }
  }, []);
  return (
    <div className="ChatPageComponent">
      <ChatRoom />
    </div>
  );
}

export default Chat;
