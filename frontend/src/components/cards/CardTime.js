import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Table, TableHead, TableCell, TableBody, TableRow } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    // textAlign: "left",
    color: theme.palette.text.secondary,
    height: "300px",
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    height: "100%",
    overflowY: "auto",
    width: "100%",
  },
  baseline: {
    alignSelf: "baseline",
    // marginLeft: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: 0,
    },
    textAlign: "center",
      alignItems: "center",
      width: "100%",
  },
  inline: {
    display: "inline-block",
    // marginLeft: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    margin: "auto",
    textAlign: "center",
  },

  cardTitle: {
    marginBottom: theme.spacing(2),
  },
  table: {
    width: "100%"
  }
});

class CardTime extends Component {
  state = {};

  renderHeader = () => {
    return (
      <React.Fragment>
        <TableCell>Aluno</TableCell>
        <TableCell>Curso</TableCell>
      </React.Fragment>
    );
  };

  renderRows = (time) => {
    const alunos = time.alunos;
    return time.alunos.length
      ? alunos.map((a, key) => {
          return (
            <TableRow key={key}>
              <TableCell>{a.nome}</TableCell>
              <TableCell>{a.curso}</TableCell>
            </TableRow>
          );
        })
      : "Nenhum aluno";
  };

  render() {
    const { classes, time, onClick, className } = this.props;

    return (
      <Grid item xs={12} md={4} className={classes.root} onClick={onClick}>
        <Paper className={className || classes.paper}>
          <div className={classes.itemContainer}>
            <div className={classes.baseline}>
              <div className={classes.inline}>
                <Typography variant="h6" className={classes.cardTitle}>
                  {time.nome}
                </Typography>
                <Table className={classes.table}>
                  {/* <TableHead>{this.renderHeader(time)}</TableHead> */}
                  <TableBody>{this.renderRows(time)}</TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(CardTime);
