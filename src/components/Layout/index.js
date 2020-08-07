import React from "react";
import Header from "./Header";
import "./index.scss";

function index({ children }) {
  return (
    <>
      <Header />

      <main>
        <section className="content-section">{children}</section>
      </main>
    </>
  );
}

export default index;
