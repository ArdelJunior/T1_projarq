import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import { CssBaseline, Typography, Grid, Fab, Button, Box, Backdrop, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Topbar from "../../components/common/Topbar";
import ListCardAluno from "../../components/cards/ListCardAluno";
import Toastr from "../../components/common/Toastr";

import { getAlunos, getTimeSugeridoAluno, setTimeSugerido } from "../../utils/api";
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

class CriarTimeSugerido extends Component {
  state = {
    modalOpen: false,
    loaded: false,
    alunos: [],
    time: [],
    timeId: null,

    idAluno: 2,
    
    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",
  };

  componentDidMount() {
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
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      })
      .then(() => {
        this.setState({
          loaded: true,
        });
      });

    axios
      .get(getTimeSugeridoAluno + this.state.idAluno)
      .then((rs) => {
        this.setState({
          timeId: rs.data.id,
          time: rs.data.alunos,
          alunos: this.state.alunos
            .map((aluno) => (rs.data.alunos && rs.data.alunos.filter((item) => aluno.id === item.id).length ? { ...aluno, selected: true } : { ...aluno }))
            .filter((aluno) => aluno.id !== this.state.idAluno),
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

  handleSubmitClick = () => {
    const time = this.state.alunos.filter((aluno) => aluno.selected);
    // try {
    //   this.validateTime(time);
    // } catch (err) {
    //   console.error(err);
    //   this.showToast("error", err.message);
    //   return;
    // }

    const req = this.state.timeId
      ? axios.put(setTimeSugerido + "/" + this.state.timeId, { alunos: time, aluno: this.state.idAluno })
      : axios.post(setTimeSugerido, { time, aluno: this.state.idAluno });
    req
      .then((response) => {
        console.log(response);
        this.props.history.push("/aluno");
      })
      .catch((err) => {
        console.error(err);
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  validateTime = (time) => {
    const cursos = [...new Set(time.map((aluno) => aluno.curso))];
    if (cursos.length < 2) {
      throw new Error("Os alunos selecionados devem ser de pelo menos 2 cursos diferentes");
    }
  };

  toggleSelect = (key, selected) => {
    this.setState((state) => {
      return {
        alunos: state.alunos.map((e, i) => (i === key ? { ...e, selected: selected } : e)),
      };
    });
  };

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline>
          <Topbar currentPath={currentPath} />
          <Toastr
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            timeout={6000}
            severity={this.state.toastSeverity}
            message={this.state.toastMessage}
            open={this.state.toastOpen}
            onClose={this.handleToastClose}
          />
          <Backdrop className={classes.backdrop} open={!this.state.loaded}>
            <CircularProgress />
          </Backdrop>
          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Box flex={2}>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography variant="h6" gutterBottom>
                      Sugerir time
                    </Typography>
                    <Typography variant="body1">Com quem gostaria de montar um time?</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Fab color="primary" aria-label="add" onClick={this.handleButtonAddClick}>
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={9} className={classes.vScroll}>
                <ListCardAluno alunos={this.state.alunos.filter((item) => item.selected)} />
              </Box>
              <Box flex={1} className={classes.center}>
                <Button color="primary" variant="contained" className={classes.actionButton} onClick={this.handleSubmitClick}>
                  Finalizar
                </Button>
              </Box>
            </Box>
          </div>

          <DialogListAlunos alunos={this.state.alunos} open={this.state.modalOpen} onClose={this.handleModalClose} onCardClick={this.toggleSelect} />
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(CriarTimeSugerido));
