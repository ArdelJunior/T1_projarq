import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';

import CardAluno from './CardAluno';

const styles = theme => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  paperSelected: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: '#DEF',
  },
});

class CardAlunoSelect extends Component {
  state = {
    selected: this.props.selected,
  }

  handleClick = () => {
    this.props.onClick(this.props.idx, !this.state.selected);
    this.setState({
      selected: !this.state.selected
    });
  }

  render() {
    const { classes, key, nome, curso } = this.props;
    return (
      <CardAluno
        key={key}
        idx={key}
        nome={nome}
        curso={curso}
        className={this.state.selected ? classes.paperSelected : classes.paper}
        onClick={this.handleClick} />
    )
  }
}

export default withStyles(styles)(CardAlunoSelect);