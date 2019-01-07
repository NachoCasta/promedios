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
import MenuItem from "@material-ui/core/MenuItem";

import Grid from "@material-ui/core/Grid";

//import DeleteIcon from "@material-ui/icons/Delete";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import { titleCase, toPerc, toFloat } from "./utils.js";

const CustomTableCell = withStyles(theme => ({
  /*head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },*/
  body: {
    padding: "0px 24px"
  }
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
  const { classes, children, onClick, label, ...rest } = props;

  return (
    <Tooltip title={label} className={classes.tooltip}>
      <IconButton
        className={classes.button}
        onClick={onClick}
        aria-label={label}
        {...rest}
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
  numberField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 50
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: "100%"
  },
  tipoField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 100
  },
  input: {
    padding: "6px 12px",
    fontSize: "0.8125rem"
  },
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  item: {
    paddingLeft: "40px"
  },
  menu: {}
});

function ListaNotasComponent(props) {
  const { children, classes, actions, editingRamo } = props;
  return (
    <Paper className={classes.root}>
      <ListaNotasMenu>{actions}</ListaNotasMenu>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Evaluación</CustomTableCell>
              <CustomTableCell>Ponderación</CustomTableCell>
              <CustomTableCell>{editingRamo ? "Tipo" : "Nota"}</CustomTableCell>
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
    editingRamo,
    editingNotas,
    onChangeNota,
    onChangeNombre,
    onChangePonderacion,
    onChangeTipo,
    children,
    classes,
    tipo
  } = props;
  return (
    <React.Fragment>
      <TableRow selected className={classes.selected}>
        <CustomTableCell>
          {editingRamo ? (
            <TextInputField
              value={titleCase(nombre)}
              max={7}
              onChange={onChangeNombre}
            />
          ) : (
            titleCase(nombre)
          )}
        </CustomTableCell>
        <CustomTableCell>
          {editingRamo ? (
            <NumberInputField
              value={ponderacion}
              onChange={onChangePonderacion}
            />
          ) : (
            toPerc(ponderacion)
          )}
        </CustomTableCell>
        <CustomTableCell>
          {editingNotas && !children ? (
            <NumberInputField value={nota} onChange={onChangeNota} />
          ) : (
            !editingRamo && toFloat(nota)
          )}
          {editingRamo && (
            <TipoInputField value={tipo} onChange={onChangeTipo} />
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
  const {
    nombre,
    ponderacion,
    nota,
    classes,
    editingRamo,
    editingNotas,
    onChangeNota,
    onChangeNombre,
    onChangePonderacion,
    input
  } = props;
  return (
    <TableRow>
      <CustomTableCell className={classes.item}>
        {editingRamo ? (
          <TextInputField
            value={titleCase(nombre)}
            max={7}
            onChange={onChangeNombre}
          />
        ) : (
          titleCase(nombre)
        )}
      </CustomTableCell>
      <CustomTableCell className={classes.item}>
        {editingRamo && input ? (
          <NumberInputField
            value={ponderacion}
            onChange={onChangePonderacion}
          />
        ) : (
          toPerc(ponderacion)
        )}
      </CustomTableCell>
      <CustomTableCell className={classes.item}>
        {editingNotas ? (
          <NumberInputField value={nota} max={7} onChange={onChangeNota} />
        ) : (
          !editingRamo && toFloat(nota)
        )}
      </CustomTableCell>
    </TableRow>
  );
}

ListaNotasItemComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const NumberInputField = withStyles(styles)(({ classes, ...rest }) => (
  <TextField
    id="standard-bare"
    className={classes.numberField}
    inputProps={{ className: classes.input }}
    variant="outlined"
    {...rest}
  />
));

const TextInputField = withStyles(styles)(({ classes, ...rest }) => (
  <TextField
    id="standard-bare"
    className={classes.textField}
    inputProps={{ className: classes.input }}
    variant="outlined"
    {...rest}
  />
));

const tipos = [
  { value: "porcentaje", label: "Porcentaje" },
  { value: "iguales", label: "Iguales" },
  { value: "partes", label: "Partes" },
  { value: "unico", label: "Unico" }
];

const TipoInputField = withStyles(styles)(({ classes, ...rest }) => (
  <TextField
    id="standard-bare"
    select
    className={classes.tipoField}
    inputProps={{ className: classes.input }}
    variant="outlined"
    SelectProps={{
      MenuProps: {
        className: classes.menu
      }
    }}
    {...rest}
  >
    {tipos.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
));

const ListaNotas = withStyles(styles)(ListaNotasComponent);
const ListaNotasConjunto = withStyles(styles)(ListaNotasConjuntoComponent);
const ListaNotasItem = withStyles(styles)(ListaNotasItemComponent);

export { ListaNotas, ListaNotasConjunto, ListaNotasItem };
