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

const Menu = ({ classes, pages, handleSelectPage }) => (
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
      {pages.map(page => (
        <ListItem
          button
          divider
          key={page.id}
          onClick={() => handleSelectPage(page.id)}
        >
          <ListItemIcon>
            <page.icon />
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
