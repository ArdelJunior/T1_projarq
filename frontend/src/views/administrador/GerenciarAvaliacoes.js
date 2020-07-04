import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

import Typography from "@material-ui/core/Typography";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import { Box, Grid, Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from "@material-ui/core";
import { getAvaliacoes, getTimeFinal } from "../../utils/api";
import DialogAvaliacoesAdm from "../../components/dialogs/DialogAvaliacoesAdm";

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
    height: "100vh",
    maxWidth: 1200,
    margin: "auto",
  },
  vScroll: {
    overflowX: "hidden",
    overflowY: "auto",
  },
  cell: {
    textAlign: "center",
    minWidth: 100,
  },
});

class GerenciarAvaliacoes extends Component {
  state = {
    avaliacoes: [],
    times: [],

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    modalOpen: false,

    timeModal: [],
  };

  componentDidMount() {
    this.getAvaliacoes();
    this.getTimes();
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

  getAvaliacoes = () => {
    axios
      .get(getAvaliacoes)
      .then((rs) => {
        this.setState({
          avaliacoes: rs.data,
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

  notaAvaliacao = (avaliacao) => {
    return avaliacao.reduce((acc, a) => a.nota + acc, 0);
  };

  notaFinal = (avaliacoes) => {
    return avaliacoes.reduce((acc, a) => this.notaAvaliacao(a.avaliacao) + acc, 0);
  };

  sortAvaliacoes = (times, avaliacoes) => {
    return times
      .map((time) => {
        const av = avaliacoes.filter((a) => a.time.id === time.id);
        const sum = this.notaFinal(av);
        return { ...time, avaliacoes: av, nota: sum };
      })
      .sort((a, b) => b.nota - a.nota);
  };

  handleRowClick = (time) => {
    if (time.avaliacoes && time.avaliacoes.length) {
      this.setState({
        timeModal: time,
        modalOpen: true,
      });
    } else {
      this.showToast("warning", "Sem avaliações para exibir");
    }
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  renderAvaliacoes = () => {
    const { classes } = this.props;
    const { avaliacoes, times } = this.state;
    const timesSorted = this.sortAvaliacoes(times, avaliacoes);

    return timesSorted.map((time, key) => {
      return (
        <TableRow key={key} hover onClick={() => this.handleRowClick(time)}>
          <TableCell className={classes.cell}>{time.nome}</TableCell>
          <TableCell className={classes.cell}>{time.nota}</TableCell>
          <TableCell className={classes.cell}>{time.avaliacoes.length}</TableCell>
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
          <Topbar type="administrador" currentPath={currentPath} />

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
              <Box flex={2}>
                <Grid container>
                  <Typography variant="h6" gutterBottom>
                    Avaliações
                  </Typography>
                </Grid>
              </Box>
              <Box flex={9} className={classes.vScroll}>
                <Grid container spacing={3} className={classes.list}>
                  <TableContainer>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {["Time", "Nota", "Avaliações"].map((item, key) => {
                            return (
                              <TableCell key={key} className={classes.cell}>
                                {item}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>{this.state.avaliacoes && this.state.avaliacoes.length ? this.renderAvaliacoes() : <TableRow></TableRow>}</TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Box>
              <Box flex={2}>
                <Grid container></Grid>
              </Box>
            </Box>
          </div>

          <DialogAvaliacoesAdm open={this.state.modalOpen} time={this.state.timeModal} onClose={this.handleModalClose} />
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarAvaliacoes));
