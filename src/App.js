import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Header, Drawer } from "./components/layouts";

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Drawer />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>Main</h1>
    </main>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
