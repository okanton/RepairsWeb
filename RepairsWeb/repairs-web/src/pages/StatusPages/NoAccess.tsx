import React from 'react';

import { Dashboard, LogoIcon } from 'itplus-react-ui';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: "7% auto 0",
    },
});

const NoAccess = () => {
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
                        Ошибка доступа
          </Typography>
                    <Typography variant="body1">
                        У вас отсутствует доступ на данный ресурс
          </Typography>
                    <Typography variant="body1">
                        По вопросам доступа к данному ресурсу просьба обращаться
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

export default React.memo(NoAccess);