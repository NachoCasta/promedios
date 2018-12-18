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

import { ListaRamos, ListaRamosItem } from "components/Ramos/ListaRamos.jsx"
import { ListaNotas, ListaNotasConjunto, ListaNotasItem } from "components/Ramos/ListaNotas.jsx"


function ProfilePage(props){
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
                    <img src={user.photoURL} alt="foto-perfil" className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.displayName}</h3>
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
                <ListaRamos>
                  <ListaRamosItem sigla="MAT1610" nombre="Calculo I" nota={5.8}>
                    <ListaNotas>
                      <ListaNotasConjunto nombre="Interrogaciones" ponderacion="60%" nota="5.4">
                        <ListaNotasItem nombre="Interrogación 1" ponderacion="33.3%" nota="6.0" />
                        <ListaNotasItem nombre="Interrogación 2" ponderacion="33.3%" nota="4.5" />
                        <ListaNotasItem nombre="Interrogación 3" ponderacion="33.3%" nota="5.7" />
                      </ListaNotasConjunto>
                      <ListaNotasConjunto nombre="Laboratorios" ponderacion="10%" nota="6.0">
                        <ListaNotasItem nombre="Laboratorio 1" ponderacion="20%" nota="6.0" />
                        <ListaNotasItem nombre="Laboratorio 2" ponderacion="20%" nota="5.0" />
                        <ListaNotasItem nombre="Laboratorio 3" ponderacion="20%" nota="5.6" />
                        <ListaNotasItem nombre="Laboratorio 4" ponderacion="20%" nota="6.4" />
                        <ListaNotasItem nombre="Laboratorio 5" ponderacion="20%" nota="7.0" />
                      </ListaNotasConjunto>
                      <ListaNotasConjunto nombre="Examen" ponderacion="30%" nota="6.5" />
                    </ListaNotas>
                  </ListaRamosItem>
                  <ListaRamosItem sigla="MAT1203" nombre="Algebra Lineal" nota={5.5}>
                    No cacho men.
                  </ListaRamosItem>
                </ListaRamos>
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
