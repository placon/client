import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import "./index.scss";
import io from "socket.io-client";
import Input from "./Input";
import chatApi from "../../api/chat";
import Messages from "../Messages";
import Message from "../Messages/Message";

let socket;

function Chat(props) {
  const ENDPOINT = "/api";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    const myInfoByStorage = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(myInfoByStorage);
    // socket = io.connect("localhost:3000", {
    //   path: "/socket.io",
    // });
    // console.log("socket :", socket);
    socket = io("localhost:3000", {
      path: "/socket.io",
    });
  }, []);

  useEffect(() => {
    let page_index = 0;
    let page_size = 5;

    const getMessageRoomList = async () => {
      const data = await chatApi.getMessageRoomList({
        page_index,
        page_size,
      });
      console.log("sdfdsf", data.room_list);
      if (data) {
        setRooms(data.room_list);
      }
    };
    getMessageRoomList();
  }, []);
  return (
    <div className="ChatPageComponent">
      <div className="room-list">
        {rooms.map((room, idx) => (
          <ChatRoom key={idx} users={room.users} myInfo={myInfo} />
        ))}
      </div>
      <div className="chat-screen">대화 주고받기 메세지 전송 등등</div>
    </div>
  );
}

export default Chat;
