import React from 'react';
import { TableSelection, Table } from '@devexpress/dx-react-grid-material-ui';

const RowComponent = ({
    children,
    onToggle,
    tableRow,
    highlighted,
}: TableSelection.RowProps) => (
        <Table.Row
            tableRow={tableRow}
            onClick={onToggle}
            selected={highlighted}
            hover
            row
        >
            {children}
        </Table.Row>
    );

export default React.memo(RowComponent);