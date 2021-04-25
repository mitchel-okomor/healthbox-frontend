import React, { useState, useContext } from "react";
import "./create.css";
import { myContext } from "../../App";
import history from "../services/history";
import axios from "axios";
import { SERVER_URL, SET_LOADING, SET_MESSAGE } from "../helpers/constant";
import Loading from "../loading/Loading";

function Create() {
  // const dispatch = useDispatch();
  const { state, dispatch } = useContext(myContext);
  const { loading, message } = state;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [prescription, setPrescription] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstname":
        setFirstname(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "prescription":
        setPrescription(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "doctor":
        setDoctor(e.target.value);
        break;
      case "hospital":
        setHospital(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = SERVER_URL + "/api/prescription";
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.post(url, {
        doctor,
        hospital,
        firstname,
        lastname,
        prescription,
        phone,
      });
      if (response.status === 200) {
        console.log(response.data.data);
        const data = response.data.data;
        console.log("create: " + data);
        dispatch({ type: SET_LOADING, payload: false });
        alert("Operation successful");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
      alert("Operation failed");
    }
  };

  if (loading) {
    return (
      <div className="create d-flex justify-content-center mt-5">
        <Loading />;{" "}
      </div>
    );
  }

  return (
    <div className="create d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit}>
        <div className="input-groups">
          <label htmlFor="title">Doctor's Name:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="doctor"
            id="doctor"
            value={doctor}
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="title">Hospital:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="hospital"
            id="hospital"
            value={hospital}
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="title">First Name:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="firstname"
            id="firstname"
            value={firstname}
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-groups mt-2">
          <label htmlFor="title">Last Name:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="lastname"
            id="lastname"
            value={lastname}
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-groups mt-2">
          <label htmlFor="description">Prescrition:</label>
          <br />
          <textarea
            className="form-control"
            type="text"
            name="prescription"
            id="prescription"
            value={prescription}
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-groups mt-2">
          <label htmlFor="venue">Phone number:</label>
          <br />
          <input
            className="form-control"
            type="number"
            min="9"
            name="phone"
            id="phone"
            value={phone}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
