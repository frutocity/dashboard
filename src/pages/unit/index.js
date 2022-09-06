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

import { bannerModalAtom, UnitDataAtom, unitModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, unitListAtom } from 'src/helpers/jotai/apiAtoms'
import UnitTable from 'src/views/tables/UnitTable'
import AddUnit from 'src/views/account-settings/AddUnit'

const MUITable = () => {
  const [list, setList] = useAtom(unitListAtom)

  const [open, setOpen] = useAtom(unitModalAtom)
  const [banner, setbanner] = useAtom(UnitDataAtom)

  const handleOpen = () => {
    setOpen(true)
    setbanner({})
  }

  useEffect(() => {
    API.unitList({}, d => {

    })
  }, [])

  useEffect(() => {
    if (open == true) {
      return;
    }
    API.unitList({}, d => {

    })
  }, [open])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='table-head-flex'>
          <Typography variant='h5'>
            <Link >
              Units
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
          <UnitTable list={list} />
        </Card>
      </Grid>
      <GlobleModal atom={unitModalAtom}>
        <AddUnit />
      </GlobleModal>
    </Grid>
  )
}

export default MUITable
