import React, { Component } from "react";
import { Container, CssBaseline, Grid, Typography, TextField, Button } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link, Redirect } from "react-router-dom";

import Topbar from "../../components/Topbar";
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
  state = {
    matricula: "",
    nome: "",
    email: "",
    password: "",
    redirect: false,
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true
    })
  };

  render() {
    const { classes } = this.props;

    if(this.state.redirect) {
      return <Redirect to="/aluno/criar-time-sugerido" />;
    }

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.root}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Typography variant="h5">Inscrever-se</Typography>
                <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField id="matricula" name="matricula" label="Matrícula" autoComplete="matricula" variant="outlined" required fullWidth onChange={this.handleInputChange} autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="nome" name="nome" label="Nome" autoComplete="nome" variant="outlined" required fullWidth onChange={this.handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="email" name="email" label="E-mail" type="email" autoComplete="email" variant="outlined" required autoFocus fullWidth onChange={this.handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" name="password" label="Senha" variant="outlined" type="password" required autoFocus fullWidth onChange={this.handleInputChange} />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
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
