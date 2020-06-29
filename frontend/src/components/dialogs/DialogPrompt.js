import React, { Component } from "react";
import { CssBaseline, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from "@material-ui/core";

class DialogPrompt extends Component {

  handleClick = (option) => {
    return this.props.onClick(option);
  }

  render() {
    const { open, title, prompt } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{prompt}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClick(true)} color="primary">
              Sim
            </Button>
            <Button onClick={() => this.handleClick(false)} color="primary" autoFocus>
              Não
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default DialogPrompt;
