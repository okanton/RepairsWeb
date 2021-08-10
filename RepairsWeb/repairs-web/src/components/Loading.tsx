import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        loader: {
            width: '100%',
            padding: theme.spacing(3),
        },
        loaderWrapper: {
            margin: theme.spacing(0, 'auto'),
            minHeight: '90vh',
            maxWidth: 320,
            display: 'flex',
            alignItems: 'center',
        },
    })
));

const Loading = () => {
    const classes = useStyles();

    return (
        <div className={classes.loaderWrapper}>
            <div className={classes.loader}>
                <LinearProgress />
            </div>
        </div>
    );
};

export default Loading;