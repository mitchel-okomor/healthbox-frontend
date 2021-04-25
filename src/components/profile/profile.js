import React from "react";
import "./profile.css";
import withAuth from "../services/withAuth";
import Orders from "./orders";
import Address from "./address";
import Account from "./account";

function Profile() {
  return (
    <div className="profile container">
      <div className="background"></div>
      <div>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="pills-orders-tab"
              data-toggle="pill"
              href="#pills-orders"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i className="fa fa-cart-arrow-down mr-1" aria-hidden="true"></i>
              All Prescritions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pills-downloads-tab"
              data-toggle="pill"
              href="#pills-downloads"
              role="tab"
              aria-controls="pills-downloads"
              aria-selected="false"
            >
              <i className="fa fa-download mr-1" aria-hidden="true"></i>
              Today Prescriptions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pills-address-tab"
              data-toggle="pill"
              href="#pills-address"
              role="tab"
              aria-controls="pills-address"
              aria-selected="false"
            >
              <i className="fa fa-address-book mr-1" aria-hidden="true"></i>
              last week
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pills-account-tab"
              data-toggle="pill"
              href="#pills-account"
              role="tab"
              aria-controls="pills-account"
              aria-selected="false"
            >
              <i className="fa fa-user mr-1" aria-hidden="true"></i>Last month
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active mt-5"
            id="pills-orders"
            role="tabpanel"
            aria-labelledby="pills-orders-tab"
          >
            <Orders />
          </div>
          <div
            className="tab-pane fade"
            id="pills-downloads"
            role="tabpanel"
            aria-labelledby="pills-downloads-tab"
          ></div>
          <div
            className="tab-pane fade"
            id="pills-address"
            role="tabpanel"
            aria-labelledby="pills-address-tab"
          >
            <Address />
          </div>
          <div
            className="tab-pane fade"
            id="pills-account"
            role="tabpanel"
            aria-labelledby="pills-account-tab"
          >
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
