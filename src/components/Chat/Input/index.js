import React from "react";
import "./index.scss";

const Input = ({ message, setMessage, onSendMessage }) => (
  // <form className="form" onSubmit={(e) => onSendMessage(e)}>
  <form className="form" onSubmit={onSendMessage}>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      // onKeyPress={(event) =>
      //   event.key === "Enter" ? sendMessage(event) : null
      // }
    />
    {/* <button className="sendButton" onClick={(e) => sendMessage(e)}> */}
    <button className="sendButton">Send</button>
  </form>
);

export default Input;
