// ** MUI Imports
import React from 'react'
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
import { BannerDataAtom, bannerModalAtom, categoryDataAtom, categoryModalAtom, exchangeDataAtom, exchangeModalAtom } from 'src/helpers/jotai/atom'
import API from 'src/helpers/services/API'

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

const CategoryTable = ({ list }) => {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = useAtom(categoryDataAtom)
  const [open, setOpen] = useAtom(categoryModalAtom)



  const handleToggle = (id) => () => {
    API.updateCategoryStatus({ params: { _id: id } }, (d) => {
      API.categoryList({})
      setData({})
    })
  }
  const handleDelete = (id) => () => {
    API.deleteCategory({ params: { _id: id } }, (d) => {
      API.categoryList({})
      setData({})

    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Active</TableCell>
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
                <TableCell component='th' scope='row'>
                  <Avatar alt='Remy Sharp' className='banner-img' src={row.photo} />
                </TableCell>
                <TableCell > {row.name} </TableCell>

                <TableCell > {row.description} </TableCell>
                <TableCell>
                  <Switch checked={row.active} onChange={handleToggle(row._id)} color='primary' />
                </TableCell>
                <TableCell align='right' >

                  <Button variant='outlined' startIcon={<EditOutlinedIcon />} onClick={() => {
                    setData(row)
                    setOpen(true)
                  }} >
                    Edit
                  </Button>{' '}
                  <Button variant='outlined' onClick={handleDelete(row._id)} startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
            : ''}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable
