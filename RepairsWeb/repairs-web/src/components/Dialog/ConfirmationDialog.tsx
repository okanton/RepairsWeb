import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface ConfirmationDialogProps {
    open: boolean;
    dialogMessage: React.ReactNode;
    confirmMessage?: string;
    cancelMessage?: string;
    onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
    const {
        open,
        onCancel,
        onConfirm,
        dialogMessage,
        confirmMessage,
        cancelMessage,
    } = props;
    const theme = useTheme();
    const hideBackdrop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Dialog onClose={onCancel} open={open} hideBackdrop={hideBackdrop}>
            <DialogContent>{dialogMessage}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel} autoFocus>
                    {cancelMessage || "Отмена"}
                </Button>
                <Button onClick={onConfirm} variant="outlined" color="secondary">
                    {confirmMessage || "Удалить"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ConfirmationDialog);