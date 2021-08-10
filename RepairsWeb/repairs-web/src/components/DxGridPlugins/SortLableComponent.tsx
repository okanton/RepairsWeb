import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import React from 'react';

const SortLableHeaderCellComponent = ({
    getMessage,
    column,
    ...restProps
}: TableHeaderRow.SortLabelProps) => (
        <TableHeaderRow.SortLabel
            column={column}
            getMessage={() => `Сортировать по ${column.title}`}
            {...restProps}
        />
    );

export default React.memo(SortLableHeaderCellComponent);