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

import { bannerModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom } from 'src/helpers/jotai/apiAtoms'

const MUITable = () => {
  const [bannerList, setbannerList] = useAtom(bannerListAtom)

  const [open, setOpen] = useAtom(bannerModalAtom)
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    API.bannerList({}, d => {
      // setbannerList(d.data)
    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.bannerList({}, d => {
      // setbannerList(d.data)
    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link>
              Banners
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
          <CardHeader title='Banner' titleTypographyProps={{ variant: 'h6' }} />
          <BannerBasicTable bannerList={bannerList} />
        </Card>
      </Grid>
      <GlobleModal atom={bannerModalAtom}>
        <AddBanner />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
