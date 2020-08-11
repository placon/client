import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import PrivateRoute from "./components/PrivateRoute";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import PostWritePage from "./pages/post/postWrite/PostWritePage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/postWrite" component={PostWritePage} />
      </Switch>
    </>
  );
}

export default App;
