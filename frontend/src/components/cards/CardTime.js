import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Typography, Paper, Grid, Table, TableCell, TableBody, TableRow, Box, Fab, ButtonGroup, Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    // textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: "320px",
  },
  container: {
    height: "100%",
  },
  header: {
    textAlign: "center",
  },
  body: {
    textAlign: "center",
    overflowY: "auto",
  },
  footer: {
    textAlign: "right",
  },
  cardTitle: {
    marginBottom: theme.spacing(2),
  },
  table: {
    width: "100%",
  },
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
    const { classes } = this.props;
    const alunos = time.alunos;
    return time.alunos.length ? (
      <Table className={classes.table}>
        <TableBody>
          {alunos.map((a, key) => {
            return (
              <TableRow key={key}>
                <TableCell>{a.nome}</TableCell>
                <TableCell>{a.curso}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    ) : (
      "Nenhum aluno"
    );
  };

  render() {
    const { classes, time, onEditClick, onDeleteClick, className } = this.props;

    return (
      <Grid item xs={12} md={4} className={classes.root}>
        <Paper className={className || classes.paper}>
          <Box display="flex" flexDirection="column" className={classes.container}>
            <Box flex={2} className={classes.header}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.cardTitle}>
                    {time.nome}
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ position: "absolute" }}>
                  <IconButton onClick={onEditClick} size="small"><EditIcon /></IconButton>
                  <IconButton onClick={onDeleteClick} size="small"><DeleteIcon /></IconButton>
                </Grid>
              </Grid>
            </Box>
            <Box flex={9} className={classes.body}>
              {this.renderRows(time)}
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(CardTime);
