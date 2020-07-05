import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

import Typography from "@material-ui/core/Typography";

import Topbar from "../../components/common/Topbar";
import Toastr from "../../components/common/Toastr";
import { Box, Grid, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Tooltip, FormControlLabel, Switch } from "@material-ui/core";
import { getAvaliacoes, getTimeFinal, getAvaliacoesTime } from "../../utils/api";
import DialogAvaliacoesAdm from "../../components/dialogs/DialogAvaliacoesAdm";

const backgroundShape = require("../../images/shape.svg");
const gold = require("../../images/gold-cup.svg");
const silver = require("../../images/silver-medal.svg");
const bronze = require("../../images/bronze-medal.svg");

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
  cellRank: {
    textAlign: "center",
    width: 20,
  },
  row: {},
  rowWarning: {
    backgroundColor: "#FFCCCC",
    "&:hover": {
      backgroundColor: "#FF8888",
    },
  },
  imgRank: {
    height: "2em",
  },
  switch: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: "0.875rem",
    padding: theme.spacing(1),
  },
}))(Tooltip);

class GerenciarAvaliacoes extends Component {
  state = {
    avaliacoes: [],
    times: [],
    timesSorted: [],

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",

    modalOpen: false,

    timeModal: [],

    switchChecked: true,
  };

  componentDidMount() {
    this.getTimes();
  }

  getTimes = () => {
    axios
      .get(getTimeFinal)
      .then((rs) => {
        this.setState(
          {
            times: rs.data,
          },
          this.loadAvaliacoes
        );
      })
      .catch((err) => {
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  loadAvaliacoes = () => {
    const { times } = this.state;
    this.sortAvaliacoes(times).then((ts) => {
      this.setState({
        timesSorted: ts,
      });
    });
  };

  sortAvaliacoes = async (times) => {
    const ts = await Promise.all(times.map((time) => this.getAvaliacoesTime(time.id)));
    ts.sort((a, b) => b.nota - a.nota);
    const tsr = this.rankAvaliacoes(ts);
    return tsr;
  };

  rankAvaliacoes = (times) => {
    let rank = 1;
    times.forEach((time) => {
      if (time.valid) {
        time.rank = rank++;
      }
    });
    return times;
  };

  drawRank = (rank) => {
    const { classes } = this.props;

    let img = null;
    let alt = null;
    switch (rank) {
      case 1:
        img = gold;
        alt = "Ouro";
        break;
      case 2:
        img = silver;
        alt = "Prata";
        break;
      case 3:
        img = bronze;
        alt = "Bronze";
        break;
      default:
        img = null;
        alt = null;
        break;
    }

    return img ? <img src={img} alt={alt} className={classes.imgRank} /> : "";
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

  getAvaliacoesTime = async (id) => {
    try {
      const rs = await axios.get(getAvaliacoesTime + id);
      return rs.data;
    } catch (err) {
      this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
    }
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

  handleSwitchChange = () => {
    this.setState({
      switchChecked: !this.state.switchChecked,
    });
  };

  renderAvaliacoes = () => {
    const { classes } = this.props;
    const { timesSorted, switchChecked } = this.state;
    console.log({ timesSorted });
    const times = switchChecked ? timesSorted : timesSorted.filter((t) => t.valid);
    return times.map((time, key) => {
      return (
        <LightTooltip key={key} title={time.warning || time.nome}>
          <TableRow key={key} className={time.warning ? classes.rowWarning : classes.row} hover={!time.warning} onClick={() => this.handleRowClick(time)}>
            <TableCell className={classes.cellRank}>{this.drawRank(time.rank)}</TableCell>
            <TableCell className={classes.cell}>{time.nome}</TableCell>
            <TableCell className={classes.cell}>{time.nota}</TableCell>
            <TableCell className={classes.cell}>{time.avaliacoes.length}</TableCell>
          </TableRow>
        </LightTooltip>
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
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Avaliações
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box flex={10} className={classes.vScroll}>
                <Grid container spacing={3} className={classes.list}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    {this.state.timesSorted && this.state.timesSorted.length ? (
                      <>
                        <FormControlLabel
                          className={classes.switch}
                          label={"Mostrar avaliações inválidas"}
                          control={<Switch checked={this.state.switchChecked} onChange={this.handleSwitchChange} name="showInvalid" />}
                        />
                        <TableContainer>
                          <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                {["", "Time", "Nota", "Avaliações"].map((item, key) => {
                                  return (
                                    <TableCell key={key} className={classes.cell}>
                                      {item}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            </TableHead>
                            <TableBody>{this.state.timesSorted && this.state.timesSorted.length ? this.renderAvaliacoes() : <TableRow></TableRow>}</TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    ) : (
                      <Typography variant="h6" align="center">
                        Não há avaliações para exibir!
                      </Typography>
                    )}
                  </Grid>
                </Grid>
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
