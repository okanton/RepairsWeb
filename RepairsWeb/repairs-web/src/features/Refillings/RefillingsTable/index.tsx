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
import AppSimpleDialog from "../../../components/Dialog/AppSimpleDialog";
import RowComponent from "../../../components/DxGridPlugins/RowComponent";
import SortLableHeaderCellComponent from "../../../components/DxGridPlugins/SortLableComponent";
import PanelPlaceholder from "../../../components/PanelPlaceholder";
import { refillingDataActions } from "../../../dataLayer/refillings-data-slice";
import { ApprovalStatusesEnum } from "../../../entities/enums";
import { filterSettingsActions } from "../../../slices/filter-settings-slice";
import { refillingsActions } from "../../../slices/refillings-slice";
import { columns, getRowId } from "./refillings-columns";
import { ColumnChooserTooltip } from "../../../components/DxGridPlugins/column-chooser-tooltip";
import RefillingStatusDialog from "../RefillingStatusDialog";
import useTable from "./useTable";
import { useAppDispatch } from "../../../App/appHooks";

const RefillingsTable = () => {
  const dispatch = useAppDispatch();

  const {
    rows,
    access,
    approvalStatus,
    showApprovalStatusDialog,
    defaultColumnWidths,
    defaultHiddenColumnNames,
    tableColumnVisibilityColumnExtensions,
  } = useTable();

  const handleSelect = (selectedId: Array<number | string>) => {
    const id = selectedId[0] as number;
    const refilling = rows.find((p) => p.id === id);
    if (
      (refilling &&
        refilling.approvalStatus.id !== ApprovalStatusesEnum.completed) ||
      (refilling && access.roles.includes("Administrator"))
    ) {
      dispatch(
        refillingsActions.setRefilllingApprovalStatus({
          id: id,
          approvalStatusId: refilling.approvalStatus.id,
          money: refilling.money,
          executeDate: new Date(),
          comment: refilling.comment,
        })
      );
      dispatch(filterSettingsActions.setShowApprovalStatusDialog(true));
    }
  };

  const handleCloseApprovalStatusDialog = () => {
    dispatch(filterSettingsActions.setShowApprovalStatusDialog(false));
  };

  const onChangeMoneyHandler = (money: string) => {
    dispatch(
      refillingsActions.setRefilllingApprovalStatus({
        ...approvalStatus,
        money: parseFloat(money),
      })
    );
  };

  const onChangeApprovalStatusHandler = (approvalStatusId: number) => {
    dispatch(
      refillingsActions.setRefilllingApprovalStatus({
        ...approvalStatus,
        approvalStatusId,
      })
    );
  };
  const onChangeExecuteDateHandler = (date: Date) => {
    dispatch(
      refillingsActions.setRefilllingApprovalStatus({
        ...approvalStatus,
        executeDate: date,
      })
    );
  };
  const saveHandler = () => {
    dispatch(
      refillingDataActions.changeRefillingApprovalStatus(approvalStatus)
    );
    dispatch(filterSettingsActions.setShowApprovalStatusDialog(false));
  };
  const onChangeCommentHandler = (comment: string) => {
    dispatch(
      refillingsActions.setRefilllingApprovalStatus({
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
        <RefillingStatusDialog
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

export default React.memo(RefillingsTable);
