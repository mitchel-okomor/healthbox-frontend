import React, { useContext } from "react";
import "./table.css";
import { Link } from "react-router-dom";
import { myContext } from "../../App";
import Loading from "../loading/Loading";
import axios from "axios";
import { SERVER_URL, SET_USER_EVENTS } from "../helpers/constant";

function Table() {
  const { state, dispatch } = useContext(myContext);
  const { loading, userEvents } = state;

  const handleDelete = (id) => {
    const url = SERVER_URL + "/api/event/" + id;
    dispatch({ type: SERVER_URL, payload: true });
    fetch(url, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200);
        console.log(res);
        const index = userEvents.findIndex((item) => item._id === id);
        userEvents.splice(index, 1);
        dispatch({ type: SET_USER_EVENTS, payload: userEvents });
        dispatch({ type: SERVER_URL, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SERVER_URL, payload: false });
      });
  };

  const handlePublish = (id) => {
    const url = SERVER_URL + "/api/publish/" + id;
    dispatch({ type: SERVER_URL, payload: true });
    axios(url, {
      method: "put",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200);
        const event = res.data;
        const index = userEvents.findIndex((item) => item._id === id);
        userEvents.splice(index, 1, event);
        dispatch({ type: SET_USER_EVENTS, payload: userEvents });
        dispatch({ type: SERVER_URL, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SERVER_URL, payload: false });
      });
  };

  const handleComplete = (id) => {
    const url = SERVER_URL + "/api/complete/" + id;
    dispatch({ type: SERVER_URL, payload: true });
    axios(url, {
      method: "put",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200);
        const event = res.data;
        const index = userEvents.findIndex((item) => item._id === id);
        userEvents.splice(index, 1, event);
        dispatch({ type: SET_USER_EVENTS, payload: userEvents });
        dispatch({ type: SERVER_URL, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SERVER_URL, payload: false });
      });
  };

  console.log(userEvents);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="admin-table">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Venue</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Publish</th>
            <th scope="col">Complete</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userEvents.map(
            (
              { title, venue, date, _id, isApproved, isPublished, isCompleted },
              index
            ) => {
              return (
                <tr key={_id}>
                  <th scope="row">{index + 1}</th>
                  <td>{title}</td>
                  <td>{venue}</td>
                  <td>{date}</td>
                  <td className="font-weigth-bold">
                    {isApproved === "true" ? "Approved" : "Pending Approval"}
                  </td>
                  <td>{isPublished === "true" ? "Published" : "Drafted"}</td>
                  <td>
                    {isCompleted === "true" ? "Completed" : "Uncompleted"}
                  </td>
                  <td>
                    <span>
                      <Link
                        className="btn btn-primary"
                        to={`/admin/edit-event/${_id}`}
                      >
                        Edit
                      </Link>
                    </span>
                    <span>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(_id);
                        }}
                      >
                        Delete
                      </button>
                    </span>
                    {isPublished === "false" ? (
                      <span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            handlePublish(_id);
                          }}
                        >
                          Publish
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            handlePublish(_id);
                          }}
                        >
                          Unpublish
                        </button>
                      </span>
                    )}
                    {isCompleted === "false" ? (
                      <span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            handleComplete(_id);
                          }}
                        >
                          Complete
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            handleComplete(_id);
                          }}
                        >
                          Uncomplete
                        </button>
                      </span>
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
