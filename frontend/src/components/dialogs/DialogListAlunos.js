import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { Dialog, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ListCardAluno from "../cards/ListCardAluno";

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

class DialogListAlunos extends Component {

render() {
  const { classes, alunos, open, onClose, onCardClick } = this.props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg'>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.dialogTitle}>
                  Alunos inscritos
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.dialogBody}>
              <ListCardAluno alunos={alunos} forSelect={true} onClick={onCardClick} />
            </div>
          </Dialog>
  );
  }

}

export default withRouter(withStyles(styles)(DialogListAlunos));