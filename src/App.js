import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Auth from "./components/auth";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/" component={Auth(HomePage, true)} />
        <Route exact path="/signup" component={Auth(SignupPage, false)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/profile" component={Auth(ProfilePage, true)} />
      </Switch>
    </>
  );
}

export default App;
