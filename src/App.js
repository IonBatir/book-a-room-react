import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  Restaurant,
  Wifi,
  DirectionsCar,
  LocalParking,
  LocalLaundryService
} from "@material-ui/icons";
import { Header, Drawer } from "./components/layouts";
import { Table, Snackbar } from "./components";
import { fetchItems, updateItem, addItem, deleteItem } from "./api";
import { menus } from "./consts";

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  spinner: {
    display: "block",
    position: "fixed",
    zIndex: 1031,
    top: 300,
    right: "calc(50% - 25px)"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openSnackbar: false,
      variantSnackbar: "",
      messageSnackbar: "",
      loading: false,
      menu: 0,
      data: []
    };
  }

  fetch = menuId => {
    this.setState({ loading: true });
    const currentMenu = menus.find(menu => menu.id === menuId);
    fetchItems(currentMenu.endpoint)
      .then(response => {
        let data;
        switch (currentMenu.id) {
          case 0:
            data = response.hotels.map(hotel => ({
              id: hotel.id,
              name: hotel.name,
              nr_stars: hotel.nr_stars,
              nr_floors: hotel.nr_floors,
              address: hotel.address,
              city: hotel.city,
              facilities: (
                <React.Fragment>
                  {hotel.restaurant === "1" && <Restaurant />}
                  {hotel.wifi === "1" && <Wifi />}
                  {hotel.car_hire === "1" && <DirectionsCar />}
                  {hotel.parking === "1" && <LocalParking />}
                  {hotel.laundry === "1" && <LocalLaundryService />}
                </React.Fragment>
              )
            }));
            break;
          default:
            data = response;
        }
        this.setState({ loading: false, data });
      })
      .catch(error => {
        this.setState({
          openSnackbar: true,
          variantSnackbar: "error",
          messageSnackbar:
            error.response.data.message ||
            "Sorry, something went wrong. Please try again!",
          data: [],
          loading: false
        });
      });
  };

  handleDeleteItems = items => {
    items.forEach(item => {
      this.setState({ loading: true });
      deleteItem(menus.find(menu => menu.id === this.state.menu).endpoint, item)
        .then(response => {
          this.setState({
            openSnackbar: true,
            variantSnackbar: "success",
            messageSnackbar: response.message,
            loading: false
          });
          this.fetch();
        })
        .catch(error => {
          this.setState({
            openSnackbar: true,
            variantSnackbar: "error",
            messageSnackbar:
              error.response.data.message ||
              "Sorry, something went wrong. Please try again!",
            loading: false
          });
        });
    });
  };

  componentDidMount() {
    this.fetch(this.state.menu);
  }

  handleSelectMenu = menu => {
    this.setState({ menu });
    this.fetch(menu);
  };

  handleCloseSnackbar = () => this.setState({ openSnackbar: false });

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Drawer menus={menus} handleSelectMenu={this.handleSelectMenu} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Table
            menu={menus.find(menu => menu.id === this.state.menu)}
            data={this.state.data}
            handleDeleteItems={this.handleDeleteItems}
          />
          {this.state.openSnackbar && (
            <Snackbar
              open={this.state.openSnackbar}
              variant={this.state.variantSnackbar}
              message={this.state.messageSnackbar}
              handleClose={this.handleCloseSnackbar}
            />
          )}
          {this.state.loading && (
            <CircularProgress className={classes.spinner} />
          )}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
