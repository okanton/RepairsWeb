import { Repair } from "../entities";

export const requaredFieldRepair = (repair: Repair) => {
  return (
    repair.requestNumber === "" ||
    repair.deviceType.id === -1 ||
    repair.model === "" ||
    repair.serialNumber === "" ||
    repair.trouble === "" ||
    repair.client.fullUserName === "" ||
    repair.address.id === -1 ||
    repair.organization.id === -1 ||
    repair.client.userDepartment === "" ||
    repair.room === "" ||
    repair.phone === "" ||
    repair.configurationUnitId === "" ||
    repair.configurationUnitId === " "
  );
};

export const getHiddenColumn = (columnName: string, access: boolean) =>
  access ? columnName : "";

export const filterRepairs = (repairData: Repair[], searchString: string) => {
  const result = repairData.filter((rep) => {
    return (
      rep.requestNumber.toLowerCase().indexOf(searchString.toLowerCase()) !==
        -1 ||
      rep.model.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      rep.client.fullUserName
        .toLowerCase()
        .indexOf(searchString.toLowerCase()) !== -1 ||
      rep.address.value.toLowerCase().indexOf(searchString.toLowerCase()) !==
        -1 ||
      rep.trouble.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      rep.organization.value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
  });
  return result;
};

export const dateToString = (date: Date | null): string =>
  date !== null ? date.toLocaleDateString() : "";