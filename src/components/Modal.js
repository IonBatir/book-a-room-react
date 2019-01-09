import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
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

  handleChange = name => event =>
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target.value
      }
    });

  handleSubmit = () => {
    const { form } = this.state;
    this.props.editMode
      ? this.props.editExercise(form, this.props.form.id)
      : this.props.addExercise(form);
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
                      
                    )
                  case "string":
                    return (
                      <TextField
                        className={classes.formControl}
                        id={field.id}
                        label={field.label}
                        onChange={this.handleChange(field.id)}
                        margin="normal"
                      />
                    );
                }
              })}
              {/* <FormControl className={classes.formControl} margin="normal">
                <InputLabel htmlFor="muscle-simple">Muscle</InputLabel>
                <Select
                  value={exercise.muscle}
                  onChange={this.handleChange("muscle")}
                  inputProps={{
                    name: "muscle",
                    id: "muscle-simple"
                  }}
                >
                  {muscles.map(muscle => (
                    <MenuItem key={muscle} value={muscle}>
                      {muscle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
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
