import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AddIcon from "@material-ui/icons/Add";
import BackIcon from "@material-ui/icons/ArrowBack";

import axios from "axios";

import { getAlunos, getTimeFinal, setTimeFinal } from "../../utils/api";
import Topbar from "../../components/Topbar";
import Toastr from "../../components/common/Toastr";
import { Backdrop, CircularProgress, Box, Fab, Button, TextField } from "@material-ui/core";
import ListCardAluno from "../../components/cards/ListCardAluno";
import DialogListAlunos from "../../components/dialogs/DialogListAlunos";

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
    height: "90vh",
    maxWidth: 1200,
    margin: "auto",
  },
  list: {
    paddingTop: theme.spacing(2),
    overflowY: "auto",
  },
  center: {
    margin: "auto",
  },
  vScroll: {
    overflowX: "hidden",
    overflowY: "auto",
  },
  actionButton: {
    textTransform: "uppercase",
    margin: theme.spacing(2),
    width: 152,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

class AddTime extends Component {
  state = {
    modalOpen: false,
    loaded: false,
    alunos: [],
    time: [],
    nome: "",
    idAluno: 2,
    showError: false,
    errorMessage: "",
    criador: 1,
  };

  componentDidMount() {
    this.loadAlunos();
    if (this.props.id) {
      this.loadTime(this.props.id);
    }
  }

  loadAlunos = () => {
    axios
      .get(getAlunos)
      .then((response) => {
        this.setState({
          alunos: response.data,
          loaded: true,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorMessage: err.response ? err.response.data.error : "Erro de conexão",
          showError: true,
          loaded: true,
        });
      });
  };

  loadTime = (id) => {
    axios
      .get(getTimeFinal + id)
      .then((rs) => {
        this.setState({
          time: rs.data.alunos,
          nome: rs.data.nome,
          alunos: this.state.alunos.map((aluno) =>
            rs.data.alunos && rs.data.alunos.filter((item) => aluno.id === item.id).length ? { ...aluno, selected: true } : { ...aluno }
          ),
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          errorMessage: error.response ? error.response.data.error : "Erro de conexão",
          showError: true,
          loaded: true,
        });
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleModalOpen = () => {
    this.setState({
      modalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  handleButtonAddClick = () => {
    this.handleModalOpen();
  };

  handleToastrClose = () => {
    this.setState({
      showError: false,
      errorMessage: null,
    });
  };

  toggleSelect = (key, selected) => {
    this.setState((state) => {
      return {
        alunos: state.alunos.map((e, i) => (i === key ? { ...e, selected: selected } : e)),
      };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const time = this.state.alunos.filter((aluno) => aluno.selected);
    const { nome, criador } = this.state;

    const req = this.props.id
      ? axios.put(`${setTimeFinal}/${this.props.id}`, { alunos: time, nome })
      : axios.post(setTimeFinal, { alunos: time, nome, criado_por: criador });

    req
      .then((response) => {
        console.log(response);
        this.props.history.push("/avaliador/times");
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorMessage: err.response ? err.response.data.error : "Erro de conexão",
          showError: true,
        });
      });
  };

  render() {
    const { classes, id } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline>
          <Topbar currentPath={currentPath} />
          <Toastr
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            timeout={6000}
            severity="error"
            message={this.state.errorMessage}
            open={this.state.showError}
            onClose={this.handleToastrClose}
          />
          <Backdrop className={classes.backdrop} open={!this.state.loaded}>
            <CircularProgress />
          </Backdrop>
          <div className={classes.root}>
            <form onSubmit={this.handleSubmit}>
              <Box display="flex" flexDirection="column" className={classes.block}>
                <Box flex={1} style={{ marginBottom: "2em" }}>
                  <Grid container alignItems="center">
                    <Grid item xs={1} style={{ position: "absolute" }}>
                      <Fab color="primary" aria-label="back" onClick={this.props.history.goBack}>
                        <BackIcon />
                      </Fab>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography align="center" variant="h5">{id ? "Editar" : "Criar"} time</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box flex={2}>
                  <Grid container>
                    <Grid item xs={12} style={{ marginBottom: "1em" }}>
                      <TextField
                        id="nome"
                        name="nome"
                        label="Nome"
                        autoComplete="nome"
                        variant="outlined"
                        required
                        fullWidth
                        value={this.state.nome}
                        onChange={this.handleInputChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography variant="h6" style={{ marginRight: "1em" }}>
                          Alunos
                        </Typography>
                        <Fab color="primary" aria-label="add" onClick={this.handleButtonAddClick}>
                          <AddIcon />
                        </Fab>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box flex={8} className={classes.vScroll}>
                  <ListCardAluno alunos={this.state.alunos.filter((item) => item.selected)} />
                </Box>
                <Box flex={1} className={classes.center}>
                  <Button type="submit" color="primary" variant="contained" className={classes.actionButton}>
                    Finalizar
                  </Button>
                </Box>
              </Box>
            </form>
          </div>

          <DialogListAlunos alunos={this.state.alunos} open={this.state.modalOpen} onClose={this.handleModalClose} onCardClick={this.toggleSelect} />
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(AddTime));