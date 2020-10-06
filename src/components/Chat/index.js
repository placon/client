import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import "./index.scss";
import io from "socket.io-client";
import Input from "./Input";
import chatApi from "../../api/chat";
import Messages from "../Messages";
import Message from "../Messages/Message";

let socket;
let messageSocket;
let roomSocket;

function Chat(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [myInfo, setMyInfo] = useState();

  const enterMessageRoom = async (room_id) => {
    console.log("룸아이디", room_id);
    const data = await chatApi.enterMessageRoom({
      room_info: room_id,
      user_id: props.userInfo._id,
    });
    if (data) {
      console.log("룸 들어가기 성공", data);
      setMessages(data.message_list); // 받아온 메세지 리스트 설정.
    }
  };

  // 룸 클릭
  const onClickRoom = (room_id) => {
    setRoom(room_id);
    // room name space에 연결
    roomSocket = io("localhost:3000/room");
    messageSocket = io(
      `localhost:3000/message?room_id=${room_id}&user_id=${props.userInfo._id}`
    );

    console.log("소켓소켓: ", messageSocket);
    enterMessageRoom(room_id);
  };

  // 메세지 전송
  const onSendMessage = async (e) => {
    e.preventDefault(); // 새로고침 막고
    const data = await chatApi.sendMessage({ room_info: room, message });
    console.log("컴포넌트에서 메세지 전송 테스트", data);

    messageSocket.on("message", (data) => {
      console.log("받는 메세지 데이터", data);
    });
    roomSocket.on("message", (data) => {
      console.log("받는 메세지 데이터", data);
    });
  };

  useEffect(() => {
    const myInfoByStorage = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(myInfoByStorage);

    // 1. 상대방 프로필 페이지에서 메세지 보내기를 클릭한 경우.
    if (props.userInfo._id !== myInfoByStorage._id) {
      const createMessageRoom = async () => {
        const data = await chatApi.createMessageRoom({
          user_id: props.userInfo._id,
        });

        if (data) {
          // console.log("세팅하는 방 이름 : ", data.created_room._id);
          setRoom(data.created_room._id);
          enterMessageRoom(data.created_room._id);
        }
      };
      createMessageRoom();
    }

    // socket = io.connect("localhost:3000", {
    //   path: "/socket.io",
    // });
    socket = io("localhost:3000", {
      path: "/socket.io",
    });

    return () => {};
  }, [room]);

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

    return () => {
      roomSocket.disconnect();
    };
  }, []);
  return (
    <div className="ChatPageComponent">
      <div className="room-list">
        {rooms &&
          rooms.map((room) => (
            <ChatRoom
              key={room._id}
              users={room.users}
              myInfo={myInfo}
              onClickRoom={onClickRoom}
              roomId={room._id}
            />
          ))}
      </div>
      <>
        {room ? (
          <div className="chat-screen">
            <div className="message-list">
              {/* {messages && messages.map((message) => <Message />)} */}
            </div>
            <Input
              message={message}
              setMessage={setMessage}
              onSendMessage={onSendMessage}
            />
          </div>
        ) : (
          <div>👀</div>
        )}
      </>
    </div>
  );
}

export default Chat;
