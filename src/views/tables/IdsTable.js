// ** MUI Imports
import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import DeleteIcon from 'mdi-material-ui/Delete'
import Switch from '@mui/material/Switch'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useAtom } from 'jotai'
import { BannerDataAtom, bannerModalAtom, exchangeDataAtom, exchangeModalAtom, userDataAtom, userModalAtom } from 'src/helpers/jotai/atom'
import API from 'src/helpers/services/API'
import { Chip } from 'mdi-material-ui'
import { Card, Grid, Typography } from '@mui/material'
import { allInactiveIdsAtom } from 'src/helpers/jotai/apiAtoms'

const createData = (Banner, calories, fat, carbs, protein) => {
  return { Banner, calories, fat, carbs, protein }
}

const rows = [
  createData(
    'https://media.istockphoto.com/vectors/cricket-stadium-vector-background-vector-id936417012?k=20&m=936417012&s=612x612&w=0&h=kOjwskYOoaIs1AfOH9qje373sY9ZgI3n8pDqhOR6SiY=',
    'MATCH',
    6.0,
    24,
    4.0
  ),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const statusObj = {

  "REJECTED": { color: 'error' },

  "PENDING": { color: 'warning' },
  "VERIFIED": { color: 'success' }
}

const IdsTable = ({ active }) => {

  const [loading, setLoading] = React.useState(true)
  const [data, setData] = useAtom(userDataAtom)
  const [open, setOpen] = useAtom(userModalAtom)
  const [list, setList] = useAtom(allInactiveIdsAtom)

  useEffect(() => {
    API.allIdsWithStatus({ params: { active: active } })

  }, [])

  const handleToggle = (id) => () => {
    API.updateExchangeStatus({ params: { _id: id } }, (d) => {
      API.exchangeList({})
      setData({})
    })
  }
  const handleDelete = (id) => () => {
    API.deleteExchange({ params: { _id: id } }, (d) => {
      API.exchangeList({})
      setData({})

    })
  }

  return (
    <Grid item xs={12}>
      <Card>
        <Grid item xs={12} m={5} >
          <div className='table-head-flex'>
            <Typography variant='h5'>
              {!active ? "In-Active IDs" : "Active IDs"} ({list.length})
            </Typography>


          </div>


        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Exchange</TableCell>
                <TableCell>username</TableCell>
                <TableCell>number</TableCell>
                <TableCell align='right' >Action</TableCell>



              </TableRow>
            </TableHead>
            <TableBody>
              {list.length
                ? list.map(row => (
                  <TableRow
                    key={row._id}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >

                    <TableCell > {row.user_id.email} </TableCell>

                    <TableCell > {row.exchange_id.name} </TableCell>

                    <TableCell > {row.username} </TableCell>
                    <TableCell > {row.number} </TableCell>

                    <TableCell align='right' >
                      <Grid item xs={3} sm={3}>
                        <div className='switch-toggle'>

                          <lable className='lab-action'>Activate</lable>{' '}
                          <Switch checked={row.active} name='loading' color='primary' onChange={(e) => {
                            API.updateIdStatus({
                              params: {
                                _id: row._id
                              }
                            }, (d) => {
                              API.allIdsWithStatus({ params: { active: row.active } })
                            })

                          }} />
                        </div>
                      </Grid>
                    </TableCell>





                  </TableRow>
                ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}

export default IdsTable
