import React, { useState } from "react";
import LoginForm from "../../components/login";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../reducers/user";

function LoginFormContainer() {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputs;
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

  return (
    <div className="container">
      <LoginForm inputs={inputs} onChange={onChange} onSubmit={onSubmit} />
    </div>
  );
}

export default LoginFormContainer;
