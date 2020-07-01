import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { CssBaseline, Grid, Paper, Box, Typography, TableBody, Table, TableRow, TableCell } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

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

class CardAvaliacao extends Component {
  renderRows = (avaliacao) => {
    const { classes } = this.props;
    return avaliacao.length ? (
      <Table className={classes.table}>
        <TableBody>
          {avaliacao.map((a, key) => {
            return (
              <TableRow key={key}>
                <TableCell>{a.criterio}</TableCell>
                <TableCell>
                  <Rating name={a.criterio} value={a.nota} readOnly />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    ) : (
      "Nenhuma avaliação"
    );
  };

  render() {
    const { classes, className, time, avaliacao } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
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
                    {/* <IconButton onClick={onEditClick} size="small"><EditIcon /></IconButton>
                  <IconButton onClick={onDeleteClick} size="small"><DeleteIcon /></IconButton> */}
                  </Grid>
                </Grid>
              </Box>
              <Box flex={9} className={classes.body}>
                {this.renderRows(avaliacao)}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CardAvaliacao);
