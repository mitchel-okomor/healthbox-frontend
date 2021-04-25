import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Table from "./table";
import { myContext } from "../../App";

function Dashboard() {
  const { state } = useContext(myContext);
  const { prescriptions } = state;

  const completed = prescriptions.filter((item) => item.isCompleted === "true");
  const published = prescriptions.filter((item) => item.isPublished === "true");
  const drafted = prescriptions.filter((item) => item.isPublished === "false");

  return (
    <div className="dashboard">
      <h1 className="m-3 font-weigth-bold">Dashboard</h1>
      <div className="row">
        <div className="col-ms-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
          <div className="total-events p-3">{prescriptions.length} Events</div>
        </div>
        <div className="col-ms-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
          <div className="published-events p-3">
            {published.length} Published{" "}
          </div>
        </div>
        <div className="col-ms-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
          <div className="completed-events p-3">
            {" "}
            {completed.length} Completed
          </div>
        </div>
        <div className="col-ms-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
          <div className="drafted-events p-3">{drafted.length} Drafted</div>
        </div>
      </div>
      <div>
        <div className="d-header">
          <div className="row mt-4 pt-3 pl-3">
            <div className="col-ms-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <div>
                <Link to="/admin/create-event" className="btn btn-primary bold">
                  Create Event
                </Link>
              </div>
            </div>
            <div className="col-ms-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
              <div className="py-2">
                <form className="">
                  <div className="input-group">
                    <input
                      className="form-control  search"
                      type="text"
                      placeholder="Search.."
                      name="search"
                    />
                    <button type="submit" className="btn btn-success">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-ms-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
              <div>details</div>
            </div>
            <div className="col-ms-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
              <div>details</div>
            </div>
          </div>
        </div>
        <div className="d-details mt-5">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
