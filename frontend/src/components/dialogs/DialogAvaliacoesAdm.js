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
  renderAvaliacoes = (avaliacoes) => {
  const { showInCardTitle } = this.props;
  return avaliacoes.map((av, key) => {
      return (
        // <Grid item xs={4} key={key}>
          <CardAvaliacao
            key={key}
            time={av.time}
            avaliacao={av.avaliacao}
            avaliador={av.avaliador}
            showInTitle={showInCardTitle}
            readOnly
            // onEditClick={() => this.handleEditAvaliacaoClick(av)}
            // onDeleteClick={() => this.handleDeleteAvaliacaoClick(av.avaliacao, av.time)}
          />
        // </Grid>
      );
    });
  };

  render() {
    const { open, onClose, avaliacoes, title } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Dialog open={open} onClose={this.handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              {avaliacoes && avaliacoes.length ? this.renderAvaliacoes(avaliacoes) : <Grid item size={12}>Sem avaliações para exibir</Grid>}
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
