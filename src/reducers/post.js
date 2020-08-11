export const initialState = {
  // 포스트 리스트
  postLists: {
    posts: [],
    loading: false,
    error: null,
  },
  // 포스트 작성
  newPost: {
    post: null,
    loading: false,
    error: null,
  },
  // 포스트 삭제
  deletedPost: {
    post: null,
    loading: false,
    error: null,
  },
  // 포스트 수정
  updatedPost: {
    post: null,
    loading: false,
    error: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_POST_REQUEST:
      return {
        ...state,
        newPost: { ...state.newPost, loading: true },
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        newPost: { post: action.payload, error: null, loading: false },
      };
    case NEW_POST_FAILURE:
      return {
        ...state,
        newPost: { post: null, error: action.payload.error, loading: false },
      };

    case DELETE_POST_REQUEST:
      return {
        ...state,
        deletedPost: {
          ...state.deletedPost,
          error: null,
          loading: true,
        },
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletedPost: {
          post: action.payload,
          error: null,
          loading: false,
        },
      };
    case DELTE_POST_FAILURE:
      return {
        ...state,
        deletedPost: {
          post: null,
          error: action.payload.error,
          loading: false,
        },
      };

    default:
      return { ...state };
  }
}
