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
  Fab,
  TextField,
  Button,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import Topbar from "../../components/Topbar";
import Toastr from "../../components/common/Toastr";
import CardTime from "../../components/cards/CardTime";
import CardEditTime from "../../components/cards/CardEditTime";

import { getAlunos, getTimeFinal, getAvaliacoesTime } from "../../utils/api";

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
    modalAddTimeOpen: false,

    showError: false,
    errorMessage: null,

    alunos: [],
  };

  componentDidMount() {
    this.getTimes();
    this.getAlunosList();
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
        this.setState({
          errorMessage: err.response ? err.response.data.error : "Erro de conexão",
          showError: true,
        });
      });
  };

  getAlunosList = () => {
    axios
      .get(getAlunos)
      .then((rs) => {
        console.log(rs.data.map(d => d.nome));
        this.setState({
          alunos: rs.data,
        });
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response ? err.response.data.error : "Erro de conexão",
          showError: true,
        });
      });
  };

  renderTimes = () => {
    const times = this.state.times;
    return times.map((time, key) => {
      return <CardTime time={time} key={key} />;
    });
  };

  handleAddTimeSubmit = () => {};

  handleButtonAddClick = () => {
    this.setState({
      modalAddTimeOpen: true,
    });
  };

  handleModalAddTimeClose = () => {
    this.setState({
      modalAddTimeOpen: false,
    });
  };

  // handleRowClick = (event, item) => {
  //   this.getAlunosTime(item);
  // };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

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
          <Topbar type="avaliador" currentPath={currentPath} />
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

          <Dialog open={this.state.modalOpen} onClose={this.handleModalClose}>
            {this.state.modalOpen ? this.renderDialogContent() : ""}
          </Dialog>

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
                  {this.state.times.length && this.renderTimes()}
                </Grid>
              </Box>
            </Box>
          </div>

          <Dialog maxWidth="lg" open={this.state.modalAddTimeOpen} onClose={this.handleModalAddTimeClose}>
            <DialogTitle>Adicionar time</DialogTitle>
            <DialogContent>
              <div className={classes.dialogBody}>
                <form onSubmit={this.handleAddTimeSubmit()}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="nome"
                        name="nome"
                        label="Nome"
                        autoComplete="nome"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={this.handleInputChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CardEditTime rightList={this.state.alunos} />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Adicionar
                  </Button>
                </form>
                <Table>
                  <TableHead></TableHead>
                  <TableBody></TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarTimes));
