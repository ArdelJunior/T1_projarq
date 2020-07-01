import React, { Component } from "react";
import { Container, CssBaseline, Grid, Typography, TextField, Button, Select, MenuItem } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";

import { getCursos } from "../../utils/api";
import Toastr from "../../components/common/Toastr";
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
    curso: "",
    password: "",
    redirect: false,
    cursos: [],

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    loaded: false,
  };

  componentDidMount = () => {
    axios
      .get(getCursos)
      .then((response) => {
        this.setState({
          cursos: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      })
      .then(() => {
        this.setState({
          loaded: true,
        });
      });
  }

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

  showToast = (severity, message) => {
    this.setState({
      toastOpen: true,
      toastSeverity: severity,
      toastMessage: message,
    });
  }

  handleToastClose = () => {
    this.setState({
      toastOpen: false,
      toastSeverity: "info",
      toastMessage: ""
    })
  }

  renderCursos = () => {
    const cursosList = this.state.cursos;
    return cursosList.map((item) => {
      return <MenuItem value={item.id}>{item.nome}</MenuItem>
    });
  }

  render() {
    const { classes } = this.props;

    if(this.state.redirect) {
      return <Redirect to="/aluno/criar-time-sugerido" />;
    }

    return (
      <React.Fragment>
        <CssBaseline>
          <Toastr
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            timeout={6000}
            severity={this.state.toastSeverity}
            message={this.state.toastMessage}
            open={this.state.toastOpen}
            onClose={this.handleToastClose}
          />
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
                    <Grid item xs={12}>
                      <Select id="curso" name="curso" label="Curso" variant="outlined" type="curso" required autoFocus fullWidth onChange={this.handleInputChange}>
                        {this.renderCursos()}
                      </Select>
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
