import { IconButton, Paper } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import React from "react";

interface CRUIDPanelProps {
    clickAdd: () => void;
    clickEdit: () => void;
    clickDelete: () => void;
    disableEdit?: boolean;
}

const CRUIDPanel = ({
    clickAdd,
    clickDelete,
    clickEdit,
    disableEdit = true,
}: CRUIDPanelProps) => {
    return (
        <Paper>
            <IconButton onClick={clickAdd}>
                <Icons.Add />
            </IconButton>
            <IconButton onClick={clickEdit} disabled={disableEdit}>
                <Icons.Edit />
            </IconButton>
            <IconButton onClick={clickDelete} disabled={disableEdit}>
                <Icons.Delete />
            </IconButton>
        </Paper>
    );
};

export default React.memo(CRUIDPanel);