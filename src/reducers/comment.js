export const initialState = {
  newComment: {
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

export default function (state = initialState, action) {
  switch (action.type) {
    case WRITE_COMMENT_REQUEST:
      return {
        ...state,
        newComment: {
          newComment: action.payload,
          loading: false,
          error: null,
        },
      };

    default:
      return { ...state };
  }
}
