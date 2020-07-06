import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { Dialog, CssBaseline, DialogTitle, DialogContent, DialogActions, Button, Select, Grid, TextField, MenuItem } from "@material-ui/core";

import ApiReq from "../common/ApiReq";

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

class DialogAddPessoa extends Component {
  state = {};

  // handleInputChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  renderCursos = () => {
    const { cursos } = this.props;
    return cursos.map((curso, key) => {
      return (
        <MenuItem key={key} value={curso.id}>
          {curso.nome}
        </MenuItem>
      );
    });
  };

  render() {
    const { open, onClose, onSubmit, personRole, cursos } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Dialog maxWidth="xs" open={open} onClose={onClose}>
          <DialogTitle>Adicionar {personRole} </DialogTitle>
          <form onSubmit={onSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                {personRole === "aluno" && (
                  <Grid item xs={12}>
                    <TextField
                      id="matricula"
                      name="matricula"
                      label="Matrícula"
                      autoComplete="matricula"
                      variant="outlined"
                      required
                      fullWidth
                      // onChange={this.handleInputChange}
                      autoFocus
                    />
                  </Grid>
                )}
                {personRole === "aluno" && (
                  <Grid item xs={12}>
                    <Select
                      id="curso"
                      name="curso"
                      label="Curso"
                      variant="outlined"
                      type="curso"
                      required
                      autoFocus
                      fullWidth
                      // onChange={this.handleInputChange}
                    >
                      {cursos && cursos.length && this.renderCursos()}
                    </Select>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField id="nome" name="nome" label="Nome" autoComplete="nome" variant="outlined" required fullWidth onChange={this.handleInputChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail"
                    type="email"
                    autoComplete="email"
                    variant="outlined"
                    required
                    autoFocus
                    fullWidth
                    // onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    required
                    autoFocus
                    fullWidth
                    // onChange={this.handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Fechar
              </Button>
              <Button type="submit" color="primary">
                Salvar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(DialogAddPessoa));
