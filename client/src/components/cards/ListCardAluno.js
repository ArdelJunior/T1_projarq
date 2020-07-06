import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CardAluno from "../../components/cards/CardAluno";
import CardAlunoSelect from "../../components/cards/CardAlunoSelect";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  list: {
    paddingTop: theme.spacing(2),
    overflowY: "auto",
  },
});

class ListCardAluno extends Component {
  renderCards = () => {
    const { alunos, forSelect, onClick } = this.props;
    return alunos.map((item, key) => {
      return forSelect ? (
        <CardAlunoSelect key={key} idx={key} nome={item.nome} curso={item.curso} selected={item.selected} onClick={onClick} />
      ) : (
        <CardAluno key={key} idx={key} nome={item.nome} curso={item.curso} />
      );
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.list}>
        {this.renderCards()}
      </Grid>
    );
  }
}

export default withStyles(styles)(ListCardAluno);
