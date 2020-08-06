import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ Component, ...rest }) {
  const isAuth = useSelector((state) => state.user);
  return (
    <>
      <Route render={isAuth ? <Component /> : <Redirect to="/login" />} />
    </>
  );
}

export default PrivateRoute;
