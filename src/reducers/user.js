export const initialState = {
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유

  isLoggedIn: false, // 로그인 성공
  isLoggingIn: false, // 로그인 실패
  loginErrorReason: "", // 로그인 실패 사유
  isLoggingOut: false, // 로그아웃 시도중

  myInfo: null, // 내 정보
  userInfo: null, // 조회한 유저 상세 정보
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

export const loginRequest = (data) => ({
  type: LOG_IN_REQUEST,
  payload: data,
});

// 로그아웃
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const logoutRequest = () => ({
  type: LOG_OUT_REQUEST,
});

// 유저 정보 조회
export const USER_INFO_REQUEST = " USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = " USER_INFO_SUCCESS";
export const USER_INFO_FAILURE = " USER_INFO_FAILURE";

export const userInfoRequest = (data) => ({
  type: USER_INFO_REQUEST,
  payload: data,
});

export default (state = initialState, action) => {
  switch (action.type) {
    // 회원가입
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

    // 로그인
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        myInfo: action.payload,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
      };

    // 로그아웃
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
      };

    // 유저 정보 상세 조회
    case USER_INFO_REQUEST:
      return {
        ...state,
        userInfo: null,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_INFO_FAILURE:
      return {
        ...state,
        userInfo: null,
      };

    default:
      return {
        ...state,
      };
  }
};
