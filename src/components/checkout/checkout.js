import React, { useContext } from "react";
import { myContext } from "../../App";
import axios from "axios";
import {
  SERVER_URL,
  SET_LOADING,
  SET_MESSAGE,
  SET_CART,
} from "../helpers/constant";
import history from "../services/history";

import Loading from "../loading/Loading";
import "./checkout.css";
import { Link } from "react-router-dom";

function Checkout() {
  const { state, dispatch } = useContext(myContext);
  let { cart, user, message, loading } = state;
  const firstname = user ? user.firstname.toUpperCase() : "";
  const lastname = user ? user.lastname.toUpperCase() : "";
  let userName = firstname + " " + lastname;

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        userName = e.target.user;
        break;
      case "email":
        user.email = e.target.email;
        break;
      default:
        user.phone = e.target.phone;
    }
    console.log("change: " + e.target.value);
  };
  async function placeOrder() {
    const body = {
      ref: "",
      userId: user._id,
      cart,
      amount: cart.reduce((acc, item) => {
        return acc + item.total;
      }, 0),
    };
    const url = SERVER_URL + "/api/order";
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const data = response.data.data;
        console.log("checkpout" + data);
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_MESSAGE, payload: "Order submitted" });
        localStorage.removeItem("cart");
        alert(message);
        history.push("/profile");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  }

  const removeitem = (id) => {
    const index = cart.findIndex((item) => item.eventId === id);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: SET_CART, payload: cart });
  };

  const increment = (id) => {
    const modified = cart.map((item) => {
      if (item.eventId === id) {
        item.quantity++;
        item.total = Number(item.total) + Number(item.price);
      }

      return item;
    });
    localStorage.setItem("cart", JSON.stringify(modified));
    dispatch({ type: SET_CART, payload: modified });
  };

  const decrement = (id) => {
    const modified = cart.map((item) => {
      if (item.eventId === id && item.quantity > 0) {
        item.quantity--;
        item.total = Number(item.total) - Number(item.price);
      }

      return item;
    });
    localStorage.setItem("cart", JSON.stringify(modified));
    dispatch({ type: SET_CART, payload: modified });
  };

  return loading ? (
    <div className="checkout container mt-5">
      <Loading />{" "}
    </div>
  ) : (
    <div className="checkout container mt-5">
      <table className="table table-bordered">
        <thead className="bg-light p-5">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ticket</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="p-5">
          {cart.map(({ title, quantity, price, total, eventId }, index) => {
            const localQuantity = quantity;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{title}</td>
                <td>{price}</td>
                <td>
                  <div className="quantity-button">
                    <button
                      onClick={() => {
                        decrement(eventId);
                      }}
                    >
                      –
                    </button>{" "}
                    {localQuantity}{" "}
                    <button
                      onClick={() => {
                        increment(eventId);
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₦{total}</td>
                <td>
                  <Link
                    to=""
                    className="text-danger font-weight-bold"
                    onClick={() => {
                      removeitem(eventId);
                    }}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
          <tr className="">
            <td colSpan="6 " className="text-center pt-4">
              {" "}
              <button className="btn btn-success">Update cart</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-5">
        <h2>Buyer's Details</h2>
        <form>
          <div>
            <label>
              Name <span className="text-danger">*</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-control"
              name="name"
              value={userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              Phone <span className="text-danger">*</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-control"
              name="phone"
              value={user ? user.phone : ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              Email Address <span className="text-danger">*</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              value={user ? user.email : ""}
              onChange={handleChange}
            />
          </div>
        </form>
        <div>
          <div className="mt-5">
            <div>{message}</div>
            <h2>Your Order</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ title, quantity, price, total }, index) => {
                  return (
                    <tr key={index}>
                      <td>{title}</td>
                      <td>{quantity}</td>
                      <td>{total}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="font-weight-bold">Grand Total</td>
                  <td></td>
                  <td>
                    <b>
                      {cart.reduce((acc, item) => {
                        return acc + item.total;
                      }, 0)}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <button onClick={placeOrder} className="btn btn-success">
          Place order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
