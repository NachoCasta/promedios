import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

const dashboardRoutes = [];

const styles = { };

function NavBar(props) {

  return (
    <Header
      color="transparent"
      routes={dashboardRoutes}
      brand="TuPromedio"
      rightLinks={<HeaderLinks />}
      fixed
      changeColorOnScroll={{
        height: 50,
        color: "white"
      }}
    />
  );
}

export default withStyles(styles)(NavBar);