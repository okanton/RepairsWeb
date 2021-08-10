import React from "react";
import * as icons from "@material-ui/icons";
import { Routes } from "../../constants/routes";

interface DefaultSectionProps {
  title: string;
  Icon: React.ElementType;
  roles: Array<string>;
}

export interface LinkSection extends DefaultSectionProps {
  subsections: Section[];
  route?: never;
}

export interface ExpandSection extends DefaultSectionProps {
  route: Routes;
  subsections?: never;
}

export type Section = LinkSection | ExpandSection;

const sections: Section[] = [
  {
    title: "Заявки на ремонты",
    Icon: icons.BuildOutlined,
    route: Routes.REPAIRS,
    roles: ["User"],
  },
  {
    title: "Заявки на заправку",
    Icon: icons.LocalGasStationOutlined,
    route: Routes.REFILLINGS,
    roles: ["User"],
  },
  {
    title: "Отчеты",
    Icon: icons.EqualizerOutlined,
    roles: ["Administrator"],
    subsections: [
      {
        title: "Заявки с разбивкой по компаниям за определенный период",
        Icon: icons.ScheduleOutlined,
        route: Routes.REPORT_REQUEST_BY_COMPANY,
        roles: ["Administrator"],
      },
      {
        title: "Отчет2",
        Icon: icons.EventNoteOutlined,
        route: Routes.REPORTS,
        roles: ["RequestManager", "Administrator"],
      },
    ],
  },
  {
    title: "Настройки",
    Icon: icons.SettingsOutlined,
    roles: ["Administrator"],
    subsections: [
      {
        title: "Настройки рассылки",
        Icon: icons.MailOutline,
        roles: ["Administrator"],
        route: Routes.MAIL_SETTINGS,
      },
      {
        title: "Справочники",
        Icon: icons.FolderOutlined,
        roles: ["Administrator"],
        route: Routes.DIRECTORY,
      },
      {
        title: "Управление лимитами",
        Icon: icons.AttachMoneyOutlined,
        roles: ["Administrator"],
        route: Routes.LIMITS,
      },
    ],
  },
];

export default sections;
