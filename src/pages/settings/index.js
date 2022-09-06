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

import { bannerModalAtom, exchangeModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, bestSellingListAtom, exchangeListAtom, exclusiveOfferListAtom, mostPopularListAtom } from 'src/helpers/jotai/apiAtoms'
import ExchangeTable from 'src/views/tables/ExchangeTable'
import AddExchange from 'src/views/account-settings/AddExchange'
import ExclusiveOffersTable from 'src/views/tables/ExclusiveOffersTable'
import { Box } from '@mui/system'
import GlobalAccordian from 'src/views/cards/GlobalAccordian'

const MUITable = () => {
  const [list, setList] = useAtom(exclusiveOfferListAtom)
  const [list1, setList1] = useAtom(bestSellingListAtom)
  const [list2, setList2] = useAtom(mostPopularListAtom)
  const [id, setId] = useState("")
  const [id1, setId1] = useState("")
  const [id2, setId2] = useState("")




  useEffect(() => {
    API.exclusiveOfferList({})
    API.bestSellingList({})
    API.mostPopularList({})
  }, [])




  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              Settings
            </Link>
          </Typography>


        </div>
        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <GlobalAccordian title={"Exclusive Offers"} >
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1 }} >
              <Typography variant='h6'>

                Exclusive Offers

              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1 }} >
                <TextField fullWidth label='Product Id' value={id} placeholder='' onChange={(e) => {
                  setId(e.target.value)
                }} />

                <Box sx={{ width: 50 }} />
                <Button variant='contained' onClick={() => {
                  if (id) {
                    API.addExclusiveOfferList({ params: { _id: id } }, () => {
                      setId("")
                    })
                  }

                }} >
                  Add
                </Button>

              </Box>

            </Box>


            <ExclusiveOffersTable list={list} type='exclusive-offer' />
          </Card>
        </GlobalAccordian>

      </Grid>

      <Grid item xs={12}>
        <GlobalAccordian title={"Best Selling"} >
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1 }} >
              <Typography variant='h6'>

                Best Selling

              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1 }} >
                <TextField fullWidth label='Product Id' value={id1} placeholder='' onChange={(e) => {
                  setId1(e.target.value)
                }} />

                <Box sx={{ width: 50 }} />
                <Button variant='contained' onClick={() => {
                  if (id1) {
                    API.addbestSellingList({ params: { _id: id1 } }, () => {
                      setId1("")
                    })
                  }

                }} >
                  Add
                </Button>

              </Box>

            </Box>
            <ExclusiveOffersTable list={list1} type='best-selling' />
          </Card>
        </GlobalAccordian>

      </Grid>

      <Grid item xs={12}>
        <GlobalAccordian title={"Most Popular"} >
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1 }} >
              <Typography variant='h6'>

                Most popular

              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1 }} >
                <TextField fullWidth label='Product Id' value={id2} placeholder='' onChange={(e) => {
                  setId2(e.target.value)
                }} />

                <Box sx={{ width: 50 }} />
                <Button variant='contained' onClick={() => {
                  if (id2) {
                    API.addmostPopularList({ params: { _id: id2 } }, () => {
                      setId2("")
                    })
                  }

                }} >
                  Add
                </Button>

              </Box>

            </Box>
            <ExclusiveOffersTable list={list2} type='most-popular' />
          </Card>
        </GlobalAccordian>

      </Grid>



    </Grid>
  )
}

export default MUITable
