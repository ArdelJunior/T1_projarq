import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";

import { CssBaseline, Typography, Box, Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import CardAvaliacao from "../../components/cards/CardAvaliacao";

import { getAvaliacoesAvaliador, deleteAvaliacao, getTimesNaoAvaliados } from "../../utils/api";
import DialogPrompt from "../../components/dialogs/DialogPrompt";
import DialogAddAvaliacao from "../../components/dialogs/DialogAddAvaliacao";
import ApiReq from "../../components/common/ApiReq";
import LightTooltip from "../../components/common/LightTooltip";

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
});

class Avaliacoes extends Component {
  state = {
    avaliacoes: [],
    avaliacaoToDelete: null,
    currentAvaliacao: null,
    timesNaoAvaliados: [],

    dialogAddAvaliacaoOpen: false,

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    promptOpen: false,
    promptMessage: "",
  };

  api = ApiReq.getInstance();

  componentDidMount() {
    this.loadAvaliacoes();
  }

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

  loadAvaliacoes = () => {
    this.api
      .get(`${getAvaliacoesAvaliador}`)
      .then((rs) => {
        this.setState({
          avaliacoes: rs.data,
        }, this.getTimes());
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  getTimes = () => {
    this.api
      .get(getTimesNaoAvaliados)
      .then((rs) => {
        this.setState({
          timesNaoAvaliados: rs.data,
        }, this.forceUpdate());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  closePrompt = () => {
    this.setState({
      promptOpen: false,
    });
  };

  handleButtonAddClick = () => {
    this.setState(
      {
        currentAvaliacao: null,
      },
      this.setState({
        dialogAddAvaliacaoOpen: true,
      })
    );
  };

  handleAddAvaliacaoClose = () => {
    this.setState({
      dialogAddAvaliacaoOpen: false,
    });
  };

  handleEditAvaliacaoClick = (av) => {
    console.log(av);
    this.setState(
      {
        currentAvaliacao: av,
      },
      this.setState({
        dialogAddAvaliacaoOpen: true,
      })
    );
  };

  handleSaveAvaliacao = () => {
    this.loadAvaliacoes();
  };

  handleSaveAvaliacaoError = (err) => {
    let message = "Erro de conexão";
    if(err.validation) {
      message = err.validation;
    } else if(err.response) {
      message = err.response.data.error;
    }
    this.showToast("error", message);
  };

  handleDeleteAvaliacaoClick = (avaliacao, time) => {
    this.setState({
      promptOpen: true,
      avaliacaoToDelete: time.id,
      promptDeleteAvaliacao: `Confirma a exclusão da avaliação do time ${time.nome}?`,
    });
  };

  handleDeleteAvaliacaoPromptClick = (option) => {
    if (!option) {
      this.closePrompt();
      return false;
    }

    const { avaliacaoToDelete } = this.state;

    // Promise.all(avaliacaoToDelete.map((av) => this.api.delete(`${deleteAvaliacao}${av.id}`)))
    this.api.delete(deleteAvaliacao + avaliacaoToDelete)
      .then(() => {
        this.loadAvaliacoes();
        this.showToast("success", "Avaliação excluída com sucesso");
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      })
      .finally(() => {
        this.closePrompt();
      });
  };

  renderAvaliacoes = () => {
    const { avaliacoes } = this.state;
    return avaliacoes.map((av, key) => {
      return (
        <CardAvaliacao
          key={key}
          time={av.time}
          avaliacao={av.avaliacao}
          onEditClick={() => this.handleEditAvaliacaoClick(av)}
          onDeleteClick={() => this.handleDeleteAvaliacaoClick(av.avaliacao, av.time)}
        />
      );
    });
  };

  render() {
    const { classes } = this.props;
    const { avaliacoes, timesNaoAvaliados } = this.state;
    const currentPath = this.props.location.pathname;
    const addDisabled = !timesNaoAvaliados || !timesNaoAvaliados.length;
    console.log({timesNaoAvaliados});
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
              <Topbar type="avaliador" currentPath={currentPath} />
              <Box flex={1}>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography variant="h6" gutterBottom>
                      Suas avaliações
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <LightTooltip title={addDisabled ? "Não há mais times para avaliar" : "Adicionar avaliação"}>
                      <span>
                      <Fab color="primary" aria-label="add" onClick={this.handleButtonAddClick} disabled={addDisabled}>
                        <AddIcon />
                      </Fab>
                      </span>
                    </LightTooltip>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={9}>
                <Grid container spacing={3} className={classes.list}>
                  {avaliacoes && avaliacoes.length ? (
                    this.renderAvaliacoes()
                  ) : (
                    <Grid item size={12}>
                      Não há avaliações
                    </Grid>
                  )}
                </Grid>
              </Box>
              {/* <Box flex={2}>
                <Grid container>
                </Grid>
              </Box> */}
            </Box>
          </div>
          <DialogPrompt
            open={this.state.promptOpen}
            onClick={(option) => this.handleDeleteAvaliacaoPromptClick(option)}
            title={"Excluir Avaliação"}
            prompt={this.state.promptDeleteAvaliacao}
          />
          ;
          <DialogAddAvaliacao
            open={this.state.dialogAddAvaliacaoOpen}
            onClose={this.handleAddAvaliacaoClose}
            avaliacao={this.state.currentAvaliacao}
            timesNaoAvaliados={this.state.timesNaoAvaliados}
            onSave={this.handleSaveAvaliacao}
            onSaveError={this.handleSaveAvaliacaoError}
          />
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Avaliacoes));
