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
import { Table, Snackbar, Modal } from "./components";
import { fetchItems, updateItem, addItem, deleteItem } from "./api";
import { pages } from "./consts";

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
      page: 0,
      data: [],
      editItem: ""
    };
  }

  fetch = pageId => {
    this.setState({ loading: true });
    const currentPage = pages.find(page => page.id === pageId);
    fetchItems(currentPage.endpoint)
      .then(response => {
        let data;
        switch (currentPage.id) {
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

  handleStartAdding = () => this.setState({ editItem: "", openModal: true });

  handleAddItem = form => {
    this.setState({ loading: true });
    const currentPage = pages.find(page => page.id === this.state.page);
    let newItem = {};
    switch (currentPage.id) {
      case 0:
        newItem = {
          name: form.name,
          nr_stars: form.nr_stars,
          nr_floors: form.nr_floors,
          description: "",
          address: form.address,
          city_id: form.city.id,
          restaurant: form.facilities.find(item => item.id === 0) ? "1" : "0",
          wifi: form.facilities.find(item => item.id === 1) ? "1" : "0",
          car_hire: form.facilities.find(item => item.id === 2) ? "1" : "0",
          parking: form.facilities.find(item => item.id === 3) ? "1" : "0",
          laundry: form.facilities.find(item => item.id === 4) ? "1" : "0"
        };
        break;
      default:
        return null;
    }
    addItem(currentPage.endpoint, newItem)
      .then(response => {
        this.setState({
          openSnackbar: true,
          variantSnackbar: "success",
          messageSnackbar: response.message,
          loading: false
        });
        this.fetch(currentPage.id);
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
  };

  handleStartEditing = item => {
    this.setState({ editItem: item[0], openModal: true });
  };

  handleEditItem = form => {
    this.setState({ loading: true });
    const currentPage = pages.find(page => page.id === this.state.page);
    let updatedItem = {};
    switch (currentPage.id) {
      case 0:
        updatedItem = {
          id: this.state.editItem,
          name: form.name,
          nr_stars: form.nr_stars,
          nr_floors: form.nr_floors,
          description: "",
          address: form.address,
          city_id: form.city.id,
          restaurant: form.facilities.find(item => item.id === 0) ? "1" : "0",
          wifi: form.facilities.find(item => item.id === 1) ? "1" : "0",
          car_hire: form.facilities.find(item => item.id === 2) ? "1" : "0",
          parking: form.facilities.find(item => item.id === 3) ? "1" : "0",
          laundry: form.facilities.find(item => item.id === 4) ? "1" : "0"
        };
        break;
      default:
        return null;
    }
    updateItem(currentPage.endpoint, updatedItem)
      .then(response => {
        this.setState({
          openSnackbar: true,
          variantSnackbar: "success",
          messageSnackbar: response.message,
          loading: false,
          editItem: ""
        });
        this.fetch(currentPage.id);
      })
      .catch(error => {
        this.setState({
          openSnackbar: true,
          variantSnackbar: "error",
          messageSnackbar:
            error.response.data.message ||
            "Sorry, something went wrong. Please try again!",
          loading: false,
          editItem: ""
        });
      });
  };

  handleDeleteItems = items => {
    const currentPage = pages.find(page => page.id === this.state.page);
    items.forEach(item => {
      this.setState({ loading: true });
      deleteItem(currentPage.endpoint, item)
        .then(response => {
          this.setState({
            openSnackbar: true,
            variantSnackbar: "success",
            messageSnackbar: response.message,
            loading: false
          });
          this.fetch(currentPage.id);
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
    this.fetch(this.state.page);
  }

  handleSelectPage = page => {
    this.setState({ page });
    this.fetch(page);
  };

  handleCloseSnackbar = () => this.setState({ openSnackbar: false });

  handleOpenModal = () => this.setState({ openModal: true });

  handleCloseModal = () => this.setState({ openModal: false });

  render() {
    const { classes } = this.props;
    const currentPage = pages.find(page => page.id === this.state.page);
    const selectedItem = this.state.data.find(
      item => item.id === this.state.editItem
    );
    let editedItem;
    if (selectedItem) {
      switch (currentPage.id) {
        case 0:
          editedItem = {
            ...selectedItem,
            facilities: [],
            city: currentPage.fields
              .find(field => field.id === "city")
              .options.find(city => city.label === selectedItem.city)
          };
          break;
        default:
          return null;
      }
    }
    return (
      <div className={classes.root}>
        <Header />
        <Drawer
          pages={pages.map(page => ({
            id: page.id,
            label: page.label,
            icon: page.icon
          }))}
          handleSelectPage={this.handleSelectPage}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Table
            label={currentPage.label}
            rows={currentPage.rows}
            orderBy={currentPage.orderBy}
            data={this.state.data}
            handleStartEditing={this.handleStartEditing}
            handleDeleteItems={this.handleDeleteItems}
            handleStartAdding={this.handleStartAdding}
          />
          <Modal
            open={this.state.openModal}
            handleCloseModal={this.handleCloseModal}
            addItem={this.handleAddItem}
            editItem={this.handleEditItem}
            item={editedItem}
            fields={currentPage.fields}
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
