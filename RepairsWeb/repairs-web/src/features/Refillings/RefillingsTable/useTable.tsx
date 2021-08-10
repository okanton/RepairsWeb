import React from "react";
import { useSelector } from "react-redux";
import { userAccessInformaionSelector } from "../../../selectors/common-selectors";
import { showApprovalStatusDialogSelector } from "../../../selectors/filter-settings-selectors";
import {
  refillingsSelector,
  selectedRefillingApprovalStatusSelector,
} from "../../../selectors/refillings-selectors";
import { getHiddenColumn } from "../../../utils";
import { defColHidden } from "./refillings-columns";

export default () => {
  const rows = useSelector(refillingsSelector);
  const access = useSelector(userAccessInformaionSelector);

  const approvalStatus = useSelector(selectedRefillingApprovalStatusSelector);
  const showApprovalStatusDialog = useSelector(
    showApprovalStatusDialogSelector
  );

  const [defaultColumnWidths] = React.useState([
    { columnName: "id", width: 80 },
    { columnName: "money", width: 110 },
    { columnName: "comment", width: 150 },
    { columnName: "approvalStatus", width: 180 },
    { columnName: "count", width: 120 },
    { columnName: "createDate", width: 160 },
    { columnName: "executeDate", width: 160 },
    { columnName: "address", width: 200 },
    { columnName: "fullUserName", width: 240 },
    { columnName: "userDepartment", width: 500 },
  ]);
  const [defaultHiddenColumnNames] = React.useState(defColHidden(access.roles));
  const [tableColumnVisibilityColumnExtensions] = React.useState([
    {
      columnName: getHiddenColumn(
        "money",
        !access.roles.includes("Administrator")
      ),
      togglingEnabled: false,
    },
  ]);

  return {
    rows,
    access,
    approvalStatus,
    showApprovalStatusDialog,
    defaultColumnWidths,
    defaultHiddenColumnNames,
    tableColumnVisibilityColumnExtensions,
  };
};
