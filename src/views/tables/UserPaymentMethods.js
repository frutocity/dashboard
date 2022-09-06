// ** MUI Imports
import React, { useEffect, useState } from 'react'
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
import { userPaymentDataAtom } from 'src/helpers/jotai/apiAtoms'
import { Card, Select, FormControl, Grid, IconButton, InputLabel, MenuItem, Typography, Chip } from '@mui/material'
import CopyIcon from 'mdi-material-ui/ContentCopy'
import CopyToClipboard from 'react-copy-to-clipboard'
import { RemoveRedEye } from '@mui/icons-material'


const createData = (icon, name, key, pair) => {
  return { icon, name, key, pair: pair ?? ["name", "number"] }
}

const rows = [
  createData("/images/logos/upi.png", "UPI", "upi", ["name", "id"]),
  createData("/images/logos/phonepe.png", "PHONE PE", "phone_pe"),
  createData("/images/logos/google-pay.png", "G PAY", "google_pay"),
  createData("/images/logos/paytm.png", "PAYTM", "paytm"),


]

const statusObj = {

  "REJECTED": { color: 'error' },

  "PENDING": { color: 'warning' },
  "VERIFIED": { color: 'success' }
}

const UserPaymentMethods = ({ }) => {

  const [loading, setLoading] = React.useState(true)
  const [data, setData] = useAtom(userDataAtom)
  const [open, setOpen] = useAtom(userModalAtom)
  const [p, setP] = useAtom(userPaymentDataAtom)



  useEffect(() => {
    if (data._id) {

      API.userPaymentData({
        params: {
          user_id: data._id
        }
      })


    }
  }, [data])

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

  const handleBankStatus = (e) => {
    let body = {
      user_id: data._id,
      status: e.target.value,
    }

    API.updateUserBankStatus({ body: body }, () => {
      API.userPaymentData({
        params: {
          user_id: data._id
        }
      })
    })
  }

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <Grid item xs={12} m={5} >
            <div className='table-head-flex'>
              <Typography variant='h5'>
                Payment Methods
              </Typography>


            </div>


          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell align='right' >Action</TableCell>



                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((d) => {
                    if (p[d.key]) {

                      let col = p[d.key]


                      return (
                        <TableRow
                          key={"row._id"}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            <img src={d.icon} width={40} />
                          </TableCell>
                          <TableCell > {d.name} </TableCell>

                          <TableCell > {p.upi ? "UPLOADED" : "PENDING"} </TableCell>
                          {
                            d.pair.map(m => {
                              return (
                                <TableCell > {col[m]} <CopyToClipboard text={col[m]} ><IconButton> <CopyIcon /> </IconButton></CopyToClipboard> </TableCell>

                              )
                            })
                          }

                          <TableCell align='right' >
                            {/* <Switch checked={"row.default"} onChange={handleToggle("row._id")} color='primary' /> */}
                            <Button variant='outlined' startIcon={<RemoveRedEye />} onClick={() => {
                              // setData(row)
                              // setOpen(true)
                            }} >
                              View
                            </Button>{' '}

                          </TableCell>
                        </TableRow>
                      )
                    }
                  })
                }



              </TableBody>
            </Table>
          </TableContainer>

        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Grid item xs={12} m={5} >
            <div className='table-head-flex'>
              <Typography variant='h5'>
                Bank Account
              </Typography>


            </div>


          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Account No.</TableCell>
                  <TableCell>IFSC</TableCell>
                  <TableCell>Acc. Holder Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align='right' >Action</TableCell>



                </TableRow>
              </TableHead>
              <TableBody>
                {
                  p.bank ?



                    <TableRow
                      key={"row._id"}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                    >

                      <TableCell > {p.bank.name} </TableCell>
                      <TableCell > {p.bank.account_number} </TableCell>
                      <TableCell > {p.bank.ifsc} </TableCell>
                      <TableCell > {p.bank.account_holder_name} </TableCell>
                      <TableCell >
                        <Chip
                          label={p.bank_status}
                          color={statusObj[p.bank_status].color}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      </TableCell>





                      <TableCell align='right' >

                        <FormControl fullWidth>
                          <InputLabel>{"Status"}</InputLabel>
                          <Select label='Status' onChange={handleBankStatus} >

                            {
                              ["PENDING", "REJECTED", "VERIFIED"].filter(f => f != p.bank_status).map(c => {
                                return (<MenuItem value={c ?? ""}>{c ?? ""}</MenuItem>)
                              })
                            }

                          </Select>

                        </FormControl>


                      </TableCell>
                    </TableRow>
                    : ""
                }



              </TableBody>
            </Table>
          </TableContainer>

        </Card>
      </Grid>
    </>
  )
}

export default UserPaymentMethods
