import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../reducers/user";

function LoginFormContainer() {
  const dispatch = useDispatch();
  const { isLoggedIn, myInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      console.log("로그인 성공");
      window.sessionStorage.setItem("myInfo", JSON.stringify(myInfo));
      window.sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    /**
     * ==== 추가사항 ====
     * 1. 아이디 혹은 패스워드가 없는 경우
     * 2. 이메일 인증이 진행되지 않은 경우
     * 3. 서버 오류
     */

    if (!email || !password) {
      alert("아이디 혹은 비밀번호를 입력하지 않았습니다.");
      return;
    }

    dispatch(
      loginRequest({
        email,
        password,
      })
    );
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return <LoginForm inputs={inputs} onChange={onChange} onSubmit={onSubmit} />;
}

export default LoginFormContainer;
