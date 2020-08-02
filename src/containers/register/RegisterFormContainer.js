import React, { useState } from "react";
import RegisterForm from "../../components/register/RegisterForm";
import axios from "axios";

function RegisterFormContainer() {
  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.passwordCheck) {
      return;
    }

    if (!checkPasswordValidation()) {
      alert(
        "비밀번호는 최소 8자 최대 16자이며 \n최소 1개의 숫자와 특수문자가 들어가야 합니다."
      );
      return;
    }

    if (!checkEmailValidation()) {
      alert("올바른 이메일 형식을 입력해주세요");
      return;
    }

    if (
      !inputs.email ||
      !inputs.gender ||
      !inputs.name ||
      !inputs.password ||
      !inputs.passwordCheck ||
      !inputs.targetLanguage ||
      !inputs.nativeLanguage
    ) {
      alert("입력하지 않은 데이터가 있습니다.");
      return;
    }
    // 서버로 axios로 요청
    /**
     * 4. 프로필사진 업로드
     * 5. 이메일 중복체크
     */
  };

  const checkPasswordValidation = () => {
    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
    if (reg.test(inputs.password)) {
      return true;
    }
    return false;
  };

  const checkEmailValidation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(inputs.email)) {
      return true;
    }
    return false;
  };

  const checkEmailDuplication = () => {
    // 서버로 이메일 전송
  };

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
    image: "",
    nativeLanguage: "",
    targetLanguage: "",
    gender: "",
  });

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <RegisterForm
        onSubmit={onSubmit}
        inputs={inputs}
        onChange={onChange}
        checkEmailDuplication={checkEmailDuplication}
      />
    </div>
  );
}

export default RegisterFormContainer;
