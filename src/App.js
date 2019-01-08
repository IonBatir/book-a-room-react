import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  LocationCity,
  Hotel,
  RateReview,
  Restaurant,
  Wifi,
  DirectionsCar,
  LocalParking,
  LocalLaundryService
} from "@material-ui/icons";
import { Header, Drawer } from "./components/layouts";
import { Table, Snackbar } from "./components";
import { getHotels, deleteHotel } from "./api";

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

const menus = [
  {
    id: 0,
    label: "Hotels",
    icon: LocationCity,
    rows: [
      { id: "name", numeric: false, disablePadding: true, label: "Name" },
      { id: "nr_stars", numeric: true, disablePadding: false, label: "Stars" },
      {
        id: "nr_floors",
        numeric: true,
        disablePadding: false,
        label: "Floors"
      },
      {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Address"
      },
      { id: "city", numeric: false, disablePadding: false, label: "City" },
      {
        id: "facilities",
        numeric: false,
        disablePadding: false,
        label: "Facilities"
      }
    ],
    orderBy: "name"
  },
  {
    id: 1,
    label: "Rooms",
    icon: Hotel,
    rows: [
      { id: "hotel", numeric: false, disablePadding: true, label: "Hotel" },
      { id: "type", numeric: false, disablePadding: false, label: "Type" },
      { id: "number", numeric: false, disablePadding: false, label: "Number" },
      { id: "nr_floor", numeric: true, disablePadding: false, label: "Floor" },
      { id: "price", numeric: true, disablePadding: false, label: "Price" }
    ],
    orderBy: "hotel"
  },
  {
    id: 2,
    label: "Reviews",
    icon: RateReview,
    rows: [
      { id: "hotel", numeric: false, disablePadding: true, label: "Hotel" },
      {
        id: "customer",
        numeric: false,
        disablePadding: false,
        label: "Customer"
      },
      { id: "review", numeric: false, disablePadding: false, label: "Review" },
      { id: "mark", numeric: true, disablePadding: false, label: "Mark" },
      { id: "date", numeric: false, disablePadding: false, label: "Date" }
    ],
    orderBy: "hotel"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      variantSnackbar: "",
      messageSnackbar: "",
      loading: false,
      menu: 0,
      data: []
    };
  }

  resetSnackbar = () =>
    this.setState({
      openSnackbar: false,
      variantSnackbar: "",
      messageSnackbar: ""
    });

  fetch = () => {
    this.setState({ loading: true });
    getHotels()
      .then(response => {
        const data = response.hotels.map(hotel => ({
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
        this.setState({ loading: false, data });
      })
      .catch(error => {
        this.setState({
          openSnackbar: true,
          variantSnackbar: "error",
          messageSnackbar: "Sorry, something went wrong. Please try again!",
          loading: false
        });
      });
  };

  componentDidMount() {
    this.fetch();
  }

  handleSelectMenu = menu => this.setState({ menu });

  handleDeleteItems = items => {
    items.forEach(item => {
      this.resetSnackbar();
      this.setState({ loading: true });
      deleteHotel(item)
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
            messageSnackbar: "Sorry, something went wrong. Please try again!",
            loading: false
          });
        });
    });
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
