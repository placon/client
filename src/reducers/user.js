export const initialState = {
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유

  isLoggedIn: false, // 로그인 성공
  isLoggingIn: false, // 로그인 실패
  loginErrorReason: "", // 로그인 실패 사유

  isLoggingOut: false, // 로그아웃 시도중
};

// 회원가입
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const signUpRequest = (data) => ({
  type: SIGN_UP_REQUEST,
  payload: data,
});

// 로그인
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

// 로그아웃
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: "",
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
        signUpErrorReason: "",
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
        signUpErrorReason: action.payload.errorReason,
      };

    default:
      return {
        ...state,
      };
  }
};
