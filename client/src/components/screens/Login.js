import React, { Component } from "react";
import { Container, CssBaseline, Grid, Typography, TextField, Button, Box } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";

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
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  state = {
    email: null,
    password: null,
    role: null,
  };

  componentDidMount() {
    const { loginRole } = this.props;
    this.setState({
      role: loginRole,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { classes, signup, loginRole } = this.props;

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            <Container component="main" maxWidth="xs">
              <Box display="flex" alignItems="center" className={classes.block}>
                <Topbar noTabs />
                <Box flex={1}>
                  <Typography variant="h5" align="center">
                    Login
                  </Typography>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="email"
                          name="email"
                          type="email"
                          label="E-mail"
                          autoComplete="email"
                          variant="outlined"
                          required
                          autoFocus
                          fullWidth
                          onChange={this.handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="password"
                          name="password"
                          label="Senha"
                          variant="outlined"
                          type="password"
                          required
                          autoFocus
                          fullWidth
                          onChange={this.handleInputChange}
                        />
                      </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                      Entrar
                    </Button>

                    {signup ? (
                      <Button component={Link} to={`/${loginRole}/signup`} fullWidth variant="contained" color="primary" className={classes.submit}>
                        Inscrever-se
                      </Button>
                    ) : (
                      ""
                    )}
                  </form>
                </Box>
              </Box>
            </Container>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
