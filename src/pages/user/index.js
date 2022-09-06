// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import BannerBasicTable from 'src/views/tables/BannerBasicTable'
import { useEffect, useState } from 'react'
import API from 'src/helpers/services/API'
import { Button, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add'

import { bannerModalAtom, exchangeModalAtom, userModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, exchangeListAtom, searchListAtom, usersListAtom } from 'src/helpers/jotai/apiAtoms'
import ExchangeTable from 'src/views/tables/ExchangeTable'
import AddExchange from 'src/views/account-settings/AddExchange'
import UserTable from 'src/views/tables/UserTable'
import EditUser from 'src/views/account-settings/EditUser'


const MUITable = () => {
  const [list, setList] = useAtom(usersListAtom)

  const [open, setOpen] = useAtom(userModalAtom)
  const [searchList, setSearchList] = useAtom(searchListAtom)
  const [search, setSearch] = useState("")

  const handleOpen = () => setOpen(true)

  useEffect(() => {
    API.getAllUser({}, d => {

    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.getAllUser({}, d => {

    })
  }, [open])

  const handleSearch = (e) => {

    API.searchUser({ params: { search: e.target.value } }, () => { })
    console.log(searchList.length)

  }




  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              User
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
          <Grid item xs={12} m={5} >
            <div className='table-head-flex'>
              <Typography variant='h5'>
                User
              </Typography>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Search' onChange={handleSearch} />
              </Grid>
            </div>


          </Grid>
          <UserTable list={searchList.length ? searchList : list} />
        </Card>
      </Grid>
      <GlobleModal atom={userModalAtom}>
        <EditUser />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
