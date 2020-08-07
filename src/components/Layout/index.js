import React from "react";
import Header from "./Header";

function index({ children }) {
  return (
    <>
      <Header />
      <main>
        <section className="content">{children}</section>
        <section className="profile">profile</section>
      </main>
    </>
  );
}

export default index;
