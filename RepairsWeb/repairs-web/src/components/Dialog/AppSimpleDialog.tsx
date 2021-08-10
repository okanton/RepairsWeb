import React, { PropsWithChildren } from 'react';
import { Dialog, DialogProps } from '@material-ui/core';

const AppSimpleDialog = ({
    children,
    fullWidth = false,
    maxWidth = 'sm',
    ...restProps
}: PropsWithChildren<DialogProps>) => (
        <Dialog
            {...restProps}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            {children}
        </Dialog>
    );

export default React.memo(AppSimpleDialog);