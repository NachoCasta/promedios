import React from "react";

import { Route } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import background from "assets/img/landing-bg.jpg";

function MyParallax(props) {
	const { classes } = props;
	return (
		<Parallax small className={classes.parallax} filter image={background}>
			<Route
				exact
				path="/"
				render={() => (
					<div className={classes.container}>
						<GridContainer>
							<GridItem xs={12} sm={12} md={6}>
								<h1 className={classes.title}>
									Calcula tu promedio facilmente.
								</h1>
								<h4>
									Simplemente ingresa los ramos que tienes este semestre y sus
									respectivas ponderaciones (en caso de que no existan ya),
									ingresa tus notas y ve tu progreso a lo largo del semestre.
								</h4>
							</GridItem>
						</GridContainer>
					</div>
				)}
			/>
		</Parallax>
	);
}

export default withStyles(landingPageStyle)(MyParallax);
