import React, { useState, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useDashboardContext } from "itplus-react-ui";
import { Section } from "./sectionsConfig";
import useUserAuth from "../../dataLayer/hooks/useUserAuth";

export interface MenuSectionProps {
  section: Section;
  depth: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nestedItem: {
      paddingLeft: ({ depth }: MenuSectionProps) =>
        depth > 0 ? depth * theme.spacing(4) : theme.spacing(2),
    },
  })
);

const LinkSection = (props: MenuSectionProps) => {
  const {
    section: { title, route, Icon, roles },
  } = props;
  const { toggleDrawerOpen } = useDashboardContext();
  const classes = useStyles(props);
  const { isAuth, hasAccess } = useUserAuth(roles);
  const handleCloseDrawer = () => {
    toggleDrawerOpen(false);
  };

  return route && isAuth && hasAccess ? (
    <ListItem
      className={classes.nestedItem}
      onClick={handleCloseDrawer}
      component={Link}
      to={route}
      button
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  ) : null;
};

const ExpandSection = (props: PropsWithChildren<MenuSectionProps>) => {
  const {
    section: { title, Icon, roles },
    children,
  } = props;
  const [isExpanded, toggleExpand] = useState(false);
  const classes = useStyles(props);
  const handleCollapsePlanning = () => {
    toggleExpand(!isExpanded);
  };
  const { isAuth, hasAccess } = useUserAuth(roles);
  return isAuth && hasAccess ? (
    <>
      <ListItem
        className={classes.nestedItem}
        onClick={handleCollapsePlanning}
        button
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  ) : null;
};

const MenuSection = ({ section, depth }: MenuSectionProps) => {
  const { isAuth, hasAccess } = useUserAuth(section.roles);
  const renderSection = (depth: number) => (section: Section) => {
    const { subsections } = section;
    return isAuth && hasAccess ? (
      <React.Fragment key={section.title}>
        {subsections ? (
          <ExpandSection section={section} depth={depth}>
            {subsections.map(renderSection(depth + 1))}
          </ExpandSection>
        ) : (
          <LinkSection section={section} depth={depth} />
        )}
      </React.Fragment>
    ) : null;
  };

  return renderSection(depth)(section);
};

export default React.memo(MenuSection);
