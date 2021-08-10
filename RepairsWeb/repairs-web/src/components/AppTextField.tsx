import { TextField, TextFieldProps } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

type AppTextFieldProps = {
    onChangeValue?: (value: string) => void;
};

const AppTextField = ({
    size = 'small',
    fullWidth = true,
    variant = 'outlined',
    onChangeValue,
    ...restProps
}: TextFieldProps & AppTextFieldProps) => {
    const changeTextFieldHandler = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        if (onChangeValue) onChangeValue(event.target.value);
    };
    return (
        <TextField
            size={size}
            InputProps={{
                readOnly: onChangeValue === undefined,
            }}
            fullWidth={fullWidth}
            onChange={changeTextFieldHandler}
            variant={variant}
            {...restProps}
        />
    );
};

export default React.memo(AppTextField);