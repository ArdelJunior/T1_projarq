import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { CssBaseline, Typography, Box } from "@material-ui/core";

import Topbar from "../../components/common/Topbar";

const backgroundShape = require("../../images/shape.svg");

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    minHeight: "100vh",
  },
  block: {
    padding: theme.spacing(4),
    minHeight: "100vh",
    maxWidth: 1200,
    margin: "auto",
  },
  center: {
    margin: "auto",
    textAlign: "center",
  },
});

class Dashboard extends Component {
  state = {
    nome: "Davi Dias",
    id: 1,
    alunos: [],
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Topbar currentPath={0} />
              <Box flex={2}></Box>
              <Box flex={10}>
                <div className={classes.center}>
                  <Typography variant="h5"></Typography>
                </div>
              </Box>
            </Box>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
