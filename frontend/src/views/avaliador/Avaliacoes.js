import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

import { CssBaseline, Typography, Box, Grid, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Topbar from "../../components/Topbar";
import Toastr from "../../components/common/Toastr";
import CardAvaliacao from "../../components/cards/CardAvaliacao";

import { getAvaliacoesAvaliador } from "../../utils/api";

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
});

class Avaliacoes extends Component {
  state = {
    avaliacoes: [],
    avaliador: 1,

    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",
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
  }

  getAvaliacoes = () => {
    const { avaliador } = this.state;
    axios.get(`${getAvaliacoesAvaliador}${avaliador}`)
    .then((rs) => {
      this.setState({
        avaliacoes: rs.data,
      });
    })
    .catch((err) => {
      this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
    });
  }

  renderAvaliacoes = () => {
    const { avaliacoes } = this.state;
    return avaliacoes.map((av, key) => {
      console.log(av);
      return <CardAvaliacao key={key} time={av.time} avaliacao={av.avaliacao} />;
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
            severity={this.state.toastSeverity}
            message={this.state.toastMessage}
            open={this.state.toastOpen}
            onClose={this.handleToastClose}
          />

          <div className={classes.root}>
            <Box display="flex" flexDirection="column" className={classes.block}>
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
              <Box flex={9} className={classes.vScroll}>
                <Grid container spacing={3} className={classes.list}>
                  {this.state.avaliacoes.length && this.renderAvaliacoes()}
                </Grid>
              </Box>
              {/* <Box flex={2}>
                <Grid container>
                </Grid>
              </Box> */}
            </Box>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Avaliacoes));
