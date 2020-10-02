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
      _id: "sdfdsafdsafs",
      send_by: "sfdsfsf",
      message: "test est esttsetst test ste st",
      register_date: "2020-10-02",
    },
    {
      _id: "sdfdsafdsafs",
      send_by: "낯선 그녀",
      message: "이것은 테스트다.",
      register_date: "2020-10-02",
    },
    {
      _id: "sdfdsafdsafs",
      send_by: "낯선 그녀",
      message: "그대의 눈동자에 건배",
      register_date: "2020-10-02",
    },
  ],
};
