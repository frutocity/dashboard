// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function GlobalAccordian({ title, children }) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title ?? ""}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default GlobalAccordian