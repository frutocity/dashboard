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

import { employeeModalAtom, roleModalAtom, storeModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import { employeeListAtom, roleListAtom, storeListAtom } from 'src/helpers/jotai/apiAtoms'
import AddStore from 'src/views/account-settings/AddStore'
import StoreTable from 'src/views/tables/StoreTable'
import EmployeeTable from 'src/views/tables/EmployeeTable'
import AddEmployee from 'src/views/account-settings/AddEmployee'
import RoleTable from 'src/views/tables/RoleTable'
import AddRole from 'src/views/account-settings/AddRole'

const MUITable = () => {
  const [list, setList] = useAtom(roleListAtom)

  const [open, setOpen] = useAtom(roleModalAtom)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    API.roleList({}, d => {

    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.roleList({}, d => {

    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              Role
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
          <CardHeader title='Roles' titleTypographyProps={{ variant: 'h6' }} />
          <RoleTable list={list} />
        </Card>
      </Grid>
      <GlobleModal atom={roleModalAtom}>
        <AddRole />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
