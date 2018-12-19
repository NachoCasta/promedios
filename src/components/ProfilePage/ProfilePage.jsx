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

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

import { Ramos } from "components/Ramos";

function ProfilePage(props) {
  const { classes, user } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={user.photoURL}
                      alt="foto-perfil"
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.name}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {/*
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken
                by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                performs and records all of his own music, giving it a warm,
                intimate feel with a solid groove structure.{" "}
              </p>
            </div>
            */}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Ramos user={user} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withStyles(profilePageStyle)(ProfilePage);
