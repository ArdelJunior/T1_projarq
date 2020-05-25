import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Topbar from "./Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = (theme) => ({});

class Template extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline>
          <Topbar currentPath={currentPath} />
          <div className={classes.root}>
            <Grid container justify="center">
              <Grid
                spacing={10}
                alignItems="center"
                justify="center"
                container
                className={classes.grid}
              >

              </Grid>
            </Grid>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Template));
