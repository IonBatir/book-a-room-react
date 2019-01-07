import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { LocationCity, Hotel } from "@material-ui/icons";
import { Header, Drawer } from "./components/layouts";
import { Table } from "./components";

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

const pages = [
  { id: 0, label: "Hotels", icon: LocationCity },
  { id: 1, label: "Rooms", icon: Hotel }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Drawer pages={pages} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Table />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
