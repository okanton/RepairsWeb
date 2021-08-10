import axios from "axios";
import { ApprovalStatusParameter, FilterParameters, Repair } from "../entities";

const repairsController = "/Repairs";
export const GetRepairsByFilterParametersAPI = async (
  filterParameters: FilterParameters
) => {
  const { data } = await axios.post<Array<Repair>>(
    `${repairsController}/GetRepairsByFilterParameters`,
    filterParameters
  );
  return data;
};

export const InsertNewRepairAPI = async (repair: Repair) => {
  const { data } = await axios.post<Repair>(
    `${repairsController}/InsertNewRepair`,
    repair
  );
  return data;
};

export const changeRepairApprovalStatusAPI = async (
  approvalStatusParameter: ApprovalStatusParameter
) => {
  const { data } = await axios.post<Repair>(
    `${repairsController}/ChangeRepairApprovalStatus`,
    approvalStatusParameter
  );
  return data;
};

export const getCompleteRepairsMoneyByPeriodAPI = async (
  dateFrom: Date,
  dateTo: Date
) => {
  const { data } = await axios.get<number>(
    `${repairsController}/GetCompleteRepairsMoneyByPeriod`,
    {
      params: {
        dateFrom,
        dateTo,
      },
    }
  );
  return data;
};

export const getEconomyRepairsMoneyForCurrentPeriodAPI = async () => {
  const { data } = await axios.get<number>(
    `${repairsController}/GetEconomyRepairsMoneyForCurrentPeriod`
  );
  return data;
};
