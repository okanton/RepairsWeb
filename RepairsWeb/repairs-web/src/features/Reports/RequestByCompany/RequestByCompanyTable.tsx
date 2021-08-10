import { Paper } from "@material-ui/core";
import React from "react";
import PanelPlaceholder from "../../../components/PanelPlaceholder";
import PageviewIcon from "@material-ui/icons/Pageview";
import { columns, getRowId } from "../../Repairs/RepairsTable/repairs-columns";
import {
  ColumnChooser,
  Grid,
  Table,
  TableColumnResizing,
  TableColumnVisibility,
  TableGroupRow,
  TableHeaderRow,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import {
  GroupingState,
  IntegratedGrouping,
  IntegratedSorting,
  SortingState,
} from "@devexpress/dx-react-grid";
import { ColumnChooserTooltip } from "../../../components/DxGridPlugins/column-chooser-tooltip";
import SortLableHeaderCellComponent from "../../../components/DxGridPlugins/SortLableComponent";
import useTable from "./useTable";

const RequestByCompanyTable = () => {
  const {
    rows,
    defaultHiddenColumnNames,
    tableColumnVisibilityColumnExtensions,
    defaultColumnWidths,
  } = useTable();

  return (
    <Paper style={{ minHeight: "85vh" }}>
      {rows.length === 0 ? (
        <PanelPlaceholder
          primaryText="Список пуст"
          secondaryText="Попробуйте изменить настройки фильтра"
          iconComponent={PageviewIcon}
          dividers
        />
      ) : (
        <Grid columns={columns} rows={rows} getRowId={getRowId}>
          <SortingState />
          <IntegratedSorting />
          <GroupingState grouping={[{ columnName: "organization" }]} />
          <IntegratedGrouping />
          <Table />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={SortLableHeaderCellComponent}
          />
          <TableGroupRow />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
            columnExtensions={tableColumnVisibilityColumnExtensions}
          />
          <Toolbar />
          <ColumnChooser messages={ColumnChooserTooltip.messages} />
        </Grid>
      )}
    </Paper>
  );
};

export default React.memo(RequestByCompanyTable);
