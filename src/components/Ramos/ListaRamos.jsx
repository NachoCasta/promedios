import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Grid from "@material-ui/core/Grid";

const styles = theme => ({
	root: {
		width: "100%",
		marginLeft: "0px"
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
});

function ListaRamosComponent(props) {
	const { classes, children } = props;
	return <div className={classes.root}>{children}</div>;
}

ListaRamosComponent.propTypes = {
	classes: PropTypes.object.isRequired
};

function ListaRamosItemComponent(props) {
	const { sigla, nombre, nota, classes, children, ...rest } = props;
	return (
		<ExpansionPanel {...rest}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Grid container>
					<Grid item xs={6} sm={3} md={3}>
						<Typography className={classes.heading}>
							{sigla}
						</Typography>
					</Grid>
					<Grid item xs={6} sm={6} md={6}>
						<Typography className={classes.heading}>
							{nombre}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3} md={3}>
						<Typography className={classes.heading}>
							{nota}
						</Typography>
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>{children}</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

ListaRamosItemComponent.propTypes = {
	classes: PropTypes.object.isRequired
};

const ListaRamos = withStyles(styles)(ListaRamosComponent);
const ListaRamosItem = withStyles(styles)(ListaRamosItemComponent);

export { ListaRamos, ListaRamosItem };
