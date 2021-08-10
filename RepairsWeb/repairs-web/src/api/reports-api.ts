import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { FilterParameters } from "../entities";
import { dateToString } from "../utils";

const reportsController = "/Reports";

export const getFilteredRepairsByExcelAPI = async (
  filterParameters: FilterParameters
) => {
  await axios({
    url: `${reportsController}/GetCommonRepairsExcelReport`,
    method: "POST",
    responseType: "blob",
    data: filterParameters,
  } as AxiosRequestConfig)
    .then((responce: AxiosResponse) => {
      const url = window.URL.createObjectURL(
        new Blob([responce.data], { type: responce.data.type })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Отчет по ремонтам за период с ${dateToString(
          filterParameters.dateFrom
        )} по ${dateToString(filterParameters.dateTo)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((err: Error) => console.log(err));
};

export const getRepairsByOrganizationToExcelAPI = async (
  filterParameters: FilterParameters
) => {
  await axios({
    url: `${reportsController}/GetRepairsByCompanyExelReport`,
    method: "POST",
    responseType: "blob",
    data: filterParameters,
  } as AxiosRequestConfig)
    .then((responce: AxiosResponse) => {
      const url = window.URL.createObjectURL(
        new Blob([responce.data], { type: responce.data.type })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Отчет по ремонтам с разбивкой по компаниям за период с ${dateToString(
          filterParameters.dateFrom
        )} по ${dateToString(filterParameters.dateTo)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((err: Error) => console.log(err));
};