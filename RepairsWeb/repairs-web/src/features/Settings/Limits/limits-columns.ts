import { Column } from "@devexpress/dx-react-grid";
import { Limits } from "../../../entities";

export const columns: Column[] = [
  {
    name: "dateFrom",
    title: "Начало периода",
    getCellValue: (row: Limits) =>
      row.dateFrom !== null ? new Date(row.dateFrom).toLocaleDateString() : "",
  },
  {
    name: "dateTo",
    title: "Конец периода",
    getCellValue: (row: Limits) =>
      row.dateTo !== null ? new Date(row.dateTo).toLocaleDateString() : "",
  },
  {
    name: "serviceType",
    title: "Тип сервиса",
    getCellValue: (row: Limits) =>
      row.serviceTypeId === 1
        ? "Сервис по ремонту оборудования"
        : "Сервис по заправке картриджей",
  },
  {
    name: "money",
    title: "Лимит",
    getCellValue: (row: Limits) =>
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(row.limit),
  },
];

export const getRowId = (row: Limits) => row.id;
