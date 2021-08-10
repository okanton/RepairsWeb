import { MenuItem, TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { Entity } from '../entities';

type AppSelectorProps<T> = {
    selectedValue: number | string;
    items: T[];
    isReadOnly?: boolean;
};

const AppSelector = <T extends Entity>({
    selectedValue,
    items,
    variant = "outlined",
    size = "small",
    fullWidth = true,
    isReadOnly = false,
    ...restProps
}: AppSelectorProps<T> & TextFieldProps) => (
        <TextField
            value={selectedValue}
            select
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            InputProps={{
                readOnly: isReadOnly,
            }}
            {...restProps}
        >
            {items.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                    {item.value}
                </MenuItem>
            ))}
        </TextField>
    );

export default React.memo(AppSelector);