// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import { useEffect } from 'react'
import API from 'src/helpers/services/API'
import { Button } from '@mui/material'
import { useAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add'

import { employeeModalAtom, storeModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import { employeeListAtom, storeListAtom } from 'src/helpers/jotai/apiAtoms'
import AddStore from 'src/views/account-settings/AddStore'
import StoreTable from 'src/views/tables/StoreTable'
import EmployeeTable from 'src/views/tables/EmployeeTable'
import AddEmployee from 'src/views/account-settings/AddEmployee'

const MUITable = () => {
  const [list, setList] = useAtom(employeeListAtom)

  const [open, setOpen] = useAtom(employeeModalAtom)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    API.employeeList({}, d => {

    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.employeeList({}, d => {

    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              Employee
            </Link>
          </Typography>

          <Button onClick={handleOpen} variant='outlined' startIcon={<AddIcon />}>
            Add
          </Button>
        </div>
        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Employees' titleTypographyProps={{ variant: 'h6' }} />
          <EmployeeTable list={list} />
        </Card>
      </Grid>
      <GlobleModal atom={employeeModalAtom}>
        <AddEmployee />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
