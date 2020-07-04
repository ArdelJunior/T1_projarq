import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { Dialog, CssBaseline, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@material-ui/core";
import CardAvaliacao from "../cards/CardAvaliacao";

const styles = (theme) => ({
  dialogBody: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(4),
  },
  // appBar: theme.mixins.toolbar,
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

class DialogAvaliacoesAdm extends Component {
  renderAvaliacoes = (time) => {
    return time.avaliacoes.map((av, key) => {
      return (
        // <Grid item xs={4} key={key}>
          <CardAvaliacao
            key={key}
            time={av.time}
            avaliacao={av.avaliacao}
            avaliador={av.avaliador}
            showInTitle="avaliador"
            readOnly
            // onEditClick={() => this.handleEditAvaliacaoClick(av)}
            // onDeleteClick={() => this.handleDeleteAvaliacaoClick(av.avaliacao, av.time)}
          />
        // </Grid>
      );
    });
  };

  render() {
    const { open, onClose, time } = this.props;
    console.log({time});
    return (
      <React.Fragment>
        <CssBaseline />
        <Dialog open={open} onClose={this.handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>{time.nome}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              {time && time.avaliacoes && time.avaliacoes.length && this.renderAvaliacoes(time)}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(DialogAvaliacoesAdm));
