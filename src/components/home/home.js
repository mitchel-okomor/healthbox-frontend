import React, { useContext } from "react";
import "./home.css";
import history from "../services/history";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import Create from "../create/create";

const Home = () => {
  const { state } = useContext(myContext);
  const { user } = state;

  if (user && user.role === "planner") {
    history.push("/admin/dashboard");
  }

  return (
    <main>
      <div className="home container">
        <div className="mt-5 mb-5 text-center">
          <h1>Welcome to Jomed Pharmcy</h1>
          <h5>What can we help you do today?</h5>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-6 col-ms-12 rounded" style={{ width: "40%" }}>
            <h3 className="text-center mt-3 text-success">
              Send us your prescription
            </h3>
            <div>
              <Create />
            </div>
          </div>
          <div className="col-6 col-ms-12  rounded">
            <div className="ml-5" style={{ width: "50%" }}>
              <h3 className="mt-3 text-success">Our Health Services</h3>
              <ul>
                <li className="mt-5 pt-2">
                  <Link to="/">Blood Sugar</Link>
                </li>
                <li className="mt-2">
                  <Link to="/">BMR</Link>
                </li>
                <li className="mt-2">
                  <Link to="/">Nutrition</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
