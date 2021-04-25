import React, { useContext } from "react";
import { myContext } from "../../App";
import { SET_CART } from "../helpers/constant";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const { state, dispatch } = useContext(myContext);
  const { cart } = state;

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

  return (
    <div className="checkout container mt-5">
      {cart.length < 1 ? (
        <div>Cart is empty</div>
      ) : (
        <table className="table text-center table-bordered">
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
              const localQuantitty = quantity;
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
                      {localQuantitty}{" "}
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
              <td colSpan="6">
                {" "}
                <button className="btn btn-success">Update cart</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {cart.length < 1 ? (
        <div className="text-center mt-5">
          <Link className="btn btn-success" to="/events">
            See available events
          </Link>
        </div>
      ) : (
        <div className="text-center mt-5">
          <Link className="btn btn-primary" to="/checkout">
            Proceed to checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
