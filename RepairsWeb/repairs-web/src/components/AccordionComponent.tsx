import React, { PropsWithChildren } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionProps,
    AccordionSummary,
} from '@material-ui/core';

const AccordionComponent = ({
    defaultExpanded = false,
    title,
    children,
    ...restProps
}: PropsWithChildren<AccordionProps>) => (
        <Accordion defaultExpanded={defaultExpanded} {...restProps}>
            <AccordionSummary expandIcon={<ExpandMoreIcon style={{ marginRight: 20 }} />}>{title}</AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );

export default React.memo(AccordionComponent);