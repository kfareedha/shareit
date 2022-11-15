const verifyReducer = (
  state = { authData: null, loading: false, status: false, error: false },
  action
) => {
  switch (action.type) {
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

export default verifyReducer;
