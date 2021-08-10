import { Column } from "@devexpress/dx-react-grid";
import { Repair } from "../../../entities";

export const columns: Column[] = [
  {
    name: "id",
    title: "№",
  },
  {
    name: "money",
    title: "Стоимость",
    getCellValue: (row: Repair) =>
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
    getCellValue: (row: Repair) => row.approvalStatus.value,
  },
  {
    name: "createDate",
    title: "Дата создания",
    getCellValue: (row: Repair) =>
      row.createDate !== null
        ? new Date(row.createDate).toLocaleDateString()
        : "",
  },
  {
    name: "executeDate",
    title: "Дата закрытия",
    getCellValue: (row: Repair) =>
      row.executeDate !== null
        ? new Date(row.executeDate).toLocaleDateString()
        : "",
  },
  {
    name: "requestNumber",
    title: "№ заявки ОТ",
  },
  {
    name: "organization",
    title: "Организация",
    getCellValue: (row: Repair) => row.organization.value,
  },
  {
    name: "address",
    title: "Площадка",
    getCellValue: (row: Repair) => row.address.value,
  },
  {
    name: "model",
    title: "Модель оборудования",
  },
  {
    name: "trouble",
    title: "Неисправность",
  },
  {
    name: "clientFullUserName",
    title: "Клиент",
    getCellValue: (row: Repair) =>
      row.client != null ? row.client.fullUserName : "",
  },
  {
    name: "clientDepartment",
    title: "Отдел клиента",
    getCellValue: (row: Repair) =>
      row.client != null ? row.client.userDepartment : "",
  },
  {
    name: "itFullUserName",
    title: "It сотрудник",
    getCellValue: (row: Repair) =>
      row.itUser != null ? row.itUser.fullUserName : "",
  },
  {
    name: "itDepartment",
    title: "It Отдел",
    getCellValue: (row: Repair) =>
      row.itUser != null ? row.itUser.userDepartment : "",
  },
  {
    name: "information",
    title: "Доп.информация",
  },
];

export const defaultHiddenColumns = [
  "clientDepartment",
  "itFullUserName",
  "itDepartment",
  "information",
  "comment",
];

export const defColHidden = (roles: string[]) =>
  roles.includes("Administrator")
    ? defaultHiddenColumns
    : [...defaultHiddenColumns, "money"];

export const getRowId = (row: Repair) => row.id;
