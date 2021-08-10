import {
  Column,
  IntegratedSelection,
  SelectionState,
} from "@devexpress/dx-react-grid";
import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entity } from "../../../entities";
import CRUIDPanel from "../../CommonComponents/CRUIDPanel";
import {
  Grid as DxGrid,
  Table,
  TableHeaderRow,
  TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
import RowComponent from "../../../components/DxGridPlugins/RowComponent";
import { commonDataActions } from "../../../dataLayer/common-data-slice";
import EditAddressDialog from "./EditAddressDialog";
import AppSimpleDialog from "../../../components/Dialog/AppSimpleDialog";
import { without } from "lodash";
import ConfirmationDialog from "../../../components/Dialog/ConfirmationDialog";
import { directoriesDataActions } from "../../../dataLayer/directories-data-slice";
import {
  addressesDirectorySelector,
  selectedAddressIdSelector,
  selectedAddressSelector,
} from "../../../selectors/directories-selector";
import { directoryActions } from "../../../slices/directory-slice";

const columns: Column[] = [
  {
    name: "value",
    title: "Площадка",
  },
];

const getId = (row: Entity) => row.id;

const AddressesDirectory = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [conf, setConf] = useState(false);
  const selectedId = useSelector(selectedAddressIdSelector);
  const selectedAddress = useSelector(selectedAddressSelector);
  useEffect(() => {
    dispatch(commonDataActions.addressesLoading());
  }, [dispatch]);
  const addresses = useSelector(addressesDirectorySelector);
  const addAddressHandler = () => {
    setTitle("Добавление адреса");
    setShowEdit(true);
  };
  const editAddressHandler = () => {
    setTitle("Изменение адреса");
    const selAdr = addresses.find((p) => p.id === (selectedId[0] as number));
    if (selAdr) {
      dispatch(directoryActions.setAddress(selAdr));
      setShowEdit(true);
    }
  };
  const deleteAddressHandler = () => {
    setConf(true);
  };
  const handleSelect = (addressId: Array<string | number>) => {
    const newVal = without(addressId, ...selectedId);
    dispatch(directoryActions.setAddressId(newVal));
  };
  const handleCloseEditAddressDialog = () => {
    setShowEdit(false);
  };
  const onCanselConfirmDialog = () => {
    setConf(false);
  };
  const onConfirmDialog = () => {
    dispatch(directoriesDataActions.deleteAddress(selectedId[0] as number));
    setConf(false);
  };
  const onChangeAddressHandler = (address: Entity) => {
    dispatch(directoryActions.setAddress(address));
  };
  const onSaveAddressHandler = () => {
    dispatch(directoriesDataActions.saveAddress(selectedAddress));
    setShowEdit(false);
  };
  if (addresses === null) return null;
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Paper>
          <CRUIDPanel
            clickAdd={addAddressHandler}
            clickDelete={deleteAddressHandler}
            clickEdit={editAddressHandler}
            disableEdit={selectedId.length === 0}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <Typography
            align="center"
            variant="h6"
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            Справочник адресов/площадок
          </Typography>
          <DxGrid columns={columns} rows={addresses} getRowId={getId}>
            <SelectionState
              onSelectionChange={handleSelect}
              selection={selectedId}
            />
            <IntegratedSelection />
            <Table />
            <TableHeaderRow />
            <TableSelection
              rowComponent={RowComponent}
              showSelectionColumn={false}
              selectByRowClick={true}
              highlightRow
            />
          </DxGrid>
        </Paper>
      </Grid>
      <AppSimpleDialog
        open={showEdit}
        onEscapeKeyDown={handleCloseEditAddressDialog}
        maxWidth="xs"
        fullWidth
      >
        <EditAddressDialog
          title={title}
          onClose={handleCloseEditAddressDialog}
          onChange={onChangeAddressHandler}
          address={selectedAddress}
          onSave={onSaveAddressHandler}
        />
      </AppSimpleDialog>
      <ConfirmationDialog
        open={conf}
        dialogMessage="Вы уверены, что хотите удалить этот адрес?"
        onCancel={onCanselConfirmDialog}
        onConfirm={onConfirmDialog}
      />
    </Grid>
  );
};

export default React.memo(AddressesDirectory);
