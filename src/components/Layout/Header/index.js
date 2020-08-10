import React from "react";
import "./index.scss";

function index() {
  return (
    <header className="header-container">
      <div className="inner">
        <div className="left">PLACON</div>
        <div className="right">
          <figure className="magnifier"></figure>
          <figure className="mailbox"></figure>
        </div>
      </div>
    </header>
  );
}

export default index;
