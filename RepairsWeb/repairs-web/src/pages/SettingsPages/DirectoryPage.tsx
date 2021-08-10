import { Grid } from "@material-ui/core";
import React from "react";
import AddressesDirectory from "../../features/Settings/Addresses";

const DirectoryPage = () => {
  return (
    <Grid container xs item direction="column">
      <Grid container xs item spacing={1}>
        <Grid xs item>
          <AddressesDirectory />
        </Grid>
        <Grid item xs>
          Справочник типов оборудования
        </Grid>
        <Grid item xs>
          Справочник производителей оборудования
        </Grid>
        <Grid item xs>
          Справочник моделей оборудования
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(DirectoryPage);
