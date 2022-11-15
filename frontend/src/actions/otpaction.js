import * as otpApi from "../api/otpRequest";
export const sendOTP = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "OTP_START" });
    const data = await otpApi.sendOtp(formdata);
    dispatch({ type: "OTP_SUCCESS", data: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "OTP_FAILED" });
  }
};
