import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert/Alert';
import React from 'react';
import { Result } from '../entities';

type AppResultStatusBarProps = {
    result: Result;
    isOpen: boolean;
    handleClose: () => void;
};

const AppResultStatusBar = ({
    result,
    isOpen,
    handleClose,
}: AppResultStatusBarProps) => (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={result.resultStatus}
            >
                {result.message}
            </Alert>
        </Snackbar>
    );

export default React.memo(AppResultStatusBar);