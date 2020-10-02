import React from "react";
import Chat from "../../components/Chat";

function ChatPage(props) {
  return (
    <>
      {props.location.state.userInfo && (
        <Chat userInfo={props.location.state.userInfo} />
      )}
    </>
  );
}

export default ChatPage;
