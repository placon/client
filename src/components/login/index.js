import React from "react";
import "./index.scss";

function LoginForm(props) {
  const { email, password } = props.inputs;
  const { onChange, onSubmit } = props;

  return (
    <div className="inner">
      <div className="logo">P L A C O N</div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginForm;
