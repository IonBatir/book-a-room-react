import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../consts";

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const Menu = ({ classes, menus, handleSelectMenu }) => (
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper
    }}
    anchor="left"
  >
    <div className={classes.toolbar} />
    <Divider />
    <List>
      {menus.map(menu => (
        <ListItem
          button
          divider
          key={menu.id}
          onClick={() => handleSelectMenu(menu.id)}
        >
          <ListItemIcon>
            <menu.icon />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  </Drawer>
);

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
