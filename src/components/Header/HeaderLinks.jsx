/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

import { logout } from "../LoginPage/auth.js";

function HeaderLinks({ ...props }) {
  const { classes, user } = props;
  return (
    <List className={classes.list}>
      {user && (
        <ListItem className={classes.listItem}>
          <Link to="/mispromedios" className={classes.navLink}>
            Mis promedios
          </Link>
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        {user ? (
          <Button
            color="transparent"
            onClick={() => logout()}
            className={classes.navLink}
          >
            Cerrar sesión
          </Button>
        ) : (
          <Link to="/login" className={classes.navLink}>
            Iniciar sesión
          </Link>
        )}
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
