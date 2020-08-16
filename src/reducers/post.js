export const initialState = {
  // 포스트 리스트
  hasMorePost: true,
  postList: {
    posts: [],
    loading: false,
    error: null,
    page_index: 0,
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
  // 포스트 상세보기
  selectedPost: {
    post: null,
    loading: false,
    error: null,
  },
};

// 포스트 리스트
export const POST_LIST_REQUEST = "POST_LIST_REQUEST";
export const POST_LIST_SUCCESS = "POST_LIST_SUCCESS";
export const POST_LIST_FAILURE = "POST_LIST_FAILURE";

export const postListRequest = (data) => ({
  type: POST_LIST_REQUEST,
  payload: data,
});

// 포스트 작성
export const WRITE_POST_REQUEST = "WRITE_POST_REQUEST";
export const WRITE_POST_SUCCESS = "WRITE_POST_SUCCESS";
export const WRITE_POST_FAILURE = "WRITE_POST_FAILURE";

export const writePostRequest = (data) => ({
  type: WRITE_POST_REQUEST,
  payload: data,
});

// 포스트 삭제
export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const deletePostRequest = (data) => ({
  type: DELETE_POST_REQUEST,
  payload: data,
});

// 포스트 수정
export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const updatePostRequest = (data) => ({
  type: UPDATE_POST_REQUEST,
  payload: data,
});

// 포스트 상세보기
export const POST_DETAIL_REQUEST = "POST_DETAIL_REQUEST";
export const POST_DETAIL_SUCCESS = "POST_DETAIL_SUCCESS";
export const POST_DETAIL_FAILURE = "POST_DETAIL_FAILURE";

export const postDetailRequest = (data) => ({
  type: POST_DETAIL_REQUEST,
  payload: data,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return {
        ...state,
        postList: {
          ...state.postList,
          loading: true,
          error: null,
        },
      };
    case POST_LIST_SUCCESS:
      return {
        ...state,
        hasMorePost: action.payload.post_list.length == 5 ? true : false,
        postList: {
          ...state.postList,
          loading: false,
          error: null,
          posts: state.postList.posts.concat(action.payload.post_list),
        },
      };
    case POST_LIST_FAILURE:
      return {
        ...state,
        postList: { post: null, error: action.payload, loading: false },
      };

    case WRITE_POST_REQUEST:
      return {
        ...state,
        newPost: { ...state.newPost, loading: true },
      };
    case WRITE_POST_SUCCESS:
      return {
        ...state,
        newPost: { post: action.payload, error: null, loading: false },
      };
    case WRITE_POST_FAILURE:
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
    case DELETE_POST_FAILURE:
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
