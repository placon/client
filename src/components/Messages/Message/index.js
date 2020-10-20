import React from "react";
import "./index.scss";

// name은 내 이름이 되어야 함. 혹은 아이디
// user가 상대방 이름 혹은 상대방 아이디
function Message(props) {
  const { message, registerDate, sender, isMe } = props;

  return (
    <>
      {isMe ? (
        //  내 메세지
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{name}</p> */}
          <div className="messageBox mine">
            <p className="messageText">{message}</p>
          </div>
        </div>
      ) : (
        //   상대방 메세지
        <div className="messageContainer justifyStart">
          {/* <p className="sentText pr-10">{user}</p> */}
          <p className="sentText pr-10">User</p>
          <div className="messageBox sender">
            <p className="messageText">{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;

Message.defaultProps = {
  message: {
    text: "테스트용 디폴트 텍스트입니다.",
    user: "테스트 유저",
  },
  name: "홍길동",
};
