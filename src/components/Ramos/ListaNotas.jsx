import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import Grid from "@material-ui/core/Grid";

//import DeleteIcon from "@material-ui/icons/Delete";

import { lighten } from "@material-ui/core/styles/colorManipulator";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {}
}))(TableCell);

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    width: "100%"
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary,
    position: "relative",
    float: "right",
    align: "right"
  },
  title: {
    flex: "0 0 auto"
  }
});

let ListaNotasMenuComponent = props => {
  const { editing, classes, children } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: editing
      })}
    >
      <Grid justify="space-between" container className={classes.grid}>
        <Grid item className={classes.title}>
          <Typography variant="h4" id="tableTitle">
            Notas
          </Typography>
        </Grid>
        <Grid item className={classes.actions}>
          {children}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

ListaNotasMenuComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export const ListaNotasMenu = withStyles(toolbarStyles)(
  ListaNotasMenuComponent
);

const buttonStyles = theme => ({});

let MenuButtonComponent = props => {
  const { classes, children, onClick, label } = props;

  return (
    <Tooltip title={label} className={classes.tooltip}>
      <IconButton
        className={classes.button}
        onClick={onClick}
        aria-label={label}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

MenuButtonComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export const MenuButton = withStyles(buttonStyles)(MenuButtonComponent);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  table: {
    minWidth: 500
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50
  },
  input: {
    padding: "6px 12px"
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
  const { children, classes, actions } = props;
  return (
    <Paper className={classes.root}>
      <ListaNotasMenu>{actions}</ListaNotasMenu>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Evaluación</CustomTableCell>
              <CustomTableCell>Ponderación</CustomTableCell>
              <CustomTableCell>Nota</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </Paper>
  );
}
ListaNotasComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function ListaNotasConjuntoComponent(props) {
  const {
    nombre,
    ponderacion,
    nota,
    editingNotas,
    onChangeNota,
    children,
    classes
  } = props;
  return (
    <React.Fragment>
      <TableRow selected className={classes.selected}>
        <CustomTableCell>{titleCase(nombre)}</CustomTableCell>
        <CustomTableCell>{toPerc(ponderacion)}</CustomTableCell>

        <CustomTableCell>
          {editingNotas && !children ? (
            <TextField
              id="standard-bare"
              className={classes.textField}
              inputProps={{ className: classes.input }}
              value={nota}
              max={7}
              margin="normal"
              onChange={onChangeNota}
              variant="filled"
            />
          ) : (
            toFloat(nota)
          )}
        </CustomTableCell>
      </TableRow>
      {children}
    </React.Fragment>
  );
}

ListaNotasConjuntoComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function ListaNotasItemComponent(props) {
  const { nombre, ponderacion, nota, classes, editing, onChangeNota } = props;
  return (
    <TableRow>
      <CustomTableCell className={classes.item}>
        {titleCase(nombre)}
      </CustomTableCell>
      <CustomTableCell className={classes.item}>
        {toPerc(ponderacion)}
      </CustomTableCell>
      <CustomTableCell className={classes.item}>
        {editing ? (
          <TextField
            id="standard-bare"
            className={classes.textField}
            inputProps={{ className: classes.input }}
            value={nota}
            max={7}
            margin="normal"
            onChange={onChangeNota}
            variant="filled"
          />
        ) : (
          toFloat(nota)
        )}
      </CustomTableCell>
    </TableRow>
  );
}

ListaNotasItemComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

ListaNotasItemComponent.defaultProps = {
  editing: false
};

function titleCase(str) {
  var splitStr = str
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function toPerc(n) {
  return (Math.round(n * 10) / 10).toString() + " %";
}

function toFloat(s) {
  return s ? parseFloat(s).toFixed(1) : s;
}

const ListaNotas = withStyles(styles)(ListaNotasComponent);
const ListaNotasConjunto = withStyles(styles)(ListaNotasConjuntoComponent);
const ListaNotasItem = withStyles(styles)(ListaNotasItemComponent);

export { ListaNotas, ListaNotasConjunto, ListaNotasItem };
