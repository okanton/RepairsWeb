import React from "react";
import AppSelector from "../../../components/AppSelector";
import { Entity } from "../../../entities";
import { serviceTypes } from "../../../entities/constants";

interface ServiceTypesSelectorProps {
  serviceId: number;
  onChangeMail: (service: Entity) => void;
}

const ServiceTypesSelector = ({
  serviceId,
  onChangeMail,
}: ServiceTypesSelectorProps) => {
  const mailTypeChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const service = serviceTypes.find(
      (p) => p.id === (event.target.value as number)
    );
    if (service && onChangeMail) onChangeMail(service);
  };

  return (
    <AppSelector
      onChange={mailTypeChangeHandler}
      selectedValue={serviceId === -1 ? "" : serviceId}
      items={serviceTypes}
      label="Тип сервиса"
    />
  );
};

export default React.memo(ServiceTypesSelector);