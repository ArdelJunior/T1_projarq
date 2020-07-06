import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import AddIcon from "@material-ui/icons/Add";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import ApiReq from "../../components/common/ApiReq";
import { getAvaliadores, deleteAvaliador, getAvaliacoesAvaliador, addAvaliador } from "../../utils/api";
import DialogPrompt from "../../components/dialogs/DialogPrompt";
import DialogAvaliacoesAdm from "../../components/dialogs/DialogAvaliacoesAdm";
import DialogAddPessoa from "../../components/dialogs/DialogAddPessoa";

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
  title: {
    marginBottom: theme.spacing(4),
  },
});

class GerenciarAvaliadores extends Component {
  state = {
    avaliadores: [],

    toDelete: null,
    promptOpen: false,

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    modalOpen: false,
    modalAvaliador: "",
    modalAvaliacoes: [],

    modalAddAvaliadorOpen: false,
  };

  api = ApiReq.getInstance();

  componentDidMount() {
    this.loadAvaliadores();
  }

  loadAvaliadores = () => {
    this.api
      .get(getAvaliadores)
      .then((rs) => {
        this.setState({
          avaliadores: rs.data,
        });
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  showToast = (severity, message) => {
    this.setState({
      toastOpen: true,
      toastSeverity: severity,
      toastMessage: message,
    });
  };

  handleToastClose = () => {
    this.setState({
      toastOpen: false,
      toastSeverity: "info",
      toastMessage: "",
    });
  };

  closePrompt = () => {
    this.setState({
      promptOpen: false,
      toDelete: null,
      promptDelete: "",
    });
  };

  handleRowClick = (avaliador) => {
    this.api.get(getAvaliacoesAvaliador + avaliador.id).then((rs) => {
      this.setState(
        {
          modalAvaliacoes: rs.data,
          modalAvaliador: avaliador.nome,
        },
        () => {
          if (this.state.modalAvaliacoes && this.state.modalAvaliacoes.length) {
            this.setState({
              modalOpen: true,
            });
          } else {
            this.showToast("warning", "Sem avaliações para exibir");
          }
        }
      );
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  handleDeleteClick = (e, avaliador) => {
    e.stopPropagation();
    this.setState({
      promptOpen: true,
      toDelete: avaliador,
      promptDelete: `Confirma a exclusão do avaaliador ${avaliador.nome}? Todas as avaliações dele serão excluídas também.`,
    });
  };

  handleDeletePromptClick = (option) => {
    if (!option) {
      this.closePrompt();
      return false;
    }

    const { id } = this.state.toDelete;

    this.api
      .delete(deleteAvaliador + id)
      .then(() => {
        this.showToast("success", "Avaliador excluído com sucesso");
        this.loadAvaliadores();
      })
      .catch((err) => {
        console.log({ err });
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      })
      .finally(() => {
        this.closePrompt();
      });
  };

  handleButtonAddAvaliadorClick = () => {
    this.setState({
      modalAddAvaliadorOpen: true,
    });
  };

  handleModalAddAvaliadorClose = () => {
    this.setState({
      modalAddAvaliadorOpen: false,
    });
  };

  handleAddAvaliadorSubmit = (e) => {
    e.preventDefault();
    const {
      nome: { value: nome },
      email: { value: email },
      password: { value: password },
    } = e.target;
    console.log({ nome, email, password, addAvaliador });
    this.api
      .post(addAvaliador, { nome, email, password })
      .then(() => {
        this.showToast("success", "Avaliador adicionado com sucesso");
        this.loadAvaliadores();
        this.handleModalAddAvaliadorClose();
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  renderAvaliadores = () => {
    const { avaliadores } = this.state;
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell key="avaliador_nome" align="center" style={{ minWidth: 100 }}>
              Nome
            </TableCell>
            <TableCell key="avaliador_email" align="center" style={{ minWidth: 100 }}>
              E-mail
            </TableCell>
            <TableCell key="avaliador_acoes" align="center" style={{ minWidth: 100 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avaliadores.map((av, key) => {
            return (
              <TableRow hover key={key} onClick={() => this.handleRowClick(av)}>
                <TableCell align="center">{av.nome}</TableCell>
                <TableCell align="center">{av.email}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => this.handleDeleteClick(e, av)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  render() {
    const { classes } = this.props;
    const { avaliadores, modalAvaliador, modalAvaliacoes } = this.state;
    const currentPath = this.props.location.pathname;
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
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Topbar type="administrador" currentPath={currentPath} />
              <Box flex={1} className={classes.title}>
                <Grid container>
                  <Grid item xs={11} style={{ textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Avaliadores
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Fab color="primary" aria-label="add" onClick={this.handleButtonAddAvaliadorClick}>
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={9}>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <TableContainer>{avaliadores && avaliadores.length ? this.renderAvaliadores() : "Não há avaliadores inscritos"}</TableContainer>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={2}>
                <Grid container></Grid>
              </Box>
            </Box>
          </div>
          <DialogPrompt
            open={this.state.promptOpen}
            onClick={(option) => this.handleDeletePromptClick(option)}
            title={"Excluir Avaliador"}
            prompt={this.state.promptDelete}
          />
          <DialogAvaliacoesAdm
            open={this.state.modalOpen}
            avaliacoes={modalAvaliacoes}
            title={modalAvaliador}
            showInCardTitle="time"
            onClose={this.handleModalClose}
          />
          <DialogAddPessoa
            open={this.state.modalAddAvaliadorOpen}
            onClose={this.handleModalAddAvaliadorClose}
            onSubmit={this.handleAddAvaliadorSubmit}
            personRole="avaliador"
          />
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarAvaliadores));
