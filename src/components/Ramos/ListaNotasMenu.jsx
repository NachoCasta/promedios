import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import ReorderIcon from "@material-ui/icons/Reorder";
import SaveIcon from "@material-ui/icons/Save";
import AddCircle from "@material-ui/icons/AddCircle";
import Delete from "@material-ui/icons/Delete";

import { MenuButton } from "./ListaNotas.jsx";

export default function ListaNotasMenu(props) {
  const {
    editingRamo,
    editingNotas,
    sortingRamo,
    onClickGuardarNotas,
    onClickCancelNotas,
    onClickEditarNotas,
    onClickGuardarRamo,
    onClickOrdenar,
    onClickCancelRamo,
    onClickEditarRamo,
    onClickBorrar,
    onClickAgregar
  } = props;
  return (
    <React.Fragment>
      {editingNotas ? (
        <React.Fragment>
          <Guardar onClick={onClickGuardarNotas} />
          <Cancelar onClick={onClickCancelNotas} />
        </React.Fragment>
      ) : (
        !editingRamo && <Editar onClick={onClickEditarNotas} />
      )}
      {editingRamo ? (
        <React.Fragment>
          <Guardar onClick={onClickGuardarRamo} />
          <Agregar onClick={onClickAgregar} />
          <Ordenar sortingRamo={sortingRamo} onClick={onClickOrdenar} />
          <Cancelar onClick={onClickCancelRamo} />
        </React.Fragment>
      ) : (
        !editingNotas && (
          <Mas>
            <MenuItem onClick={onClickEditarRamo}>Editar plantilla</MenuItem>
            <MenuItem onClick={onClickBorrar}>Borrar ramo</MenuItem>
          </Mas>
        )
      )}
    </React.Fragment>
  );
}

class Mas extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <MenuButton
          label="Más"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </MenuButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.children}
        </Menu>
      </React.Fragment>
    );
  }
}

const Guardar = props => (
  <MenuButton label="Guardar" {...props}>
    <SaveIcon />
  </MenuButton>
);

export const Agregar = props => (
  <MenuButton label="Agregar" {...props}>
    <AddCircle />
  </MenuButton>
);

export const Eliminar = ({ color, ...props }) => (
  <MenuButton label="Eliminar" {...props}>
    <Delete color={color} />
  </MenuButton>
);

const Ordenar = ({ sortingRamo, ...rest }) => (
  <MenuButton label="Cambiar orden" {...rest}>
    <ReorderIcon color={sortingRamo ? "primary" : ""} />
  </MenuButton>
);

const Cancelar = props => (
  <MenuButton label="Cancelar" {...props}>
    <CancelIcon />
  </MenuButton>
);

const Editar = props => (
  <MenuButton label="Editar" {...props}>
    <EditIcon />
  </MenuButton>
);
