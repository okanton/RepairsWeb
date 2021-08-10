import { Column } from "@devexpress/dx-react-grid";
import { Mails } from "../../../entities";

export const columns: Column[] = [
  {
    name: "name",
    title: "Название сервисной организации",
  },
  {
    name: "mailTypeId",
    title: "Тип сервиса",
    getCellValue: (row: Mails) =>
      row.serviceTypeId === 1
        ? "Сервис по ремонту оборудования"
        : "Сервис по заправке картриджей",
  },
  {
    name: "mail",
    title: "Адрес электронной почты",
  },
  {
    name: "isActive",
    title: "Статус",
    getCellValue: (row: Mails) => (row.isActive ? "Активен" : "Неактивен"),
  },
];

export const getRowId = (row: Mails) => row.id;
