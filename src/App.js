import React from "react";
import "./App.css";

import "assets/scss/material-kit-react.scss";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import { useUser } from "components/Hooks/User.jsx";

import {
  NavBar,
  LandingPage,
  ProfilePage,
  LoginPage,
  MyParallax
} from "./components";

export const history = createBrowserHistory();

function App(props) {
  const { user, logged } = useUser();
  return (
    <Router history={history}>
      <div className="App">
        <NavBar />
        <Route path="/(|mispromedios)" component={MyParallax} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/mispromedios"
            render={() =>
              logged ? <ProfilePage user={user} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/login"
            render={() =>
              logged ? <Redirect to="/mispromedios" /> : <LoginPage />
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
