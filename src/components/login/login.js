import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../../App";
import "./login.css";
import history from "../services/history";
import Loading from "../loading/Loading";
import axios from "axios";
import { SERVER_URL } from "../helpers/constant";
import checkLogin from "../helpers/checkLogin";

const Login = () => {
  // const dispatch = useDispatch();
  const { state, dispatch } = useContext(myContext);
  const { loading, user } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //form input change
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const state = {
      password,
      email,
    };
    const url = SERVER_URL + "/api/login";
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(url, state, {
        timeout: 30000,
      });
      if (response.status === 200) {
        const user = response.data.info.data;
        console.log(response);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("token", response.data.info.token);
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_LOADING", payload: false });
        console.log(user.role);
        history.goBack();
      }
      if (response.status === 401) {
        console.log("401");
        setMessage("Incorrect username or password");
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } catch (error) {
      console.log(error);
      setMessage("Incorrect username or password");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    if (user) {
      history.push("/profile");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="login-form mt-5 pt-5">
        <Loading />{" "}
      </div>
    );
  }
  return (
    <div className="login login-form">
      <div class="container-fluid mt-5  pt-5 login ">
        <div class="row d-flex justify-content-center ">
          <form onSubmit={handleSubmit} class="bg-white form-group shadow mb-5">
            <div class="py-5">
              <h1 class="text-center">Sign In</h1>
              <div className="login-message text-danger text-center">
                {message}
              </div>
              <div class="input-group mt-4 ml-4 mr-4 mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text bg-white">
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Username or email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div class="input-group mt-5 ml-4 mr-4 mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text bg-white">
                    <i class="fa fa-key" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handleChange}
                />
              </div>
              <div class="input-group mt-5 ml-4 mr-4 mb-2">
                <button type="submit">Login</button>
              </div>

              <div class="mt-5 d-flex justify-content-center align-items-center signup ">
                <p>
                  New to Instant Tinx? <Link to="/signup">Sign Up Here</Link>
                </p>
              </div>
              <div class="mt-5 text-right mr-5">
                <Link to="./forgotpassword.html">Forgot password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
