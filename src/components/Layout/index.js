import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./index.scss";

function index({ children }) {
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const myInfo = JSON.parse(window.sessionStorage.getItem("myInfo"));
    const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn && myInfo) {
      setLogin(true);
      setUserInfo(myInfo);
    }
  }, []);
  return (
    <>
      <Header login={login} userInfo={userInfo} />

      <main>
        <section className="content-section">{children}</section>
      </main>
    </>
  );
}

export default index;
