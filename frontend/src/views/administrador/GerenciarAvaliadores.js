import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import ApiReq from "../../components/common/ApiReq";
import { getAvaliadores, deleteAvaliador } from "../../utils/api";
import DialogPrompt from "../../components/dialogs/DialogPrompt";

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
  };

  api = ApiReq.getInstance();

  componentDidMount() {
    this.loadAvaliacoes();
  }

  loadAvaliacoes = () => {
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

  handleDeleteClick = (avaliador) => {
    this.setState({
      promptOpen: true,
      toDelete: avaliador,
      promptDelete: `Confirma a exclusão do avaaliador ${avaliador.nome}?`,
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
        this.getAvaliadores();
      })
      .catch((err) => {
        console.log({err});
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      })
      .finally(() => {
        this.closePrompt();
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
              <TableRow hover key={key}>
                <TableCell align="center">{av.nome}</TableCell>
                <TableCell align="center">{av.email}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => this.handleDeleteClick(av)} size="small">
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
    const { avaliadores } = this.state;
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
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Avaliadores
                    </Typography>
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
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarAvaliadores));
