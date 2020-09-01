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

export default function (state = initialState, action) {
  switch (action.type) {
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

    default:
      return { ...state };
  }
}
