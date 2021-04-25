import React, { useContext, useCallback, useState, useEffect } from "react";
import "./edit.css";
import { myContext } from "../../App";
import { useParams } from "react-router-dom";
import history from "../services/history";
import axios from "axios";
import { SERVER_URL, SET_LOADING, SET_USER_EVENTS } from "../helpers/constant";
import Loading from "../loading/Loading";

const Edit = () => {
  let { _id } = useParams();
  // const dispatch = useDispatch();
  const { state, dispatch } = useContext(myContext);
  const { loading, user, userEvents } = state;

  //fetch user info when app starts
  const fetchEvent = useCallback(async () => {
    const url = SERVER_URL + "/api/event/" + _id;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setDate(data.date);
        setTime(data.time);
        setImage(data.image);
        setVenue(data.venue);
        setPrice(data.price);
      }
    } catch (error) {
      console.log(error);
    }
  }, [_id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "venue":
        setVenue(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "price":
        setPrice(e.target.price);
        break;
      case "image":
        setImage(e.target.files[0]);
        break;
      default:
        setTime(e.target.value);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("venue", venue);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("image", image);
    formData.append("userId", user._id);

    const url = SERVER_URL + "/api/event/" + _id;
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.patch(
        url,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
        {
          timeout: 30000,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const index = userEvents.findIndex((item) => item._id === _id);
        userEvents.splice(index, 1, data);
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_USER_EVENTS, payload: userEvents });
        history.goBack();
      }
    } catch (error) {
      console.log(error);
      setMessage("failed to save ");
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex justify-content-center mt-5 pt-5">
      <form onSubmit={handleEdit}>
        <h2 className="mb-5">Edit Event</h2> <br />
        <div className="input-groups">
          <label htmlFor="title">Event Title:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            className="form-control"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="venue">Venue:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="venue"
            id="venue"
            value={venue}
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="date">Date:</label>
          <br />
          <input
            className="form-control"
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="time">Time:</label>
          <br />
          <input
            className="form-control"
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={handleChange}
          />
        </div>
        <div className="input-groups">
          <label htmlFor="price">Price:</label>
          <br />
          <input
            className="form-control"
            type="price"
            name="price"
            id="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="input-groups mb-3">
          <button className="btn btn-success mt-2" type="submit">
            Submit
          </button>
        </div>
        <div className="mt-5 text-center">{message}</div>
      </form>
    </div>
  );
};

export default Edit;
