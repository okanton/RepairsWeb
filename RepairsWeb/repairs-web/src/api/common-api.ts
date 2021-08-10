import axios from "axios";
import { Entity, UserAccessInformation } from "../entities";

const commonController = "/Common";

export const getAddressesAPI = async () => {
  const { data } = await axios.get<Entity[]>(`${commonController}/GetAddresses`);
  return data;
};

export const getOrganizationsAPI = async () => {
  const { data } = await axios.get<Entity[]>(
    `${commonController}/GetOrganizations`
  );
  return data;
};

export const getDeviceTypesAPI = async () => {
  const { data } = await axios.get<Entity[]>(
    `${commonController}/GetDeviceTypes`
  );
  return data;
};

export const getApprovalStatusesAPI = async () => {
  const { data } = await axios.get<Entity[]>(
    `${commonController}/GetApprovalStatuses`
  );
  return data;
};

export const getUserAccessInformationAPI = async () => {
  const { data } = await axios.get<UserAccessInformation>(
    `${commonController}/GetAccess`
  );
  return data;
};