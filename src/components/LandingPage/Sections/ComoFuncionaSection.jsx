import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Add from "@material-ui/icons/PlaylistAdd";
import Notas from "@material-ui/icons/Done";
import Sigue from "@material-ui/icons/ShowChart";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ComoFuncionaSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Cómo funciona</h2>
            <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Ingresa tus ramos"
                description="Si alguien ya lo ingreso antes, puedes usar una plantilla ya creada. En caso contrario, debes ingresar las evaluaciones y sus respectivas ponderaciones."
                icon={Add}
                iconColor="primary"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Agrega tus notas"
                description="Ingresa las notas que ya tengas para ver cuál es tu promedio actual."
                icon={Notas}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Sigue tu progreso"
                description="Sigue tu progreso a lo largo del semestre. También puedes ver qué nota necesitas en tus evaluaciones restantes para aprobar."
                icon={Sigue}
                iconColor="primary"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ComoFuncionaSection);
