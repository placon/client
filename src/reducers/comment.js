export const initialState = {
  newComment: {
    comment: null,
    loading: false,
    error: null,
  },
  deleteComment: {
    comment: null,
    loading: false,
    error: null,
  },
  newCorrection: {
    comment: null,
    loading: false,
    error: null,
  },
  deleteCorrection: {
    comment: null,
    loading: false,
    error: null,
  },
  correctionList: {
    comments: null,
    loading: false,
    error: null,
    nextPageIndex: 0,
  },
};

// 댓글 작성
export const WRITE_COMMENT_REQUEST = "WRITE_COMMENT_REQUEST";
export const WRITE_COMMENT_SUCCESS = "WRITE_COMMENT_SUCCESS";
export const WRITE_COMMENT_FAILURE = "WRITE_COMMENT_FAILURE";

export const writeComment = (data) => ({
  type: WRITE_COMMENT_REQUEST,
  payload: data,
});

// 댓글 삭제
export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const deleteComment = (data) => ({
  type: DELETE_COMMENT_REQUEST,
  payload: data,
});

// 첨삭 댓글 작성
export const WRITE_CORRECTION_REQUEST = "WRITE_CORRECTION_REQUEST";
export const WRITE_CORRECTION_SUCCESS = "WRITE_CORRECTION_SUCCESS";
export const WRITE_CORRECTION_FAILURE = "WRITE_CORRECTION_FAILURE";

export const writeCorrection = (data) => ({
  type: WRITE_CORRECTION_REQUEST,
  payload: data,
});

// 첨삭 댓글 삭제
export const DELETE_CORRECTION_REQUEST = "DELETE_CORRECTION_REQUEST";
export const DELETE_CORRECTION_SUCCESS = "DELETE_CORRECTION_SUCCESS";
export const DELETE_CORRECTION_FAILURE = "DELETE_CORRECTION_FAILURE";
export const deleteCorrection = (data) => ({
  type: DELETE_CORRECTION_REQUEST,
  payload: data,
});

// 첨삭 댓글 리스트
export const LOAD_CORRECTION_REQUEST = "LOAD_CORRECTION_REQUEST";
export const LOAD_CORRECTION_SUCCESS = "LOAD_CORRECTION_SUCCESS";
export const LOAD_CORRECTION_FAILURE = "LOAD_CORRECTION_FAILURE";
export const loadCorrectionList = (data) => ({
  type: LOAD_CORRECTION_REQUEST,
  payload: data,
});

export default function (state = initialState, action) {
  switch (action.type) {
    // 일반 댓글
    case WRITE_COMMENT_REQUEST:
      return {
        ...state,
        newComment: {
          comment: null,
          loading: true,
          error: null,
        },
      };
    case WRITE_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: {
          comment: action.payload,
          loading: false,
          error: null,
        },
      };

    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        deleteComment: {
          comment: null,
          loading: true,
          error: null,
        },
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deleteComment: {
          comment: action.payload,
          loading: false,
          error: null,
        },
      };

    // 첨삭 댓글
    case WRITE_CORRECTION_REQUEST:
      return {
        ...state,
        newCorrection: {
          comment: null,
          loading: true,
          error: null,
        },
      };
    case WRITE_CORRECTION_SUCCESS:
      return {
        ...state,
        newCorrection: {
          comment: action.payload,
          loading: false,
          error: null,
        },
      };

    case DELETE_CORRECTION_REQUEST:
      return {
        ...state,
        deleteCorrection: {
          comment: null,
          loading: true,
          error: null,
        },
      };
    case DELETE_CORRECTION_SUCCESS:
      return {
        ...state,
        deleteCorrection: {
          comment: action.payload,
          loading: false,
          error: null,
        },
      };

    case LOAD_CORRECTION_REQUEST:
      return {
        ...state,
        correctionList: {
          comments: null,
          loading: true,
          error: null,
          nextPageIndex: 0,
        },
      };
    case LOAD_CORRECTION_SUCCESS:
      return {
        ...state,
        correctionList: {
          comments: action.payload.correction_list,
          loading: false,
          error: null,
          nextPageIndex: action.payload.next_page_index,
        },
      };
    case LOAD_CORRECTION_FAILURE:
      return {
        ...state,
        correctionList: {
          comments: null,
          loading: false,
          error: action.payload,
          nextPageIndex: 0,
        },
      };

    default:
      return { ...state };
  }
}
