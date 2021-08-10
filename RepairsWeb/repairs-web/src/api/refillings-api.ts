import axios from "axios";
import {
  ApprovalStatusParameter,
  FilterParameters,
  Refilling,
} from "../entities";

const refillingsController = "/Refillings";

export const GetRefillingsByFilterParametersAPI = async (
  filterParameters: FilterParameters
) => {
  const { data } = await axios.post<Array<Refilling>>(
    `${refillingsController}/GetRefillingsByFilterParameters`,
    filterParameters
  );
  return data;
};

export const InsertNewRefillingAPI = async (refilling: Refilling) => {
  const { data } = await axios.post<Refilling>(
    `${refillingsController}/InsertNewRefilling`,
    refilling
  );
  return data;
};

export const changeRefillingApprovalStatusAPI = async (
  approvalStatusParameter: ApprovalStatusParameter
) => {
  const { data } = await axios.post<Refilling>(
    `${refillingsController}/ChangeRefillingApprovalStatus`,
    approvalStatusParameter
  );
  return data;
};

export const getCompleteRefillingsMoneyByPeriodAPI = async (
  dateFrom: Date,
  dateTo: Date
) => {
  const { data } = await axios.get<number>(
    `${refillingsController}/GetCompleteRefillingsMoneyByPeriod`,
    {
      params: {
        dateFrom,
        dateTo,
      },
    }
  );
  return data;
};

export const getEconomyRefillingsMoneyForCurrentPeriodAPI = async () => {
  const { data } = await axios.get<number>(
    `${refillingsController}/GetEconomyRefillingsMoneyForCurrentPeriod`
  );
  return data;
};
