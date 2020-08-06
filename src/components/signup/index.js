import React, { useState } from "react";
import useInput from "../../lib/hooks/useInput";
import Button from "../ui/Button";
import "./index.scss";

function SignupForm(props) {
  const { onSubmit, onChange, duplication, checkEmailDuplication } = props;

  const {
    email,
    name,
    password,
    passwordCheck,
    nativeLanguage,
    targetLanguage,
    gender,
  } = props.inputs;

  return (
    <div className="container">
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <h4>이메일</h4>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
          />{" "}
          {!duplication ? (
            <button type="button" onClick={checkEmailDuplication}>
              중복체크
            </button>
          ) : (
            <span>사용할 수 있는 이메일입니다.</span>
          )}
        </div>
        <div className="row">
          <h4>이름 (서비스 내에서 사용됩니다.)</h4>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="row">
          <h4>비밀번호</h4>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <h4>비밀번호 확인</h4>
          <input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChange}
          />
          {password !== passwordCheck && (
            <div>비밀번호와 비밀번호 확인이 다릅니다</div>
          )}
        </div>
        <div className="row">
          <h4>모국어</h4>
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
          <h4>학습언어</h4>
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
          <h4>성별</h4>
          <select name="gender" value={gender} onChange={onChange}>
            <option value="m">남자</option>
            <option value="f">여자</option>
          </select>
        </div>
        <Button className="submit" type="submit">
          완료
        </Button>
      </form>
    </div>
  );
}

export default SignupForm;
