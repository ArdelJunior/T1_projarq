import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { CssBaseline, Typography, Box, Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import CardAvaliacao from "../../components/cards/CardAvaliacao";

import { getAvaliacoesAvaliador, deleteAvaliacao } from "../../utils/api";
import DialogPrompt from "../../components/dialogs/DialogPrompt";
import DialogAddAvaliacao from "../../components/dialogs/DialogAddAvaliacao";

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
    avaliador: 1,

    avaliacaoToDelete: null,

    currentAvaliacao: null,
    dialogAddAvaliacaoOpen: false,

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    promptOpen: false,
    promptMessage: "",
  };

  componentDidMount() {
    this.getAvaliacoes();
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

  getAvaliacoes = () => {
    const { avaliador } = this.state;
    axios
      .get(`${getAvaliacoesAvaliador}${avaliador}`)
      .then((rs) => {
        this.setState({
          avaliacoes: rs.data,
        });
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
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

  onChangeAvaliacao = (av) => {
    console.log(av);
  };

  handleSaveAvaliacao = () => {
    this.getAvaliacoes();
  };

  handleSaveAvaliacaoError = (err) => {
    this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
  };

  handleDeleteAvaliacaoClick = (avaliacao, time) => {
    this.setState({
      promptOpen: true,
      avaliacaoToDelete: avaliacao,
      promptDeleteAvaliacao: `Confirma a exclusão da avaliação do time ${time.nome}?`,
    });
  };

  handleDeleteAvaliacaoPromptClick = (option) => {
    if (!option) {
      this.closePrompt();
      return false;
    }

    const { avaliacaoToDelete } = this.state;

    Promise.all(avaliacaoToDelete.map((av) => axios.delete(`${deleteAvaliacao}${av.id}`)))
      .then((data) => {
        this.getAvaliacoes();
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
      console.log({ av });
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
              <Topbar type="avaliador" currentPath={currentPath} />
              <Box flex={1}>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography variant="h6" gutterBottom>
                      Suas avaliações
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Fab color="primary" aria-label="add" onClick={this.handleButtonAddClick}>
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={9}>
                <Grid container spacing={3} className={classes.list}>
                  {this.state.avaliacoes && this.state.avaliacoes.length && this.renderAvaliacoes()}
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
            onSave={this.handleSaveAvaliacao}
            onSaveError={this.handleSaveAvaliacaoError}
          />
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Avaliacoes));
