import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import {
  CssBaseline,
  Typography,
  Grid,
  Box,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  DialogTitle,
  DialogContent,
  Fab,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import CardTime from "../../components/cards/CardTime";

import { getAlunos, getTimeFinal, deleteTimeFinal } from "../../utils/api";
import DialogPrompt from "../../components/dialogs/DialogPrompt";

const backgroundShape = require("../../images/shape.svg");

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    minHeight: "100vh",
  },
  block: {
    padding: theme.spacing(4),
    // height: "100vh",
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
  dialogBody: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(4),
  },
  appBar: {
    position: "relative",
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
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

class GerenciarTimes extends Component {
  state = {
    times: [],
    loaded: true,

    modalOpen: false,

    promptOpen: false,
    promptMessage: "",

    timeToDelete: null,

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    alunos: [],
  };

  componentDidMount() {
    this.getTimes();
    this.getAlunosList();
  }

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

  getTimes = () => {
    axios
      .get(getTimeFinal)
      .then((rs) => {
        this.setState({
          times: rs.data,
        });
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  getAlunosList = () => {
    axios
      .get(getAlunos)
      .then((rs) => {
        this.setState({
          alunos: rs.data,
        });
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  renderTimes = () => {
    const times = this.state.times;
    return times.map((time, key) => {
      return <CardTime time={time} key={key} onEditClick={() => this.handleEditTimeClick(time)} onDeleteClick={() => this.handleDeleteTimeClick(time)} />;
    });
  };

  handleButtonAddClick = () => {
    this.props.history.push(`/administrador/times/add`);
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  closePrompt = () => {
    this.setState({
      promptOpen: false,
      timeToDelete: null,
      promptDeleteTime: "",
    });
  };

  handleEditTimeClick = (time) => {
    this.props.history.push(`/administrador/times/edit/${time.id}`);
  };

  handleDeleteTimeClick = (time) => {
    this.setState({
      promptOpen: true,
      timeToDelete: time,
      promptDeleteTime: `Confirma a exclusão do time ${time.nome}?`
    });
  };

  handleDeleteTimePromptClick = (option) => {
    if(!option) {
      this.closePrompt();
      return false;
    }

    const { id } = this.state.timeToDelete;

    axios.delete(deleteTimeFinal + id).then((data) => {
      this.getTimes();
      this.getAlunosList();
      this.showToast("success", "Time excluído com sucesso");
    }).catch((err) => {
      this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
    }).finally(() => {
      this.closePrompt();
    });
  }

  renderDialogContent = () => {
    const { classes } = this.props;
    return (
      this.state.timeSugerido.length > 0 && (
        <React.Fragment>
          <div className={classes.dialogBody}>
            <DialogTitle>
              <div align="center">Time sugerido por {this.state.alunoTimeSugerido}</div>
            </DialogTitle>
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Aluno</TableCell>
                    <TableCell align="center">Curso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.timeSugerido.map((aluno, key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell align="center">{aluno.nome}</TableCell>
                        <TableCell align="center">{aluno.curso}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </DialogContent>
          </div>
        </React.Fragment>
      )
    );
  };

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline>
          <Topbar type="administrador" currentPath={currentPath} />
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

          {/* <Dialog open={this.state.modalOpen} onClose={this.handleModalClose}>
            {this.state.modalOpen ? this.renderDialogContent() : ""}
          </Dialog> */}

          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Box flex={1}>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography variant="h6" gutterBottom>
                      Times
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Fab color="primary" aria-label="add" onClick={this.handleButtonAddClick}>
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
                {/* <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Times
                    </Typography>
                  </Grid>
                </Grid> */}
              </Box>
              <Box flex={9} className={classes.vScroll}>
                <Grid container spacing={3} className={classes.list}>
                  {this.state.times && this.state.times.length && this.renderTimes()}
                </Grid>
              </Box>
            </Box>
          </div>

          <DialogPrompt open={this.state.promptOpen} onClick={(option) => this.handleDeleteTimePromptClick(option)} title={"Excluir Time"} prompt={this.state.promptDeleteTime} />;
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarTimes));
