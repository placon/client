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
  const [messagePage, setMessagePage] = useState(1); // 메세지 리스트 불러올 때 사용
  const [hasMoreMessage, setHasMoreMessage] = useState(true);

  const enterMessageRoom = (room_id) => {
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

  // 메세지 불러오기
  const loadMoreMessage = () => {
    if (!hasMoreMessage) return;
    let page_size = 8;
    chatApi
      .getMessageList({
        room_info: room,
        page_index: messagePage + 1,
        page_size,
      })
      .then((response) => {
        const newArr = [...response.message_list, ...messages];
        setMessages(newArr);
        setMessagePage((prev) => prev + 1);

        if (response.message_list.length < page_size) {
          setHasMoreMessage(false);
        }
      });
  };

  useEffect(() => {
    const myInfoByStorage = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(myInfoByStorage);

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
            <button onClick={loadMoreMessage}>Load old Messages</button>
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
