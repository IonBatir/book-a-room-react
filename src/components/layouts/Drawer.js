import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { LocationCity } from "@material-ui/icons";
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

const Menu = ({ classes }) => (
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
      {[{ id: 0, label: "Hotels", icon: LocationCity }].map(menu => (
        <ListItem button divider key={menu.id}>
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
