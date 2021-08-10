import axios from "axios";
import { TimeConstraint } from "../entities";

const filterSettingsController = "/FilterSettings";

export const getTimeConstraintAPI = async (taskType: number) => {
  const { data } = await axios.get<TimeConstraint>(
    `${filterSettingsController}/GetTimeConstraint`,
    { params: { taskType: taskType } }
  );
  return data;
};