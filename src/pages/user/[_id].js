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

import { bannerModalAtom, exchangeModalAtom, userDataAtom, userModalAtom } from 'src/helpers/jotai/atom'
import GlobleModal from 'src/views/tables/GlobleModal'
import TabAccount from 'src/views/account-settings/TabAccount'
import AddBanner from 'src/views/account-settings/AddBanner'
import Switch from '@mui/material/Switch'
import { bannerListAtom, exchangeListAtom, searchListAtom, userDataByIdAtom, usersListAtom, userTransactionsAtom } from 'src/helpers/jotai/apiAtoms'
import ExchangeTable from 'src/views/tables/ExchangeTable'
import AddExchange from 'src/views/account-settings/AddExchange'
import UserTable from 'src/views/tables/UserTable'
import EditUser from 'src/views/account-settings/EditUser'
import UserPaymentsTable from 'src/views/tables/UserPaymentsTable'
import { useRouter } from 'next/router'
import EditableUserData from 'src/views/account-settings/EditableUserData'
import EditUser2 from 'src/views/account-settings/EditUser2'

import UserPaymentMethods from 'src/views/tables/UserPaymentMethods'
import UserTransactionsTable from 'src/views/tables/UserTransactionsTable'


const MUITable = () => {
  const router = useRouter()
  const [list, setList] = useAtom(usersListAtom)

  const [open, setOpen] = useAtom(userModalAtom)
  const [searchList, setSearchList] = useAtom(searchListAtom)
  const [search, setSearch] = useState("")
  const [data, setData] = useAtom(userDataAtom)
  const [t, setT] = useAtom(userTransactionsAtom)

  const handleOpen = () => setOpen(true)

  useEffect(() => {
    if (!router.isReady) return;


    API.userDataById({
      params: {
        user_id: router.query._id
      }
    }, d => {
      // setData(d.data)

    })

    API.userTransactions({
      params: {
        user_id: router.query._id
      }
    })

    API.userIds({
      params: {
        user_id: router.query._id
      }
    })

  }, [router.isReady])

  useEffect(() => {
    if (open == true) {
      return;
    }

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
            <Link href='' target='_blank'>
              UserName
            </Link>
          </Typography>


        </div>
        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>

      {
        data &&
        <EditUser2 data={data ?? {}} />
      }

      <UserPaymentMethods />


      <Grid item xs={12}>
        <Card>
          <Grid item xs={12} m={5} >
            <div className='table-head-flex'>
              <Typography variant='h5'>
                Transactions
              </Typography>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Search' onChange={handleSearch} />
              </Grid>
            </div>


          </Grid>

          <UserTransactionsTable list={t.length ? t : []} />
          <UserPaymentsTable list={searchList.length ? searchList : list} />
        </Card>
      </Grid>

    </Grid>
  )
}

export default MUITable
