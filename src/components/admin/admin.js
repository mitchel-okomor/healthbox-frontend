import React, { useContext, useCallback, useEffect } from "react";
import "./admin.css";
import withAuth from "../services/withAuth";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import Adminevents from "../adminevents/adminevents";
import Create from "../create/create";
import axios from "axios";
import { SERVER_URL, SET_USER_EVENTS, SET_LOADING } from "../helpers/constant";
import { myContext } from "../../App";
import Edit from "../edit/edit";
import Orders from "./orders";

const Admin = () => {
  const { url, path } = useRouteMatch();

  const { state, dispatch } = useContext(myContext);
  const { user } = state;
  const id = localStorage.getItem("userId");
  const fetchEvents = useCallback(async () => {
    const url = SERVER_URL + "/api/events/" + id;
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        timeout: 30000,
      });
      if (response.status === 200) {
        const events = response.data;
        dispatch({ type: SET_USER_EVENTS, payload: events });
        dispatch({ type: SET_LOADING, payload: false });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="admin">
      <div className="row">
        <div className="col-md-3 col-lg-3 col-xl-3 col-sm-12 col-ms-12 bg-blue pl-0">
          <div>
            <div className="dashboard-image px-4 ">
              <img src={require("../../images/dummy.jpg")} alt="user" />
              <h3 className="mt-2">
                {user ? user.firstname + " " + user.lastname : ""}
              </h3>
              <h5>Event Organiser</h5>
              <div className="row n-area ">
                <div className="col-6 notification py-2">
                  <i className="fa fa-bell" aria-hidden="true"></i>
                </div>
                <div className="col-6 settings py-2">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
              </div>
            </div>

            <div className="side pt-5 ">
              <h4 className="mx-5 ">Navigation</h4>
              <ul className="px-5 ">
                <li>
                  <Link to={`${url}/dashboard`}>
                    <i class="fa fa-tachometer" aria-hidden="true"></i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to={`${url}/admin-orders/${id}`}>
                    <i class="fa fa-th-large" aria-hidden="true"></i>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to={`${url}/payments/${id}`}>
                    <i class="fa fa-th-large" aria-hidden="true"></i>
                    payments
                  </Link>
                </li>
                <li>
                  <Link to="/draft">
                    <i class="fa fa-minus-square" aria-hidden="true"></i>
                    Draft Events
                  </Link>
                </li>
                <li>
                  <Link to="/completed">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    completed Events
                  </Link>
                </li>
              </ul>
              <div className="text-center mt-5">
                <button className="btn btn-success">Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-9 col-xl-9 col-sm-12 col-ms-12">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path={`${path}/events`} component={Adminevents} />
            <Route path="/admin/edit-event/:_id" component={Edit} />
            <Route path="/admin/create-event" component={Create} />
            <Route path={`${path}/dashboard`} component={Dashboard} />
            <Route path={`${path}/admin-orders/:_id`} component={Orders} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Admin);
