const postReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
    refresh: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAILED":
      return { ...state, uploading: false, error: true };

    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, uploading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, uploading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, uploading: false, error: true };

    //  to post delete

    case "delete_SUCCESS":
      return {
        ...state,
        posts: state.posts?.filter((el) => el._id !== action.data.id),
        loading: false,
        error: false,
      };
    case "REFRESH":
      return { ...state, refresh: !state.refresh };

    default:
      return state;
  }
};
export default postReducer;
