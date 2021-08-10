import React from "react";
import {
    DatePicker,
    KeyboardDatePicker,
    KeyboardDatePickerProps,
} from "@material-ui/pickers";

type Props = {
    keyboardPicker?: boolean;
};

const AppDatePicker = ({
    variant = "inline",
    autoOk = true,
    KeyboardButtonProps = { "aria-label": "change date" },
    format = "dd.MM.yyyy",
    margin = "normal",
    views = ["year", "month", "date"],
    keyboardPicker = true,
    rightArrowIcon,
    ...restProps
}: KeyboardDatePickerProps & Props) =>
    keyboardPicker ? (
        <KeyboardDatePicker
            autoOk={autoOk}
            variant={variant}
            format={format}
            views={views}
            margin={margin}
            KeyboardButtonProps={KeyboardButtonProps}
            {...restProps}
        />
    ) : (
            <DatePicker
                rightArrowIcon={rightArrowIcon}
                autoOk={autoOk}
                variant={variant}
                format={format}
                views={views}
                margin={margin}
                {...restProps}
            />
        );
export default React.memo(AppDatePicker);