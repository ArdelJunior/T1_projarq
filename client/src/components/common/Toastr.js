import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class Toastr extends Component {
  render() {
    const { open, message, severity, timeout, onClose, anchorOrigin } = this.props;

    return (
      <Snackbar anchorOrigin={anchorOrigin} open={open} autoHideDuration={timeout} onClose={onClose}>
        <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    );
  }
}

export default Toastr;