import React from "react";
import { lightTheme } from "itplus-react-ui/lib/utils";
import { CssBaseline, ThemeProvider, Typography } from "@material-ui/core";
import { Dashboard } from "itplus-react-ui";
import { useHistory } from "react-router";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import Pages from "../pages";
import Menu from "../components/Menu";
import AppResultStatusBar from "../components/AppResultStatusBar";
import { useDispatch, useSelector } from "react-redux";
import {
  isShowResultStatusBarSelector,
  resultStatusBarSelector,
} from "../selectors/result-statusBar-selectors";
import { closeResultStatusBar } from "../slices/result-statusBar-slice";
import {
  userAccessInformaionSelector,
  userAccessLoadingSelector,
} from "../selectors/common-selectors";
import Loading from "../components/Loading";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogoClick = () => history.push("/");
  const resultDialog = useSelector(resultStatusBarSelector);
  const showDialogResult = useSelector(isShowResultStatusBarSelector);
  const userAccessLoading = useSelector(userAccessLoadingSelector);
  const userAccesInf = useSelector(userAccessInformaionSelector);
  const handleCloseDialogResult = () => {
    dispatch(closeResultStatusBar());
  };
  const userRoles =
    userAccesInf.roles !== null ? userAccesInf.roles.includes("User") : false;
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {userAccessLoading ? (
        <Loading />
      ) : (
        <Dashboard>
          <Dashboard.AppBar
            title="Ремонты Т Плюс"
            onMenuLogoClick={handleLogoClick}
            alwaysShowMenuButton={userRoles}
          >
            <Typography>Добрый день, {userAccesInf.userFullName}</Typography>
          </Dashboard.AppBar>
          <Dashboard.Drawer drawerWidth={260} defaultClose>
            <Menu />
          </Dashboard.Drawer>
          <Dashboard.MainContainer>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <Pages />
            </MuiPickersUtilsProvider>
            <AppResultStatusBar
              result={resultDialog}
              isOpen={showDialogResult}
              handleClose={handleCloseDialogResult}
            />
          </Dashboard.MainContainer>
        </Dashboard>
      )}
    </ThemeProvider>
  );
};

export default React.memo(App);
