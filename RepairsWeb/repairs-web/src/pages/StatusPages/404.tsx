import React from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Dashboard, LogoIcon } from 'itplus-react-ui';

const useStyles = makeStyles({
    root: {
        margin: '7% auto 0',
    },
});

const NotFound = () => {
    const classes = useStyles();

    return (
        <>
            <Dashboard.MainContainer className={classes.root}>
                <Link to="/">
                    <LogoIcon
                        mainColor="blueGrey"
                        accentColor="deepOrange"
                        svgIconProps={{ fontSize: 'large' }}
                    />
                </Link>
                <>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Ошибка 404
          </Typography>
                    <Typography variant="body1">
                        Такой страницы не существует.
          </Typography>
                    <Typography variant="body1">
                        Убедитесь в правильности ввода адреса!
          </Typography>
                </>
            </Dashboard.MainContainer>
        </>
    );
};

export default React.memo(NotFound);