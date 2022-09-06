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

import { bannerModalAtom, exchangeModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, exchangeListAtom } from 'src/helpers/jotai/apiAtoms'
import ExchangeTable from 'src/views/tables/ExchangeTable'
import AddExchange from 'src/views/account-settings/AddExchange'

const MUITable = () => {
  const [list, setList] = useAtom(exchangeListAtom)

  const [open, setOpen] = useAtom(exchangeModalAtom)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    API.exchangeList({}, d => {
      // setbannerList(d.data)
    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.exchangeList({}, d => {
      // setbannerList(d.data)
    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              Exchange
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
          <CardHeader title='Exchanges' titleTypographyProps={{ variant: 'h6' }} />
          <ExchangeTable list={list} />
        </Card>
      </Grid>
      <GlobleModal atom={exchangeModalAtom}>
        <AddExchange />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
