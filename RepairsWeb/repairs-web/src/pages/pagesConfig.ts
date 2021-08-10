import { RouteProps } from "react-router-dom";
import { Routes } from "../constants/routes";
import DirectoryPage from "../pages/SettingsPages/DirectoryPage";
import { HomePage } from "./HomePage";
import LimitsPage from "../pages/SettingsPages/LimitsPage";
import MailSettingsPage from "../pages/SettingsPages/MailSettingsPage";
import RefillingsPage from "./RefillingsPage";
import RepairsPage from "./RepairsPage";
import ReportsPage from "../pages/ReportsPages/ReportsPage";
import RequestByCompanyReportPage from "../pages/ReportsPages/RequestByCompanyReportPage";

export interface Pages extends Omit<RouteProps, "render" | "children"> {
  path: Routes;
  roles: Array<string>;
}

const pages: Pages[] = [
  {
    exact: true,
    path: Routes.HOME_ROUTE,
    component: HomePage,
    roles: ["User"],
  },
  {
    exact: true,
    path: Routes.REFILLINGS,
    component: RefillingsPage,
    roles: ["User"],
  },
  {
    exact: true,
    path: Routes.REPAIRS,
    component: RepairsPage,
    roles: ["User"],
  },
  {
    exact: true,
    path: Routes.REPORTS,
    component: ReportsPage,
    roles: ["User"],
  },
  {
    exact: true,
    path: Routes.MAIL_SETTINGS,
    component: MailSettingsPage,
    roles: ["Administrator"],
  },
  {
    exact: true,
    path: Routes.DIRECTORY,
    component: DirectoryPage,
    roles: ["Administrator"],
  },
  {
    exact: true,
    path: Routes.LIMITS,
    component: LimitsPage,
    roles: ["Administrator"],
  },
  {
    exact: true,
    path: Routes.REPORT_REQUEST_BY_COMPANY,
    component: RequestByCompanyReportPage,
    roles: ["Administrator"],
  },
];

export default pages;
