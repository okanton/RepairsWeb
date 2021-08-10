import { Paper, PaperProps } from '@material-ui/core';
import React from 'react';
import Draggable from 'react-draggable';

const PaperComponent = (props: PaperProps) => (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
    </Draggable>
);

export default React.memo(PaperComponent);