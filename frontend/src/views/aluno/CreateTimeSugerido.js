import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import { CssBaseline, Typography, Grid, Dialog, IconButton, Fab, Toolbar, AppBar, Slide, Button, Box, Backdrop, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import Topbar from "../../components/Topbar";
import CardAluno from "../../components/cards/CardAluno";
import CardAlunoSelect from "../../components/cards/CardAlunoSelect";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class CreateTimeSugerido extends Component {
  state = {
    modalOpen: false,
    loaded: false,
    alunos: [],
    showError: false,
    errorMessage: null,
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
        this.setState({
          errorMessage: err.response ? err.response.data.error : "Erro de conexão",
          showError: true,
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

  handleToastrClose = () => {
    this.setState({
      showError: false,
      errorMessage: null,
    });
  };

  handleSubmitClick = () => {
    const time = this.state.alunos.filter((aluno) => aluno.selected);
    try {
      this.validateTime(time);
    } catch (err) {
      console.error(err);
      this.setState({
        errorMessage: err.message,
        showError: true,
      });
      return;
    }
    axios
      .post(setTimeSugerido, { time, aluno: "1c20e521-722b-4eb1-ae3a-bf6e8f5368be" })
      .then((response) => {
        console.log(response);
        alert("OK");
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorMessage: err.response ? err.response.data.error : "Erro de conexão",
          showError: true,
        });
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

  renderAlunos = () => {
    const alunosList = this.state.alunos;
    return alunosList.map((item, key) => {
      return <CardAlunoSelect key={key} idx={key} nome={item.nome} curso={item.curso} selected={item.selected} onClick={this.toggleSelect} />;
    });
  };

  renderTimeSugerido = () => {
    const alunosList = this.state.alunos.filter((item) => item.selected);
    return alunosList.map((item, key) => {
      return <CardAluno key={key} idx={key} nome={item.nome} curso={item.curso} />;
    });
  };

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <React.Fragment>
        <CssBaseline>
          {/* <Topbar currentPath={currentPath} /> */}
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
                <Grid container spacing={2} className={classes.list}>
                  {this.renderTimeSugerido()}
                </Grid>
              </Box>
              <Box flex={1} className={classes.center}>
                <Button color="primary" variant="contained" className={classes.actionButton} onClick={this.handleSubmitClick}>
                  Finalizar
                </Button>
              </Box>
            </Box>
          </div>

          <Dialog fullScreen open={this.state.modalOpen} TransitionComponent={Transition} onClose={this.handleClose}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.handleModalClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.dialogTitle}>
                  Alunos inscritos
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.dialogBody}>
              <Grid container spacing={3} className={classes.list}>
                {this.renderAlunos()}
              </Grid>
            </div>
          </Dialog>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(CreateTimeSugerido));