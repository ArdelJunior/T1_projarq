import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import {
  CssBaseline,
  Grid,
  Paper,
  Box,
  Typography,
  TableBody,
  Table,
  TableRow,
  TableCell,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ApiReq from "../common/ApiReq";

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
  select: {
    minWidth: "200px",
  },
});

class CardAvaliacao extends Component {
  state = {
    times: null,
    selectedTime: null,
    selectOpen: false,
  };

  api = ApiReq.getInstance();

  handleSelectChange = (e) => {
    const { onChangeTime, timesSelect } = this.props;
    this.setState({
      selectedTime: e.target.value,
    });
    const st = timesSelect.filter((t) => t.id === e.target.value);
    onChangeTime(st.length ? st[0] : null);
  };

  handleOpen = () => {
    this.setState({
      selectOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      selectOpen: false,
    });
  };

  renderRows = (avaliacao) => {
    const { classes, editing, onChangeRating } = this.props;
    return avaliacao.length ? (
      <Table className={classes.table}>
        <TableBody>
          {avaliacao.map((a, key) => {
            return (
              <TableRow key={key}>
                <TableCell>{a.criterio.nome}</TableCell>
                <TableCell>
                  <Rating name={a.criterio.nome} value={a.nota} readOnly={!editing} onChange={(e, nota) => onChangeRating(a, nota)} />
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
    const { classes, className, onEditClick, onDeleteClick, time, timesSelect, avaliacao, avaliador, toAdd, readOnly, editing, showInTitle } = this.props;
    const { selectOpen, selectedTime } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid item xs={12} md={editing ? 12 : 4} className={classes.root}>
          <Paper className={className || classes.paper}>
            <Box display="flex" flexDirection="column" className={classes.container}>
              <Box flex={2} className={classes.header}>
                <Grid container>
                  <Grid item xs={12}>
                    {!toAdd ? (
                      <Typography variant="h6" className={classes.cardTitle}>
                        {showInTitle === "avaliador" ? avaliador.nome : time.nome}
                      </Typography>
                    ) : (
                      <FormControl className={classes.select}>
                        <InputLabel id="selectLabel">Time</InputLabel>
                        <Select
                          labelId="selectLabel"
                          name="time"
                          placeholder={"Time"}
                          open={selectOpen}
                          onOpen={this.handleOpen}
                          onClose={this.handleClose}
                          value={selectedTime ? selectedTime : ""}
                          onChange={this.handleSelectChange}
                        >
                          {timesSelect &&
                            timesSelect.map((t, key) => {
                              return (
                                <MenuItem key={key} value={t.id}>
                                  {t.nome}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={2} style={{ position: "absolute" }}>
                    {!editing && !readOnly && (
                      <>
                        <IconButton onClick={onEditClick} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={onDeleteClick} size="small">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
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
