import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://hero-bank-api.herokuapp.com/api/auth/login",
      userCredentials
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    window.location.reload();
  } catch (e) {
    dispatch({ type: "LOGIN_FAILURE", payload: e });
  }
};
