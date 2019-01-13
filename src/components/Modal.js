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
    this.state = { form: {}, loaded: false, editMode: false };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item && !state.loaded)
      return {
        form: props.item,
        loaded: true,
        editMode: true
      };
    if (!props.item && state.loaded) return { editMode: false, loaded: false };
    return null;
  }

  handleChange = name => event =>
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target ? event.target.value : event
      }
    });

  handleSubmit = () => {
    const { form } = this.state;

    this.state.editMode ? this.props.editItem(form) : this.props.addItem(form);
    this.props.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ form: {} });
    this.props.handleCloseModal();
  };

  checkFields = () => {
    for (let field of this.props.fields) {
      if (typeof this.state.form[field.id] === "undefined") return true;
    }
    return false;
  };

  render() {
    const { classes, open, fields } = this.props,
      { form, editMode } = this.state;
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
                  case "date":
                    return (
                      <TextField
                        className={classes.formControl}
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={form[field.id]}
                        type="date"
                        onChange={this.handleChange(field.id)}
                        margin="normal"
                      />
                    );
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
            <Button
              onClick={() => this.handleSubmit()}
              color="primary"
              disabled={this.checkFields()}
            >
              {editMode ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Modal);
