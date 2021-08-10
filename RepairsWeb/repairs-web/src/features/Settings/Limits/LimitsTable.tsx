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
import {
  allLimitsSelector,
  selectedLimitsIdSelector,
} from "../../../selectors/limits-selectors";
import { limitsActions } from "../../../slices/limits-slice";
import { columns, getRowId } from "./limits-columns";

const LimitsTable = () => {
  const dispatch = useDispatch();
  const items = useSelector(allLimitsSelector);
  const selectedLimitId = useSelector(selectedLimitsIdSelector);

  const handleSelect = (selectedId: Array<number | string>) => {
    const newVal = without(selectedId, ...selectedLimitId);
    dispatch(limitsActions.setLimitId(newVal));
  };
  if (items === null) return null;
  return (
    <Grid columns={columns} rows={items} getRowId={getRowId}>
      <SelectionState
        onSelectionChange={handleSelect}
        selection={selectedLimitId}
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

export default React.memo(LimitsTable);
