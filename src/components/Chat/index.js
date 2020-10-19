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
    chatApi
      .enterMessageRoom({
        room_info: room_id,
        user_id: props.userInfo._id,
      })
      .then((response) => {
        console.log("룸 들어가기 성공", response);
        setMessages(response.message_list); // 받아온 메세지 리스트 설정.
      });
  };

  // 룸 클릭
  const onClickRoom = (room_id) => {
    setRoom(room_id);
    // room name space에 연결
    roomSocket = io("localhost:3000/room");
    messageSocket = io(
      `localhost:3000/message?room_id=${room_id}&user_id=${props.userInfo._id}`
    );

    messageSocket.on("message", (data) => {
      console.log("받는 메세지 데이터1", data);
      setMessages((prev) => [...prev, data]);
    });

    enterMessageRoom(room_id);
  };

  // 메세지 전송
  const onSendMessage = (e) => {
    e.preventDefault();
    chatApi.sendMessage({ room_info: room, message }); // 메세지 전송
    setMessage("");
  };

  useEffect(() => {
    const myInfoByStorage = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(myInfoByStorage);

    // 1. 상대방 프로필 페이지에서 메세지 보내기를 클릭한 경우.

    // chatApi.createMessageRoom({
    //   user_id: props.userInfo._id,
    // }).then(response => {
    //   setRoom(response.created_room._id)
    // })

    socket = io("localhost:3000", {
      path: "/socket.io",
    });

    return () => {};
  }, [room]);

  useEffect(() => {
    let page_index = 0;
    let page_size = 5;

    chatApi
      .getMessageRoomList({
        page_index,
        page_size,
      })
      .then((response) => {
        setRooms(response.room_list);
      });

    return () => {
      messageSocket.disconnect();
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
              {messages &&
                messages.map((message) => (
                  <Message
                    key={message._id}
                    message={message.message}
                    registerDate={message.register_date}
                    sender={message.send_by}
                    isMe={myInfo._id === message.send_by}
                  />
                ))}
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
