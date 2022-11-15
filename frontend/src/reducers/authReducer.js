const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAILED":
      return { ...state, loading: false, error: true };

    case "VERIFY_START":
      return { ...state, loading: true, status: false, error: false };
    case "VERIFY_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        status: true,
        loading: false,
        error: false,
      };
    case "VERIFY_FAILED":
      return { ...state, loading: false, status: false, error: true };

    default:
      return state;
  }
};

export default authReducer;
