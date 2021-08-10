import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import sections from "./sectionsConfig";
import MenuSection from "./MenuSection";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: "auto",
            backgroundColor: theme.palette.background.paper,
        },
    })
);

const Menu = () => {
    const classes = useStyles();
    return (
        <List component="nav" className={classes.root}>
            {sections.map((section) => (
                <MenuSection
                    key={section.title}
                    section={section}
                    depth={0}
                />
            ))}
        </List>
    );
};

export default React.memo(Menu);