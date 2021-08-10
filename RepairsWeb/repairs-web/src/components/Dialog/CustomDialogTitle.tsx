import React from 'react';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { IconButtonWithTooltip } from 'itplus-react-ui';

interface CustomProps {
    title: string;
    onClose?: () => void;
}

export interface CustomDialogTitleProps
    extends Omit<DialogTitleProps, 'title'>,
    CustomProps { }

const useStyles = makeStyles(() => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
    },
}));

const CustomDialogTitle = ({
    title,
    children,
    onClose,
    ...restProps
}: CustomDialogTitleProps) => {
    const classes = useStyles();
    return (
        <DialogTitle disableTypography className={classes.root} {...restProps}>
            <Typography className={classes.title} variant="h6">
                {title}
            </Typography>
            {children}
            {onClose ? (
                <IconButtonWithTooltip
                    onClick={onClose}
                    tooltipTitle="Закрыть"
                    buttonIcon={<CloseIcon />}
                    color="secondary"
                />
            ) : null}
        </DialogTitle>
    );
};

export default React.memo(CustomDialogTitle);