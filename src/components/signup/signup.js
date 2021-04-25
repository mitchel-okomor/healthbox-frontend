import React, { useState, useContext } from "react";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import "./signup.css";
import history from "../services/history";
import axios from "axios";
import { SERVER_URL, SET_LOADING, SET_USER } from "../helpers/constant";
import Loading from "../loading/Loading";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  // const dispatch = useDispatch();
  const { state, dispatch } = useContext(myContext);
  const { loading } = state;

  //form input change
  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstname":
        setFirstName(e.target.value);
        break;

      case "lastname":
        setLastName(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      case "phone":
        setPhone(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        setConfirm(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      console.log("not match");
      setMessage("Password do not match!");
      return;
    }
    const userData = {
      firstname,
      lastname,
      email,
      phone,
      password,
    };

    const url = SERVER_URL + "/api/signup";
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.post(url, userData, {
        timeout: 30000,
      });
      if (response.status === 200) {
        const user = response.data.data;
        localStorage.setItem("userId", user.userId);
        localStorage.setItem("token", response.data.token);
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_USER, payload: user });
        user.role === "planner"
          ? history.push("/admin/dashboard")
          : history.push("/");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  if (loading) {
    return (
      <div className="signup-form mt-5 pt-5">
        <Loading />{" "}
      </div>
    );
  }
  return (
    <div className="container-fluid mt-5  pt-5 signup signup-form ">
      <div className="row d-flex justify-content-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-white form-group shadow mb-5"
        >
          <div className="pt-5 pb-5">
            <h1 className="text-center">Sign Up</h1>

            <div className="from-group mt-4 ml-4  mb-2">
              {" "}
              <label for="fname">
                First name <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  placeholder="First name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="from-group mt-4 ml-4  mb-2">
              {" "}
              <label for="fname">
                Last name <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  placeholder="Last name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="from-group mt-4 ml-4 mb-2">
              {" "}
              <label for="email">
                Email <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="from-group mt-4 ml-4 mb-2">
              {" "}
              <label for="phone">
                Phone number <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="2348047384940"
                  name="phone"
                  maxLength="13"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="from-group mt-4 ml-4  mb-2">
              {" "}
              <label for="password">
                Password <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="from-group mt-4 ml-4  mb-2">
              <div className="text-danger ml-3 message">{message}</div>
              <label for="password">
                Confirm Password <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </div>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="confirm"
                  placeholder="Confirm Password"
                  name="confirm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="input-group ml-4 mr-4 mb-2">
            <button type="submit">Signup</button>
          </div>

          <div className="mt-5 d-flex justify-content-center align-items-center login ">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
