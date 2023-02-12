// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function GlobalAccordian({ title, children, titeComponent, onChange }) {
    return (
        <Accordion onChange={onChange}  >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {
                    titeComponent ?
                        titeComponent :
                        <Typography>{title ?? ""}</Typography>
                }
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default GlobalAccordian