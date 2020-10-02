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

  const enterMessageRoom = async (room_id) => {
    const data = await chatApi.enterMessageRoom({
      room_info: room_id,
      user_id: props.userInfo._id,
    });
    if (data) {
      console.log("룸 들어가기 성공", data);
      setMessages(data.message_list); // 받아온 메세지 리스트 설정.
    }
  };

  useEffect(() => {
    const myInfoByStorage = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(myInfoByStorage);
    console.log("props로 받은 유저인포", props.userInfo);
    if (props.userInfo._id !== myInfoByStorage._id) {
      const createMessageRoom = async () => {
        const data = await chatApi.createMessageRoom({
          user_id: props.userInfo._id,
        });
        console.log("데이터 확인", data);
        if (data) {
          console.log("세팅하는 방 이름 : ", data.created_room._id);
          setRoom(data.created_room._id);
          enterMessageRoom(data.created_room._id);
        }
      };
      createMessageRoom();
    }

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
        {rooms &&
          rooms.map((room) => (
            <ChatRoom key={room._id} users={room.users} myInfo={myInfo} />
          ))}
      </div>
      <div className="chat-screen">{room ? <div>d</div> : <div>👀</div>}</div>
    </div>
  );
}

export default Chat;
