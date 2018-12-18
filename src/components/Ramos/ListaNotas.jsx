import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  item: {
    paddingLeft: "40px"
  }
});

function ListaNotasComponent(props) {
  const { children, classes } = props;
  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Evaluación</TableCell>
            <TableCell>Ponderación</TableCell>
            <TableCell>Nota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}
ListaNotasComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function ListaNotasConjuntoComponent(props) {
  const { children } = props;
  const { nombre, ponderacion, nota } = props;
  return (
    <React.Fragment>
      <TableRow selected>
        <TableCell>{nombre}</TableCell>
        <TableCell>{ponderacion}</TableCell>
        <TableCell>{nota}</TableCell>
      </TableRow>
      {children}
    </React.Fragment>
  );
}

ListaNotasConjuntoComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function ListaNotasItemComponent(props) {
  const { nombre, ponderacion, nota, classes } = props;
  return (
    <TableRow>
      <TableCell className={classes.item}>{nombre}</TableCell>
      <TableCell className={classes.item}>{ponderacion}</TableCell>
      <TableCell className={classes.item}>{nota}</TableCell>
    </TableRow>
  );
}

ListaNotasItemComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const ListaNotas = withStyles(styles)(ListaNotasComponent);
const ListaNotasConjunto = withStyles(styles)(ListaNotasConjuntoComponent);
const ListaNotasItem = withStyles(styles)(ListaNotasItemComponent);

export { ListaNotas, ListaNotasConjunto, ListaNotasItem };
