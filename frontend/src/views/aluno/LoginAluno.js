import React, { Component } from "react";
import { Container, CssBaseline, Grid, Typography, TextField, Button } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";

const backgroundShape = require("../../images/shape.svg");

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignupAluno extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Typography variant="h5">Login</Typography>
              <form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField id="email" name="email" type="email" label="E-mail" autoComplete="email" variant="outlined" required autoFocus fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="password" name="password" label="Senha" variant="outlined" type="password" required autoFocus fullWidth />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Entrar
                </Button>
                <Button component={Link} to="/aluno/signup"  fullWidth variant="contained" color="primary" className={classes.submit}>
                  Inscrever-se
                </Button>
              </form>
            </div>
          </Container>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SignupAluno));
