import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Auth from "./components/auth";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import PostWritePage from "./pages/post/postWrite/PostWritePage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={Auth(SignupPage, false)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/postWrite" component={Auth(PostWritePage, true)} />
      </Switch>
    </>
  );
}

export default App;
