import React, { useContext } from "react";
import "./events.css";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../helpers/constant";

function Events() {
  const { state } = useContext(myContext);
  const { ticketEvents } = state;

  return (
    <div className="events container-fluid  p-5">
      <div className="row">
        {ticketEvents.map((event) => {
          if (event.isPublished === "true" && event.isCompleted === "false") {
            return (
              <div className="col-sm-4 col-lg-4 col-xl-4 col-xs-12">
                <Link to={`/event/${event._id}`}>
                  <div class="card mt-5">
                    <img
                      class="card-img-top"
                      src={`${SERVER_URL}/${event.image}`}
                      alt="cap"
                    />
                    <div class="card-body">
                      <h5 class="card-title text-success font-weight-bold">
                        {event.title}
                      </h5>
                      <p class="card-text">
                        <span>Venue: {event.venue}</span>
                        <span>Date: {event.date}</span>{" "}
                        <span>Time: {event.time}</span> <span></span>
                      </p>
                      <Link to={`/event/${event._id}`} class="btn btn-success">
                        View details
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
          return "";
        })}
      </div>{" "}
    </div>
  );
}

export default Events;
