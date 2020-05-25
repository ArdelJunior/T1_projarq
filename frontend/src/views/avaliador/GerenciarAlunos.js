import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import {
  CssBaseline,
  Typography,
  Grid,
  Dialog,
  IconButton,
  Fab,
  Toolbar,
  AppBar,
  Slide,
  Button,
  Box,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import Topbar from "../../components/Topbar";
import ListCardAluno from "../../components/cards/ListCardAluno";
import Toastr from "../../components/common/Toastr";

import { getAlunos, setTimeSugerido } from "../../utils/api";

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
    loaded: true
  };

  componentDidMount() {
    axios.get(getAlunos).then(rs => {
      this.setState({
        alunos: rs.data
      })
    })
  }

  renderRows = () => {
    console.log(this.state.alunos);
    return this.state.alunos.map((aluno) => {
      return (
        <TableRow>
          <TableCell align="center">{aluno.nome}</TableCell>
          <TableCell align="center">{aluno.matricula}</TableCell>
          <TableCell align="center">{aluno.curso}</TableCell>
          <TableCell align="center">{aluno.email}</TableCell>
          <TableCell align="center"></TableCell>
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
          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
              <Box flex={1}>
                <Grid container>
                  <Grid item xs={12} style={{textAlign: "center"}}>
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
                        <TableCell key="aluno_nome" align="center" style={{ minWidth: 100 }}>Nome</TableCell>
                        <TableCell key="aluno_matricula" align="center" style={{ minWidth: 100 }}>Matrícula</TableCell>
                        <TableCell key="aluno_curso" align="center" style={{ minWidth: 100 }}>Curso</TableCell>
                        <TableCell key="aluno_email" align="center" style={{ minWidth: 100 }}>E-mail</TableCell>
                        <TableCell key="aluno_time_sugerido" align="center" style={{ minWidth: 100 }}>Time sugerido</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRows()}</TableBody>
                  </Table>
                </TableContainer>
                {/* <ListCardAluno alunos={this.state.alunos.filter((item) => item.selected)} /> */}
              </Box>
              {/* <Box flex={1} className={classes.center}>
                <Button color="primary" variant="contained" className={classes.actionButton} onClick={this.handleSubmitClick}>
                  Finalizar
                </Button>
              </Box> */}
            </Box>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(GerenciarAlunos));
