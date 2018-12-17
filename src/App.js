import React, { Component } from 'react';
import './App.css';

import "assets/scss/material-kit-react.scss";

import { Router, Route } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import { 
  NavBar,
  LandingPage,
  ProfilePage,
  LoginPage,
  Footer
} from "./components";


const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={LandingPage} />
          <Route path="/mispromedios" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
