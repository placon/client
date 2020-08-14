import React, { useState, useEffect } from "react";

export default function (Componet, option, adminRoute = null) {
  //option
  // null => 아무나 출입가능
  // true => 로그인한 유저만 출입 가능
  // false => 로그인한 유저는 출입 불가능
  function AuthCheck(props) {
    // 초기 검증을 실행해준다
    useEffect(() => {
      let isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
      if (isLoggedIn && !option) {
        props.history.push("/");
      } else if (!isLoggedIn && option) {
        props.history.push("login");
      }
    }, []);

    return <Componet />;
  }

  return AuthCheck;
}
