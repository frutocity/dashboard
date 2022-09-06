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
import { Button } from '@mui/material'
import { useAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add'

import { bannerModalAtom, exchangeModalAtom, storeModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, exchangeListAtom, storeListAtom } from 'src/helpers/jotai/apiAtoms'
import ExchangeTable from 'src/views/tables/ExchangeTable'
import AddExchange from 'src/views/account-settings/AddExchange'
import AddStore from 'src/views/account-settings/AddStore'
import StoreTable from 'src/views/tables/StoreTable'

const MUITable = () => {
  const [list, setList] = useAtom(storeListAtom)

  const [open, setOpen] = useAtom(storeModalAtom)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    API.storeList({}, d => {

    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.storeList({}, d => {

    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              Store
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
          <CardHeader title='Stores' titleTypographyProps={{ variant: 'h6' }} />
          <StoreTable list={list} />
        </Card>
      </Grid>
      <GlobleModal atom={storeModalAtom}>
        <AddStore />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
