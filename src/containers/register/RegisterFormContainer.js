import React, { useState } from "react";
import RegisterForm from "../../components/register/RegisterForm";

function RegisterFormContainer() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // 서버로 axios로 요청
    /**
     * 1. 비밀번호, 비밀번호 확인 같은지, validation 체크
     * 2. 이메일 validation 체크
     * 3. 각 항목 비어있는지 체크
     * 4. 프로필사진 업로드
     * 5. 이메일 중복체크
     * 6. css
     */
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
      <RegisterForm onSubmit={onSubmit} inputs={inputs} onChange={onChange} />
    </div>
  );
}

export default RegisterFormContainer;
