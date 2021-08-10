import React from "react";
import { useSelector } from "react-redux";
import { userAccessInformaionSelector } from "../../../selectors/common-selectors";
import { repairsForReportByOrganizationSelector } from "../../../selectors/repairs-selector";
import { getHiddenColumn } from "../../../utils";
import { defColHidden } from "../../Repairs/RepairsTable/repairs-columns";

export default () => {
  const rows = useSelector(repairsForReportByOrganizationSelector);
  const access = useSelector(userAccessInformaionSelector);

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

  const [defaultColumnWidths] = React.useState([
    { columnName: "id", width: 80 },
    { columnName: "money", width: 110 },
    { columnName: "comment", width: 150 },
    { columnName: "approvalStatus", width: 180 },
    { columnName: "createDate", width: 140 },
    { columnName: "executeDate", width: 140 },
    { columnName: "requestNumber", width: 130 },
    { columnName: "organization", width: 130 },
    { columnName: "address", width: 190 },
    { columnName: "model", width: 180 },
    { columnName: "trouble", width: 300 },
    { columnName: "clientFullUserName", width: 240 },
    { columnName: "clientDepartment", width: 100 },
    { columnName: "itFullUserName", width: 100 },
    { columnName: "itDepartment", width: 100 },
    { columnName: "information", width: 170 },
  ]);
  return {
    rows,
    defaultHiddenColumnNames,
    tableColumnVisibilityColumnExtensions,
    defaultColumnWidths,
  };
};
