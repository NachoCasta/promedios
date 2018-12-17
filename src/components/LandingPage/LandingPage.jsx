import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ComoFuncionaSection from "./Sections/ComoFuncionaSection.jsx";

function LandingPage(props) {
  const { classes } = props;
  return (
    <div>
      <Parallax className={classes.parallax} filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Calcula tu promedio facilmente.</h1>
              <h4>
                Simplemente ingresa los ramos que tienes 
                este semestre y sus respectivas ponderaciones 
                (en caso de que no existan ya), ingresa tus notas
                y ve tu progreso a lo largo del semestre.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ComoFuncionaSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withStyles(landingPageStyle)(LandingPage);
