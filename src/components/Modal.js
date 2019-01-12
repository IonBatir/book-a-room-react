import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@material-ui/core";
import { AutoSelect } from "./";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100%"
  }
});

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.item ? { form: props.item } : { form: {} };
  }

  handleChange = name => event => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target ? event.target.value : event
      }
    });
    console.log(this.state.form);
  };

  handleSubmit = () => {
    const { form } = this.state;
    const { currentPage } = this.props;
    let newItem = {};
    console.log(form);
    switch (currentPage.id) {
      case 0:
        newItem = {
          name: form.name,
          nr_stars: form.stars,
          nr_floors: form.floors,
          address: form.address,
          city_id: form.city
        };

        break;
      default:
        return null;
    }
    this.props.addItem(this.props.currentPage.endpoint, newItem);
    // this.props.editMode
    //   ? this.props.editExercise(form, this.props.form.id)
    //   : this.props.addExercise(form);
    this.props.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ form: {} });
    this.props.handleCloseModal();
  };

  render() {
    const { classes, editMode, open, fields } = this.props,
      { form } = this.state;
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => this.handleCloseModal()}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">
            {editMode ? "Edit" : "Add"} item
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please {editMode ? "edit" : "fill"} the form below.
            </DialogContentText>
            <form className={classes.root}>
              {fields.map(field => {
                switch (field.type) {
                  case "number":
                    return (
                      <TextField
                        className={classes.formControl}
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        value={form[field.id]}
                        type="number"
                        onChange={this.handleChange(field.id)}
                        margin="normal"
                      />
                    );
                  case "string":
                    return (
                      <TextField
                        className={classes.formControl}
                        key={field.id}
                        id={field.id}
                        value={form[field.id]}
                        label={field.label}
                        onChange={this.handleChange(field.id)}
                        margin="normal"
                      />
                    );
                  case "select":
                    return (
                      <AutoSelect
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        value={form[field.id]}
                        onChange={this.handleChange(field.id)}
                        multi={false}
                        options={field.options}
                      />
                    );
                  case "multi-select":
                    return (
                      <AutoSelect
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        value={form[field.id]}
                        onChange={this.handleChange(field.id)}
                        multi
                        options={field.options}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleSubmit()} color="primary">
              {editMode ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Modal);
