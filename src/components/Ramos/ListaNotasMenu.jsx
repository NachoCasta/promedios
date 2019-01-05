import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import { MenuButton } from "./ListaNotas.jsx";

export class Mas extends React.Component {
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

export const Guardar = props => (
  <MenuButton label="Guardar" {...props}>
    <SaveIcon />
  </MenuButton>
);

export const Cancelar = props => (
  <MenuButton label="Cancelar" {...props}>
    <CancelIcon />
  </MenuButton>
);

export const Editar = props => (
  <MenuButton label="Editar" {...props}>
    <EditIcon />
  </MenuButton>
);
