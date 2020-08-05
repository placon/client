import React, { useState, useEffect } from "react";
import SignupForm from "../../components/signup";
import { useDispatch, useSelector } from "react-redux";
import { signUpRequest } from "../../reducers/user";
import UserAPI from "../../api/user";

function RegisterFormContainer({ history }) {
  const dispatch = useDispatch();
  const { isSignedUp } = useSelector((state) => state.user);
  const [duplication, setDuplication] = useState(false);

  useEffect(() => {
    if (isSignedUp) {
      alert("회원가입이 성공적으로 이루어졌습니다!");
      history.push("/login");
    }
  }, [isSignedUp]);

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      name,
      password,
      passwordCheck,
      nativeLanguage,
      targetLanguage,
      gender,
    } = inputs;

    if (password !== passwordCheck) {
      return;
    }
    if (!checkPasswordValidation()) {
      alert(
        "비밀번호는 최소 8자 최대 16자이며 \n최소 1개의 숫자와 특수문자가 포함되어야 합니다."
      );
      return;
    }
    if (!checkEmailValidation()) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (!duplication) {
      alert("이메일 중복확인을 해주세요.");
      return;
    }

    if (
      !email ||
      !name ||
      !password ||
      !passwordCheck ||
      !nativeLanguage ||
      !targetLanguage ||
      !gender
    ) {
      alert("입력하지 않은 데이터가 있습니다.");
      return;
    }

    dispatch(
      signUpRequest({
        email,
        name,
        password,
        passwordCheck,
        nativeLanguage,
        targetLanguage,
        gender,
      })
    );

    // 서버로 axios로 요청
    /**
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

  const checkEmailDuplication = async () => {
    const { data } = await UserAPI.requestCheckEmailDuplication(inputs.email);
    if (data) {
      setDuplication(true);
    }
  };

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
    image: "",
    nativeLanguage: "",
    targetLanguage: "",
    gender: "m",
  });

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <SignupForm
        onSubmit={onSubmit}
        inputs={inputs}
        onChange={onChange}
        duplication={duplication}
        checkEmailDuplication={checkEmailDuplication}
      />
    </div>
  );
}

export default RegisterFormContainer;
