import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { Grid, Container, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import Topbar from "../components/common/Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    height: "100vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline>
          <Topbar noTabs />
          <div className={classes.root}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Button component={Link} to="/aluno/login" variant="contained" color="primary" size="large" fullWidth>
                      Sou aluno
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button component={Link} to="/avaliador/login" variant="contained" color="primary" size="large" fullWidth>
                      Sou avaliador
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Index));
