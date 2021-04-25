import history from "../services/history";
import { SET_USER } from "./constant";

const logout = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  console.log("logged out successfully");
  history.push("/login");
  dispatch({ type: SET_USER, payload: null });
};

export default logout;
