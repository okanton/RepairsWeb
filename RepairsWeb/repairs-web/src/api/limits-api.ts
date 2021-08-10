import axios from "axios";
import { Limits } from "../entities";

const limitsController = "/Limits";

export const getLimitsByPeriodsAPI = async (dateFrom: Date, dateTo: Date) => {
  const { data } = await axios.get<Limits[]>(
    `${limitsController}/GetLimitsByPeriod`,
    {
      params: {
        dateFrom,
        dateTo,
      },
    }
  );
  return data;
};

export const saveLimitAPI = async (limit: Limits) => {
  const { data } = await axios.post<Limits>(
    `${limitsController}/SaveLimit`,
    limit
  );
  return data;
};

export const getCurrentLimitsCostAPI = async () => {
  const { data } = await axios.get<Limits[]>(
    `${limitsController}/GetCurrentLimitCost`
  );
  return data;
};
