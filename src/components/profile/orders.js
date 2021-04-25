import React, { useEffect, useCallback, useContext } from "react";
import "./orders.css";
import { myContext } from "../../App";
import axios from "axios";
import {
  SERVER_URL,
  SET_LOADING,
  SET_PRESCRIPTIONS,
} from "../helpers/constant";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

function Orders() {
  const { state, dispatch } = useContext(myContext);
  const { prescriptions, loading } = state;

  const fetchOrders = useCallback(async () => {
    const url = SERVER_URL + "/api/prescriptions";
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.get(url, {
        method: "put",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        dispatch({ type: SET_PRESCRIPTIONS, payload: data });
        dispatch({ type: SET_LOADING, payload: false });
      }
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return <Loading />;
  }

  if (prescriptions || prescriptions.length > 0) {
    return (
      <table className="table text-center table-bordered order">
        <thead>
          <tr>
            <th scope="col">Prescription Id</th>
            <th scope="col">Name</th>
            <th scope="col">Phone number</th>
            <th scope="col">Prescription</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((item) => {
            //const event = item.cart.map((event) => event._id === item.eventId);
            return (
              <tr key={item._id}>
                <td>{item.orderId}</td>
                <td>{item.firstname + " " + item.lastname}</td>
                <td>{item.phone}</td>
                <td>{item.prescription}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Orders;
