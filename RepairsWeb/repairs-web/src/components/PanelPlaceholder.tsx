import React from "react";

import Avatar from "@material-ui/core/Avatar";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

export interface PanelPlaceholderProps {
  primaryText?: React.ReactNode;
  secondaryText?: React.ReactNode;
  iconComponent?: React.ComponentType<SvgIconProps>;
  dividers?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.default,
    },
    icon: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  })
);

const PanelPlaceholder = (props: PanelPlaceholderProps) => {
  const {
    primaryText,
    secondaryText,
    iconComponent: Icon,
    dividers = false,
  } = props;
  const classes = useStyles();
  return (
    <DialogContent dividers={dividers} className={classes.wrapper}>
      {Icon && (
        <Zoom in={true}>
          <Avatar className={classes.icon}>
            <Icon fontSize="large" />
          </Avatar>
        </Zoom>
      )}
      <Typography align="center" color="inherit" variant="h5" gutterBottom>
        {primaryText}
      </Typography>
      <Typography align="center" color="inherit" paragraph>
        {secondaryText}
      </Typography>
    </DialogContent>
  );
};

export default React.memo(PanelPlaceholder);
