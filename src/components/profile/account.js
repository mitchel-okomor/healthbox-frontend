import React, { useState, useContext } from "react";
import "./account.css";
import { myContext } from "../../App";
import axios from "axios";
import { SERVER_URL, SET_LOADING, SET_USER } from "../helpers/constant";
import Loading from "../loading/Loading";

function Account() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  // const dispatch = useDispatch();
  const { state, dispatch } = useContext(myContext);
  const { loading, user } = state;

  //form input change
  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstname":
        setFirstName(e.target.value);
        break;

      case "lastname":
        setLastName(e.target.value);
        break;

      case "username":
        setUserName(e.target.value);
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
    const state = {
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
    };

    const url = SERVER_URL + "/api/user";
    console.log(state);
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.patch(url, state, {
        timeout: 30000,
      });
      if (response.status === 200) {
        const user = response.data.data;
        localStorage.setItem("userId", user.userId);
        localStorage.setItem("token", response.data.token);
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_USER, payload: user });
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
            <h1 className="text-center">Edit Account Details</h1>

            <div className="from-group mt-4 ml-4  mb-2">
              {" "}
              <label htmlFor="fname">
                First name <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  value={user.firstname}
                  placeholder="First name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="from-group mt-4 ml-4  mb-2">
              {" "}
              <label htmlFor="lastname">
                Last name <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  value={user.lastname}
                  placeholder="Last name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="from-group mt-4 ml-4 mb-2">
              {" "}
              <label htmlFor="email">
                Email <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="from-group mt-4 ml-4 mb-2">
              {" "}
              <label htmlFor="phone">
                Phone number <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="2348047384940"
                  name="phone"
                  value={user.phone}
                  maxLength="13"
                  onChange={handleChange}
                />
              </div>
            </div>

            <u>
              <h3 className="ml-4 mt-5">Password change area</h3>
            </u>
            <p className="ml-4 mt-5">Leave blank if no changes</p>
            <div className="from-group mt-4 ml-4  mb-2">
              {" "}
              <label htmlFor="password">
                current password <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
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
              {" "}
              <label htmlFor="new-password">
                New password <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <input
                  type="password"
                  className="form-control"
                  id="new-password"
                  placeholder="New Password"
                  name="new-password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="from-group mt-4 ml-4  mb-2">
              <div className="text-danger ml-3 message">{message}</div>
              <label htmlFor="password">
                Confirm new password <span className="danger">*</span>
              </label>{" "}
              <br />
              <div className="input-group ">
                <input
                  type="password"
                  className="form-control"
                  id="confirm"
                  placeholder="Confirm new password"
                  name="confirm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="input-group ml-4 mr-4 mb-2">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
