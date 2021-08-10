import { Column } from "@devexpress/dx-react-grid";
import { Refilling } from "../../../entities";

export const columns: Column[] = [
  {
    name: "id",
    title: "№",
  },
  {
    name: "money",
    title: "Стоимость",
    getCellValue: (row: Refilling) =>
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(row.money),
  },
  {
    name: "comment",
    title: "Примечание",
  },
  {
    name: "approvalStatus",
    title: "Статус согласования",
    getCellValue: (row: Refilling) => row.approvalStatus.value,
  },
  {
    name: "count",
    title: "Количество",
  },
  {
    name: "createDate",
    title: "Дата создания",
    getCellValue: (row: Refilling) =>
      row.createDate !== null
        ? new Date(row.createDate).toLocaleDateString()
        : "",
  },
  {
    name: "executeDate",
    title: "Дата закрытия",
    getCellValue: (row: Refilling) =>
      row.executeDate !== null
        ? new Date(row.executeDate).toLocaleDateString()
        : "",
  },
  {
    name: "address",
    title: "Площадка",
    getCellValue: (row: Refilling) => row.address.value,
  },
  {
    name: "fullUserName",
    title: "Заявитель",
    getCellValue: (row: Refilling) =>
      row.itUser !== null ? row.itUser.fullUserName : "",
  },
  {
    name: "userDepartment",
    title: "Отдел",
    getCellValue: (row: Refilling) =>
      row.itUser !== null ? row.itUser.userDepartment : "",
  },
];

export const defColHidden = (roles: string[]) =>
  roles.includes("Administrator") ? ["comment"] : ["money", "comment"];

export const getRowId = (row: Refilling) => row.id;
