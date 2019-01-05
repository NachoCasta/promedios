import React from "react";
import "./App.css";

import "assets/scss/material-kit-react.scss";

import { Router, Route } from "react-router-dom";
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
  const user = useUser();
  return (
    <Router history={history}>
      <div className="App">
        <NavBar />
        <Route path="/(|mispromedios)" component={MyParallax} />
        <Route exact path="/" component={LandingPage} />
        {user && (
          <Route
            path="/mispromedios"
            render={() => <ProfilePage user={user} />}
          />
        )}
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
