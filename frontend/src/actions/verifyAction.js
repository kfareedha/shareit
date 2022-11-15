import * as verifyApi from "../api/verifyRequest";
export const verifyOTP = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFY_START" });
    const { data } = await verifyApi.verifyotp(formdata);
    dispatch({ type: "VERIFY_SUCCESS", data: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "VERIFY_FAILED" });
  }
};
