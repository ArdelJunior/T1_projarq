import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
});

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

class CardEditTime extends Component {
  state = {
    alunosTime: [],
    alunosDisponiveis: [],

    left: [1, 2],
    right: [3, 4],
    checked: [],
    leftChecked: [],
    rightChecked: [],
  };

  componentDidMount() {
    const { checked, left, right } = this.state;
    const { leftList, rightList } = this.props;
    console.log(rightList);
    this.setState({
      // left: leftList,
      // right: rightList,
      leftChecked: intersection(checked, left),
      rightChecked: intersection(checked, right),
    });
  }

  // componentDidUpdate() {
  //   const { checked, left, right } = this.state;
  //   this.setState({
  //     leftChecked: intersection(checked, left),
  //     rightChecked: intersection(checked, right),
  //   });
  // }

  handleCheck = () => {
    const { checked, left, right } = this.state;
    this.setState({
      leftChecked: intersection(checked, left),
      rightChecked: intersection(checked, right),
    });
  }

  handleToggle = (value) => () => {
    const checked = this.state.checked;

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  numberOfChecked = (items) => {
    return intersection(this.state.checked, items).length;
  };

  handleToggleAll = (items) => () => {
    if (this.numberOfChecked(items) === items.length) {
      this.setState({
        checked: not(this.state.checked, items),
      });
    } else {
      this.setState({
        checked: union(this.state.checked, items),
      });
    }
  };

  handleCheckedRight = () => {
    const { left, right, checked, leftChecked } = this.state;
    this.setState({
      right: right.concat(leftChecked),
      left: not(left, leftChecked),
      checked: not(checked, leftChecked),
    });
  };

  handleCheckedLeft = () => {
    const { left, right, checked, rightChecked } = this.state;
    this.setState({
      left: left.concat(rightChecked),
      right: not(right, rightChecked),
      checked: not(checked, rightChecked),
    });
  };

  customList = (title, items) => {
    const { classes } = this.props;
    const checked = this.state.checked;

    return (
      <Card>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              onClick={this.handleToggleAll(items)}
              checked={this.numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={this.numberOfChecked(items) !== items.length && this.numberOfChecked(items) !== 0}
              disabled={items.length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
          }
          title={title}
          subheader={`${this.numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List className={classes.list} dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" button onClick={this.handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );
  };

  render() {
    console.log(this.state);
    const { classes } = this.props;
    const { leftChecked, rightChecked, left, right } = this.state;

    return (
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{this.customList("Choices", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{this.customList("Chosen", right)}</Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(CardEditTime));
