import { withStyles } from "@material-ui/styles";
import { Tooltip } from "@material-ui/core";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: "0.875rem",
    padding: theme.spacing(1),
  },
}))(Tooltip);

export default LightTooltip;

