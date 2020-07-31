import React, { useState } from "react";
import useInput from "../../lib/hooks/useInput";

function RegisterForm(props) {
  // const [inputs, setInputs] = useState({
  //   email: "",
  //   name: "",
  //   password: "",
  //   passwordCheck: "",
  //   image: "",
  //   nativeLanguage: "",
  //   targetLanguage: "",
  //   gender: "",
  // });

  const { onSubmit, onChange, checkEmailDuplication } = props;

  const {
    email,
    name,
    password,
    passwordCheck,
    image,
    nativeLanguage,
    targetLanguage,
    gender,
  } = props.inputs;

  // const onChange = (e) => {
  //   if (
  //     e.target.name === "nativeLanguage" ||
  //     e.target.name === "targetLanguage" ||
  //     e.target.name === "gender"
  //   ) {
  //     console.log(e.target);
  //   } else {
  //     setInputs({
  //       ...inputs,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <span>이메일</span>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
          />{" "}
          <button type="button" onClick={checkEmailDuplication}>
            중복체크
          </button>
        </div>
        <div className="row">
          <span>이름(서비스 내에서 사용됩니다.)</span>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="row">
          <span>비밀번호</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <span>비밀번호 확인</span>
          <input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <span>모국어</span>
          <select
            name="nativeLanguage"
            value={nativeLanguage}
            onChange={onChange}
          >
            <option value="kr">KR</option>
            <option value="en">EN</option>
          </select>
        </div>
        <div className="row">
          <span>학습언어</span>
          <select
            name="targetLanguage"
            value={targetLanguage}
            onChange={onChange}
          >
            <option value="kr">KR</option>
            <option value="en">EN</option>
          </select>
        </div>
        <div className="row">
          <span>성별</span>
          <select name="gender" value={gender} onChange={onChange}>
            <option value="m">남자</option>
            <option value="f">여자</option>
          </select>
        </div>
        <button type="submit">완료</button>
      </form>
    </div>
  );
}

export default RegisterForm;
