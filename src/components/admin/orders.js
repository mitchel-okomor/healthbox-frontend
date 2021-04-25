import React from "react";

function Orders() {
  return (
    <div>
      {" "}
      <ul class="list-group mb-5">
        <a class="list-group-item list-group-item-action" href="#">
          My List Item One
          <button class="btn-success btn-sm" style={{ float: "right" }}>
            EDIT
          </button>
          &nbsp&nbsp
          <button class="btn-danger btn-sm mr-2" style={{ float: "right" }}>
            DELETE
          </button>
        </a>
      </ul>
    </div>
  );
}

export default Orders;
