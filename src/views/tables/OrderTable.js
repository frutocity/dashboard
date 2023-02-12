// ** MUI Imports
import React, { useState } from 'react'
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
import { BannerDataAtom, bannerModalAtom, employeeDataAtom, employeeModalAtom, exchangeDataAtom, exchangeModalAtom, roleDataAtom, roleModalAtom, storeDataAtom, storeModalAtom } from 'src/helpers/jotai/atom'
import API from 'src/helpers/services/API'
import { Box, Card, Chip, Grid, IconButton, TablePagination, TextField, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GlobalAccordian from '../cards/GlobalAccordian'
import ProductTable from './ProductTable'
import CopyToClipboard from 'react-copy-to-clipboard'

const createData = (Banner, calories, fat, carbs, protein) => {
  return { Banner, calories, fat, carbs, protein }
}

function Item(props) {

  const { sx, ...other } = props;

  return (

    <Box

      sx={{
        p: 1,
        margin: "2px 10px 10px 2px",
        ...sx,
      }}
      {...other}
    />
  );
}

// Item.propTypes = {
//   /**
//    * The system prop that allows defining system overrides as well as additional CSS styles.
//    */
//   sx: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
//     ),
//     PropTypes.func,
//     PropTypes.object,
//   ]),
// };



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
  AWAITING: { color: 'info' },
  PROCESSING: { color: 'error' },
  READY: { color: 'primary' },
  DISPATCHED: { color: 'warning' },
  DELIVERED: { color: 'success' }
}

const OrderTableRow = ({ row }) => {

  const [data, setData] = useState(null)
  console.log("🚀 ~ file: OrderTable.js:83 ~ OrderTableRow ~ data", data);

  return (
    <TableRow
      key={row?._id}
      sx={{
        '&:last-of-type td, &:last-of-type th': {
          border: 0
        }
      }}
    >
      <GlobalAccordian onChange={(e, expanded) => {
        console.log(expanded)
        if (expanded) {
          API.orderById({ params: { _id: row?._id } }, (d) => {
            setData(d?.data)
          })
        }


      }} titeComponent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
          }}
        >
          <Item sx={{ width: "30%" }} >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row?.user?.name}</Typography>
              <Typography variant='caption'>{row?.user?.email}</Typography>
            </Box>
          </Item>

          <Item sx={{ width: "20%" }} >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {
                row?.carrier ?

                  <>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row?.carrier?.name}</Typography>
                    <Typography variant='caption'>{row?.carrier?.phone}</Typography>
                  </>
                  :
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{"No Delivery boy "}</Typography>
              }
            </Box>
          </Item>
          <Item sx={{ width: "20%" }} >
            <Typography variant='caption'>{row?.createdAt}</Typography>
          </Item>

          <Item sx={{ width: "10%" }} >
            <Typography variant='caption'>{"100"}</Typography>
          </Item>

          <Item sx={{ width: "10%" }} >
            <Typography variant='caption'>{"100"}</Typography>
          </Item>
          <Item sx={{ width: "10%" }} >
            <Chip
              label={row?.status}
              color={statusObj[row.status].color}
              sx={{
                height: 20,
                fontSize: '0.65rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 }
              }}
            />
          </Item>
        </Box>
      } >
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: 1, background: "#282828" }} >
            {
              data?.items?.length &&
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Photo</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Discount</TableCell>

                      <TableCell>Store</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell align='right' >Default</TableCell>



                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.items.length
                      ? data?.items?.map(({ product: row }) => (
                        <TableRow
                          key={row?._id}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            <Avatar alt='Remy Sharp' className='banner-img' src={row?.photo?.length ? row?.photo[0] : ""} />
                          </TableCell>
                          <TableCell > {row?.name} </TableCell>
                          <TableCell >
                            <CopyToClipboard text={row?._id ?? ""} >
                              <IconButton  >

                                <ContentCopyIcon />
                              </IconButton>
                            </CopyToClipboard>
                          </TableCell>

                          <TableCell > {row?.price} </TableCell>
                          <TableCell > {row?.category?.name} </TableCell>
                          <TableCell > {row?.quantity} </TableCell>
                          <TableCell > {row?.discount} </TableCell>
                          <TableCell > {row?.store?.name} </TableCell>

                        </TableRow>
                      ))
                      : ''}
                  </TableBody>
                </Table>
              </TableContainer>
            }

          </Box>


        </Card>
      </GlobalAccordian>


    </TableRow>
  )
}

const OrderTable = ({ list }) => {

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [loading, setLoading] = React.useState(true)
  const [data, setData] = useAtom(roleDataAtom)
  const [open, setOpen] = useAtom(roleModalAtom)




  const handleDelete = (id) => () => {
    API.deleteStore({ params: { _id: id } }, (d) => {
      API.roleList({})
      setData({})

    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "98%",
                  }}
                >
                  <Item sx={{ width: "30%" }} >
                    <Typography variant='caption'>{"User"}</Typography>
                  </Item>

                  <Item sx={{ width: "20%" }} >
                    <Typography variant='caption'>{" Delivery boy "}</Typography>
                  </Item>
                  <Item sx={{ width: "20%" }} >
                    <Typography variant='caption'>{"Date"}</Typography>
                  </Item>

                  <Item sx={{ width: "10%" }} >
                    <Typography variant='caption'>{"Amount"}</Typography>
                  </Item>

                  <Item sx={{ width: "10%" }} >
                    <Typography variant='caption'>{"Order No."}</Typography>
                  </Item>
                  <Item sx={{ width: "10%" }} >
                    <Typography variant='caption'>{"Status"}</Typography>

                  </Item>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length
              ? list.map(row => {
                return <OrderTableRow row={row} key={row?._id} />
              })
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={list.length}
        rowsPerPage={10}
        page={0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default OrderTable
