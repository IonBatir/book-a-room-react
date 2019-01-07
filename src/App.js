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

const menus = [
  {
    id: 0,
    label: "Hotels",
    icon: LocationCity,
    rows: [
      { id: "name", numeric: false, disablePadding: true, label: "Name" },
      { id: "stars", numeric: true, disablePadding: false, label: "Stars" },
      { id: "floors", numeric: true, disablePadding: false, label: "Floors" },
      {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Address"
      },
      { id: "city", numeric: false, disablePadding: false, label: "City" },
      { id: "options", numeric: false, disablePadding: false, label: "Options" }
    ]
  },
  { id: 1, label: "Rooms", icon: Hotel }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      menu: 0
    };
  }

  handleSelectMenu = menu => this.setState({ menu });

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Drawer menus={menus} handleSelectMenu={this.handleSelectMenu} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Table menu={menus.find(menu => menu.id === this.state.menu)} />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
