import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import { CssBaseline, Typography, Grid, Dialog, IconButton, Fab, Toolbar, AppBar, Slide, Button, Box, Backdrop, CircularProgress } from "@material-ui/core";

import Topbar from "../../components/Topbar";
import ListCardAluno from "../../components/cards/ListCardAluno";

import { getTimeSugeridoAluno } from "../../utils/api";

const backgroundShape = require("../../images/shape.svg");

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    height: "100vh",
  },
  block: {
    padding: theme.spacing(4),
    height: "100vh",
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
          <Topbar currentPath={0} />
          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Box flex={2}></Box>
              <Box flex={10}>
                <div className={classes.center}>
                  <Typography variant="h5">OLAAAAAARRRRRRR</Typography>
                </div>
                {/* <ListCardAluno alunos={this.state.alunos} /> */}
              </Box>
            </Box>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
