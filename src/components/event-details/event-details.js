import React, { useEffect, useState, useContext } from "react";
import "./event-details.css";
import { Link } from "react-router-dom";
import { SERVER_URL, SET_LOADING, SET_CART } from "../helpers/constant";
import { myContext } from "../../App";
import axios from "axios";
import Loading from "../loading/Loading";
import formatDate from "../helpers/formatDate";

function Eventdetails(props) {
  let id = props.match.params.id;
  // const dispatch = useDispatch();
  const { state, dispatch } = useContext(myContext);
  const { loading, cart, user, ticketEvents } = state;
  const [event, setEvent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [message, setMessage] = useState("");

  //check for cart info
  useEffect(() => {
    checkEvents();
  });

  //check if there are events already before fetching
  const checkEvents = () => {
    if (!user) {
      fetchEvent();
    } else {
      getEventFromState();
    }
    checkTicketInCart(id);
  };

  //fetch user info when app starts
  const fetchEvent = async () => {
    const url = SERVER_URL + "/api/event/" + id;
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        setEvent(data);
        dispatch({ type: SET_LOADING, payload: false });
      }
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
      console.log(error);
    }
  };

  //fetch event info from the state
  const getEventFromState = () => {
    const event = ticketEvents.find((item) => item._id === id);
    setEvent(event);
  };

  //add event to cart
  const addToCart = (event, quantity) => {
    if (quantity.length < 1) {
      setMessage("Please select number of tickets");
      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    } else {
      const total = Number(event.price) * Number(quantity);
      const ticket = {
        eventId: event._id,
        quantity: quantity,
        price: event.price,
        title: event.title,
        total: total,
      };
      cart.push(ticket);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: SET_CART, payload: cart });
      checkTicketInCart(event._id);
    }
  };

  //check if ticket is in the cart already
  const checkTicketInCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const index = cart.findIndex((item) => item.eventId === id);
    index >= 0 ? setIsInCart(true) : setIsInCart(false);
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const removeFromCart = (id) => {
    const index = cart.findIndex((item) => item.eventId === id);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: SET_CART, payload: cart });
    checkTicketInCart(id);
  };

  if (loading) {
    return (
      <div className="event-details mt-5">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mt-5 event-details">
      <div className=" ">
        <div className="row bg-light py-4">
          <div className="col-lg-8 col-12">
            <img src={`${SERVER_URL}/${event.image}`} alt="" />
          </div>
          <div className="col-lg-4 col-12">
            <h3>{formatDate(event.date)}</h3>
            <p>{event.title}</p>
            <p>
              {event.planner ? event.planner : ""}{" "}
              <span>
                <Link to={event.social ? event.social : ""}>
                  Follow <i className="fa fa-twitter" aria-hidden="true"></i>
                </Link>
              </span>
            </p>
            <h4>Amount: ₦{event.price ? event.price : "Free event"}</h4>
          </div>
        </div>

        <div className="row bg-light py-4">
          <div className="col-lg-8 col-12"></div>
          <div className="col-lg-4 col-12 border-bottom-0">
            {!isInCart ? (
              <div>
                {" "}
                <button
                  className="add-to-cart p-1 rounded"
                  onClick={() => {
                    addToCart(event, quantity);
                  }}
                >
                  Add to cart
                </button>{" "}
                <span>
                  <div className="form-group quantity ml-2">
                    <select
                      id="number"
                      name="number"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="1">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>{" "}
                  <b>Tickets</b>
                </span>
              </div>
            ) : (
              <div>
                <Link to="/checkout" className=" btn btn-primary mr-2">
                  Checkout
                </Link>
                <span>
                  <button
                    className="remove-from-cart btn btn-danger"
                    onClick={() => {
                      removeFromCart(event._id);
                    }}
                  >
                    Remove
                  </button>
                </span>
              </div>
            )}
            <div className="text-danger">{message}</div>
          </div>
        </div>

        <div className="mt-5 ">
          <h4 className="mt-4">About this event</h4>
          <p className="mt-4">{event.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Eventdetails;
