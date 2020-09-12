import React from "react";
import "./index.scss";
import Message from "./Message";

function Messages({ messages, name }) {
  return (
    <div>
      {messages.map((message, idx) => (
        <div key={idx}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
}

export default Messages;

Messages.defaultProps = {
  messages: [
    {
      text: "test est esttsetst test ste st",
      user: "홍길동",
    },
    {
      text: "이것은 예시 메세지이다 이 녀석아",
      user: "낯선 그녀 ",
    },
    {
      text: "그대의 눈동자에 건배....",
      user: "낯선 그 남자...",
    },
  ],
  name: "홍길동",
};
