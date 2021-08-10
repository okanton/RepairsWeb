import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSelector from "../../../components/AppSelector";
import { commonDataActions } from "../../../dataLayer/common-data-slice";
import { Entity } from "../../../entities";
import { allAddressesSelector } from "../../../selectors/common-selectors";

interface AddressesSelectorProps {
  addressId?: number;
  onChangeAddress?: (address: Entity) => void;
  fullWidth?: boolean;
  readonly: boolean;
}

const AddressesSelector = ({
  addressId = -1,
  onChangeAddress,
  fullWidth = true,
  readonly,
}: AddressesSelectorProps) => {
  const dispatch = useDispatch();
  const addresses = useSelector(allAddressesSelector);
  const selectedAddressId = addressId ?? "";

  useEffect(() => {
    dispatch(commonDataActions.addressesLoading());
  }, [dispatch]);

  const addressChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedAddress = addresses.find(
      (p) => p.id === (event.target.value as number)
    );
    if (onChangeAddress && selectedAddress) {
      onChangeAddress(selectedAddress);
    }
  };
  if (addresses.length === 0) return null;
  return (
    <AppSelector
      style={fullWidth ? undefined : { width: 270 }}
      fullWidth={fullWidth}
      onChange={addressChangeHandler}
      selectedValue={selectedAddressId === -1 ? "" : selectedAddressId}
      items={addresses}
      label="Площадка"
      isReadOnly={readonly}
    />
  );
};

export default React.memo(AddressesSelector);
