import {
  IntegratedSelection,
  IntegratedSorting,
  SelectionState,
  SortingState,
} from "@devexpress/dx-react-grid";
import {
  ColumnChooser,
  Grid,
  Table,
  TableColumnResizing,
  TableColumnVisibility,
  TableHeaderRow,
  TableSelection,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import { Paper } from "@material-ui/core";
import React from "react";
import PageviewIcon from "@material-ui/icons/Pageview";
import RowComponent from "../../../components/DxGridPlugins/RowComponent";
import SortLableHeaderCellComponent from "../../../components/DxGridPlugins/SortLableComponent";
import AppSimpleDialog from "../../../components/Dialog/AppSimpleDialog";
import { filterSettingsActions } from "../../../slices/filter-settings-slice";
import { repairsActions } from "../../../slices/repairs-slice";
import { repairsDataActions } from "../../../dataLayer/repairs-data-slice";
import { ApprovalStatusesEnum } from "../../../entities/enums";
import { useAppDispatch } from "../../../App/appHooks";
import { columns, getRowId } from "./repairs-columns";
import PanelPlaceholder from "../../../components/PanelPlaceholder";
import { ColumnChooserTooltip } from "../../../components/DxGridPlugins/column-chooser-tooltip";
import RepairStatusDialog from "../RepairStatusDialog";
import useTable from "./useTable";

const RepairsTable = () => {
  const dispatch = useAppDispatch();
  const {
    rows,
    showApprovalStatusDialog,
    approvalStatus,
    defaultColumnWidths,
    defaultHiddenColumnNames,
    access,
    tableColumnVisibilityColumnExtensions,
  } = useTable();

  const handleSelect = (selectedId: Array<number | string>) => {
    const id = selectedId[0] as number;
    const repair = rows.find((p) => p.id === id);
    if (
      (repair && repair.approvalStatus.id !== ApprovalStatusesEnum.completed) ||
      (repair && access.roles.includes("Administrator"))
    ) {
      dispatch(
        repairsActions.setRepairApprovalStatus({
          id: id,
          approvalStatusId: repair.approvalStatus.id,
          money: repair.money,
          executeDate: repair.executeDate ?? new Date(),
          comment: repair.comment,
        })
      );
      dispatch(repairsActions.setSelectedRepair(repair));
      dispatch(filterSettingsActions.setShowApprovalStatusDialog(true));
    }
  };
  const handleCloseApprovalStatusDialog = () => {
    dispatch(filterSettingsActions.setShowApprovalStatusDialog(false));
  };
  const onChangeMoneyHandler = (money: string) => {
    dispatch(
      repairsActions.setRepairApprovalStatus({
        ...approvalStatus,
        money: parseFloat(money),
      })
    );
  };
  const onChangeApprovalStatusHandler = (approvalStatusId: number) => {
    dispatch(
      repairsActions.setRepairApprovalStatus({
        ...approvalStatus,
        approvalStatusId,
      })
    );
  };
  const onChangeExecuteDateHandler = (date: Date) => {
    dispatch(
      repairsActions.setRepairApprovalStatus({
        ...approvalStatus,
        executeDate: date,
      })
    );
  };
  const saveHandler = () => {
    dispatch(repairsDataActions.changeRepairApprovalStatus(approvalStatus));
    dispatch(filterSettingsActions.setShowApprovalStatusDialog(false));
  };
  const onChangeCommentHandler = (comment: string) => {
    dispatch(
      repairsActions.setRepairApprovalStatus({
        ...approvalStatus,
        comment,
      })
    );
  };

  return (
    <Paper style={{ minHeight: "80vh" }}>
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
          <SelectionState onSelectionChange={handleSelect} selection={[]} />
          <IntegratedSelection />
          <Table />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={SortLableHeaderCellComponent}
          />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
            columnExtensions={tableColumnVisibilityColumnExtensions}
          />
          <TableSelection
            rowComponent={RowComponent}
            showSelectionColumn={false}
            selectByRowClick={true}
            highlightRow
          />
          <Toolbar />
          <ColumnChooser messages={ColumnChooserTooltip.messages} />
        </Grid>
      )}

      <AppSimpleDialog
        open={showApprovalStatusDialog}
        onEscapeKeyDown={handleCloseApprovalStatusDialog}
        maxWidth="xs"
        fullWidth
      >
        <RepairStatusDialog
          approvalStatusId={approvalStatus.approvalStatusId}
          comment={approvalStatus.comment}
          onChangeComment={onChangeCommentHandler}
          onChangeMoney={onChangeMoneyHandler}
          onChangeStatus={onChangeApprovalStatusHandler}
          onCloseDialog={handleCloseApprovalStatusDialog}
          money={approvalStatus.money}
          executeDate={approvalStatus.executeDate}
          saveHandler={saveHandler}
          onChangeExecuteDate={onChangeExecuteDateHandler}
        />
      </AppSimpleDialog>
    </Paper>
  );
};

export default React.memo(RepairsTable);
