import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import "./index.scss";
import io from "socket.io-client";
import Input from "./Input";

let socket;

function Chat(props) {
  const ENDPOINT = "localhost:3000";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    if (props.userInfo._id !== myInfo._id) {
      // TODO : 메소드 실행해야됨 채팅방 생성/조회
      socket = io(ENDPOINT);
      // 방, 아이디 세팅
    }
  }, []);
  return (
    <div className="ChatPageComponent">
      <ChatRoom />
    </div>
  );
}

export default Chat;
