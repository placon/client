import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import "./index.scss";
import io from "socket.io-client";
import Input from "./Input";
import chatApi from "../../api/chat";

let socket;

function Chat(props) {
  const ENDPOINT = "/api";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    socket = io.connect("localhost:3000", {
      path: "/socket.io",
    });
    // console.log("socket :", socket);
    // socket = io("localhost:3000", {
    //   path: "/socket.io",
    // });
  }, []);

  useEffect(() => {
    let page_index = 0;
    let page_size = 5;

    const getMessageRoomList = async () => {
      const result = await chatApi.getMessageRoomList({
        page_index,
        page_size,
      });
      console.log(result);
    };
    getMessageRoomList();

    // socket = io(ENDPOINT);

    // if (props.userInfo._id !== myInfo._id) {
    // 메세지 룸 리스트부터 가져와야함
    // chatApi.createMessageRoom()
    // socket = io(ENDPOINT);
    // }
  }, []);
  return (
    <div className="ChatPageComponent">
      <ChatRoom />
    </div>
  );
}

export default Chat;
