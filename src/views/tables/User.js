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
import API from 'src/helpers/services/API'
import Typography from '@mui/material/Typography'

const createData = (Banner, calories, fat, carbs, protein) => {
  return { Banner, calories, fat, carbs, protein }
}

const rows = [
  createData('UserName', 'MATCH', 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const User = () => {
  const [loading, setLoading] = React.useState(true)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    API.getAllUser({}, d => {
      console.log(d.data)
      setUserList(d.data)
    })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Phone Number</TableCell>
            <TableCell align='right'>Level</TableCell>
            <TableCell align='right'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row, i) => (
            <TableRow
              key={row.Banner}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {i + 1}
              </TableCell>
              <TableCell component='th' scope='row'>
                <Typography className='td-title'>{row.username}</Typography>
              </TableCell>
              <TableCell align='right'> {row.email} </TableCell>
              <TableCell align='right'> Phone Number </TableCell>

              <TableCell align='right'> {row.level} </TableCell>
              <TableCell align='right'>
                <Switch checked={loading} onChange={() => setLoading(!loading)} name='loading' color='primary' />
                <Button variant='outlined' startIcon={<EditOutlinedIcon />}>
                  Edit
                </Button>{' '}
                <Button variant='outlined' startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default User
