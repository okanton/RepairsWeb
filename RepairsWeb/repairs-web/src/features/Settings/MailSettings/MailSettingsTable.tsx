import { SelectionState } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
import { without } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RowComponent from "../../../components/DxGridPlugins/RowComponent";
import { Mails } from "../../../entities";
import { selectedMailIdSelector } from "../../../selectors/mails-selectors";
import { mailSettingsActions } from "../../../slices/mail-settings";
import { columns, getRowId } from "./mail-settings-columns";

interface MailSettingsTableProps {
    items: Array<Mails>;
}

const MailSettingsTable = ({ items }: MailSettingsTableProps) => {
    const dispatch = useDispatch();
    
    const selectedMailId = useSelector(selectedMailIdSelector);
    const handleSelect = (selectedId: Array<number | string>) => {
        const newVal = without(selectedId, ...selectedMailId);
        dispatch(mailSettingsActions.setSelectedMailId(newVal));
    };

    return (
        <Grid columns={columns} rows={items} getRowId={getRowId}>
            <SelectionState
                onSelectionChange={handleSelect}
                selection={selectedMailId}
            />
            <Table />
            <TableHeaderRow />
            <TableSelection
                rowComponent={RowComponent}
                showSelectionColumn={false}
                selectByRowClick={true}
                highlightRow
            />
        </Grid>
    );
};

export default React.memo(MailSettingsTable);