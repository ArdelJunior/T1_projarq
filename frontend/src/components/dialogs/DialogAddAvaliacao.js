import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { Dialog, CssBaseline, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import CardAvaliacao from "../cards/CardAvaliacao";
import axios from "axios";
import { addAvaliacao, editAvaliacao, getCriterios } from "../../utils/api";

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

class DialogAddAvaliacao extends Component {
  state = {
    time: null,
    avaliacao: null,
    isNewAvaliacao: true,
    avaliador: 1,
  };

  componentDidMount() {
    this.newAvaliacao();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.updateAvaliacao();
    }
  }

  getCriteriosList = async () => {
    try {
      const { data } = await axios.get(getCriterios);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  newAvaliacao = () => {
    this.getCriteriosList().then((data) => {
      this.setState({
        isNewAvaliacao: true,
        time: { nome: "" },
        avaliacao: data.map((c) => {
          return { ...c, nota: 0 };
        }),
      });
    });
  };

  updateAvaliacao = () => {
    const { avaliacao } = this.props;
    if (avaliacao) {
      this.setState({
        avaliacao: avaliacao.avaliacao,
        time: avaliacao.time,
        isNewAvaliacao: false,
      });
    } else {
      this.newAvaliacao();
    }
  };

  saveAvaliacao = () => {
    const { onSaveError, onClose } = this.props;
    const { avaliacao, time, avaliador, isNewAvaliacao } = this.state;
    console.log({ avaliacao, time, avaliador, isNewAvaliacao });
    const req = isNewAvaliacao ? axios.post(addAvaliacao, { time: time.id, avaliacao, avaliador }) : axios.put(editAvaliacao + avaliacao.id, avaliacao);
    req
      .then((rs) => {
        console.log(rs);
        onClose();
      })
      .catch((err) => {
        onSaveError(err);
      });
  };

  handleChangeTime = (value) => {
    this.setState(
      {
        time: value,
      },
      () => console.log(this.state.time)
    );
  };

  onChangeRating = (a, newNota) => {
    const { id, criterio } = a;
    this.setState({
      avaliacao: this.state.avaliacao.map((av) => (av.criterio === criterio ? { id, criterio, nota: newNota } : av)),
    });
  };

  handleSaveClick = () => {
    const { onSave } = this.props;
    console.log(this.state);
    this.saveAvaliacao();
    onSave();
  };

  render() {
    const { open, onClose } = this.props;
    const { time, avaliacao, isNewAvaliacao } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>{`${isNewAvaliacao ? "Criar" : "Editar"} avaliação`}</DialogTitle>
          <DialogContent>
            <CardAvaliacao
              time={time}
              avaliacao={avaliacao}
              toAdd={isNewAvaliacao}
              editing={true}
              onChangeTime={this.handleChangeTime}
              onChangeRating={this.onChangeRating}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fechar
            </Button>
            <Button onClick={this.handleSaveClick} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(DialogAddAvaliacao));
