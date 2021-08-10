import { makeStyles, Typography } from "@material-ui/core";
import { Dashboard, LogoIcon } from "itplus-react-ui";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "7% auto 0",
  },
});

export const HomePage = () => {
  const classes = useStyles();
  return (
    <>
      <Dashboard.MainContainer className={classes.root}>
        <Link to="/">
          <LogoIcon
            mainColor="blueGrey"
            accentColor="deepOrange"
            svgIconProps={{ fontSize: "large" }}
          />
        </Link>
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            Добро пожаловать!
          </Typography>
          <Typography variant="body1">
            Вас приветствует Web-интерфейс "Ремонты ТПлюс"
          </Typography>
          <Typography variant="body1">
            По всем вопросам и предложениям просьба обращаться
          </Typography>
          <Typography variant="body1">
            к Администратору системы Недопекину М.Е.
          </Typography>
          <Typography variant="body1">
            тел: +7(342)243-71-23 / Maksim.Nedopyekin@tplusgroup.ru
          </Typography>
        </>
      </Dashboard.MainContainer>
    </>
  );
};
