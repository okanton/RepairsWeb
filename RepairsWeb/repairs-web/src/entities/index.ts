export interface FilterParameters {
  dateFrom: Date;
  dateTo: Date;
  approvalStatusId: number;
  organizationId: number;
  addressId: number;
  timeConstraint: TimeConstraint;
}

export interface User {
  userName: string;
  fullUserName: string;
  userDepartment: string;
}

export interface ApprovalStatusParameter {
  id: number;
  approvalStatusId: number;
  money: number;
  executeDate: Date | null;
  comment: string | null;
}

interface CommonInformation {
  id: number;
  createDate: Date | null;
  address: Entity;
  money: number;
  approvalStatus: Entity;
  itUser: User | null;
  executeDate: Date | null;
  comment: string;
}

export interface Refilling extends CommonInformation {
  count: number;
}

export interface Repair extends CommonInformation {
  requestNumber: string;
  trouble: string;
  deviceType: Entity;
  model: string;
  serialNumber: string;
  organization: Entity;
  room: string;
  phone: string;
  information: string;
  client: User;
  attachment: string;
  configurationUnitId: string;
}

export interface Mails {
  id: number;
  serviceTypeId: number;
  mail: string;
  name: string;
  isActive: boolean;
}

export interface Entity {
  id: number;
  value: string;
}

export interface TimeConstraint {
  minDate: Date | null;
  taskType: number;
}

export interface Result {
  resultStatus?: "error" | "info" | "warning" | "success";
  message: string;
}

export interface UserAccessInformation {
  approvalStatusesByRoles: Array<Entity>;
  roles: Array<string>;
  isAuth: boolean;
  userName: string;
  userFullName: string;
}

export interface Limits {
  id: number;
  dateFrom: Date | null;
  dateTo: Date | null;
  serviceTypeId: number;
  limit: number;
}
