import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { Grid, Container, Button, Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import Topbar from "../components/common/Topbar";

const backgroundShape = require("../images/shape.svg");

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
  paper: {
    padding: theme.spacing(8),
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
              <Box display="flex" flexDirection="column" className={classes.block}>
                <Box flex={3}></Box>
                <Box flex={9}>
                  {/* <Paper variant="outlined" className={classes.paper}> */}
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
                      <Grid item xs={12}>
                        <Button component={Link} to="/administrador/login" variant="contained" color="primary" size="large" fullWidth>
                          Sou administrador
                        </Button>
                      </Grid>
                    </Grid>
                  {/* </Paper> */}
                </Box>
              </Box>
            </Container>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Index));
