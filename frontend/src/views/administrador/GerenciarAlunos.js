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
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";

import { getAlunos, getTimeSugeridoAluno } from "../../utils/api";

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

class GerenciarAlunos extends Component {
  state = {
    alunos: [],
    loaded: true,

    timeSugerido: [],
    alunoTimeSugerido: "",
    modalOpen: false,

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",
  };

  componentDidMount() {
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

  getAlunosTime = (aluno) => {
    console.log({ aluno });
    axios
      .get(getTimeSugeridoAluno + aluno.id)
      .then((rs) => {
        this.setState({
          timeSugerido: rs.data.alunos,
          alunoTimeSugerido: aluno.nome,
          modalOpen: true,
        });
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  handleRowClick = (event, item) => {
    this.getAlunosTime(item);
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  renderDialogContent = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.dialogBody}>
          <DialogTitle>
            <div align="center">Time sugerido por {this.state.alunoTimeSugerido}</div>
          </DialogTitle>
          <DialogContent>
            {this.state.timeSugerido && this.state.timeSugerido.length > 0 ? (
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
            ) : (
              <div align="center">Não há alunos no time</div>
            )}
          </DialogContent>
        </div>
      </React.Fragment>
    );
  };

  renderRows = () => {
    return this.state.alunos.map((aluno, key) => {
      return (
        <TableRow hover key={key} onClick={(e) => this.handleRowClick(e, aluno)}>
          <TableCell align="center">{aluno.nome}</TableCell>
          <TableCell align="center">{aluno.matricula}</TableCell>
          <TableCell align="center">{aluno.curso}</TableCell>
          <TableCell align="center">{aluno.email}</TableCell>
        </TableRow>
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
          <Backdrop className={classes.backdrop} open={!this.state.loaded}>
            <CircularProgress />
          </Backdrop>

          <Dialog open={this.state.modalOpen} onClose={this.handleModalClose}>
            {this.state.modalOpen ? this.renderDialogContent() : ""}
          </Dialog>

          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Topbar type="administrador" currentPath={currentPath} />
              <Box flex={1}>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Alunos inscritos
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={9} className={classes.vScroll}>
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell key="aluno_nome" align="center" style={{ minWidth: 100 }}>
                          Nome
                        </TableCell>
                        <TableCell key="aluno_matricula" align="center" style={{ minWidth: 100 }}>
                          Matrícula
                        </TableCell>
                        <TableCell key="aluno_curso" align="center" style={{ minWidth: 100 }}>
                          Curso
                        </TableCell>
                        <TableCell key="aluno_email" align="center" style={{ minWidth: 100 }}>
                          E-mail
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarAlunos));
