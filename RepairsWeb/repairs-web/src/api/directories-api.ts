import axios from "axios";
import { Entity } from "../entities";

const directoryController = "/Directory";

export const saveAddressAPI = async (address: Entity) => {
  const { data } = await axios.post<Entity>(
    `${directoryController}/SaveAddress`,
    address
  );
  return data;
};

export const deleteAddressAPI = async (addressId: number) => {
  const { data } = await axios.delete<number>(
    `${directoryController}/DeleteAddress`,
    {
      params: { addressId },
    }
  );
  return data;
};