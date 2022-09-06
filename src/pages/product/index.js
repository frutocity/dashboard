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

import { bannerModalAtom, exchangeModalAtom, productDataAtom, productModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, exchangeListAtom, productListAtom } from 'src/helpers/jotai/apiAtoms'
import ExchangeTable from 'src/views/tables/ExchangeTable'
import AddExchange from 'src/views/account-settings/AddExchange'
import UpdateProduct from 'src/views/account-settings/UpdateProduct'
import ProductTable from 'src/views/tables/ProductTable'
import AddProduct from 'src/views/account-settings/AddProduct'
import TestApp from 'src/views/account-settings/Test'

const MUITable = () => {
  const [list, setList] = useAtom(productListAtom)
  const [data, setData] = useAtom(productDataAtom)
  const [open, setOpen] = useAtom(productModalAtom)
  const handleOpen = () => {
    setData({})
    setOpen(true)
  }

  useEffect(() => {
    API.productList({}, d => {
      // setbannerList(d.data)
    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.productList({}, d => {
      // setbannerList(d.data)
    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              Product
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
          <CardHeader title='Products' titleTypographyProps={{ variant: 'h6' }} />
          <ProductTable list={list} />
        </Card>
      </Grid>
      <GlobleModal atom={productModalAtom}>
        <AddProduct />
        {/* <TestApp /> */}
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
