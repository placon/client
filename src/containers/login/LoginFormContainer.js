import React, { useState } from "react";
import LoginForm from "../../components/login/LoginForm";
import useInput from "../../lib/hooks/useInput";
import "./loginContainer.scss";

function LoginFormContainer() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
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
