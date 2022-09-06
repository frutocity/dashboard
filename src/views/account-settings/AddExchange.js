// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import API, { uploadProduct, uploadProductImg } from 'src/helpers/services/API'
import { DeleteCircle } from 'mdi-material-ui'
import { useAtom } from 'jotai'
import { BannerDataAtom, bannerModalAtom, detailsAtom, detailsCountAtom, exchangeDataAtom, exchangeModalAtom } from 'src/helpers/jotai/atom'
import toast from 'react-hot-toast'
import { Switch } from '@mui/material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const AddExchange = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [unitList, setUnitList] = useState("")
  const [categoryList, setCategoryList] = useState("")
  const [storeList, setStoreList] = useState("")
  const [details, setDetails] = useAtom(detailsAtom)
  const [detailCount, setDetailCount] = useAtom(detailsCountAtom)
  const [imgList, setImageList] = useState([])
  const [image, setImage] = useState("")
  const [changed, setChanged] = useState(false)
  const [data, setData] = useAtom(exchangeDataAtom)
  const [open, setOpen] = useAtom(exchangeModalAtom)


  const [values, setValues] = useState({
    photo: data?.photo,
    name: data?.name,
    domain: data?.domain,
  })

  useEffect(() => {
    setImgSrc(imgSrc)
    setUnitList(unitList)
    setCategoryList(categoryList)
    setImageList(imgList)
    setImage(image)

    setValues(values)
  }, [changed])

  useEffect(() => {
    console.log(data)
    if (data._id) {
      setValues({ ...values, ["_id"]: data._id })
    }


  }, [data])

  const onChange = file => {
    if (imgList.length == 3) {
      return;
    }
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      const formData = new FormData()
      formData.append('file', files[0])
      setImage(formData)

    }
  }

  const uploadImage = () => {
    API.uploadExchange(image, (d) => {
      setValues({ ...values, ["photo"]: d.data })
      setChanged(!changed)

    })
  }

  const upload = () => {
    API.addExchange({ body: values }, (d) => {
      toast.success(d.message)
      setOpen(false)
    })
  }

  const update = () => {
    API.updateExchange({ body: values }, (d) => {
      toast.success(d.message)
      setOpen(false)

    })
  }

  let intList = ["price", "quantity", "discount", "unit_value"]

  const handleChange = (key, val) => event => {
    setValues({ ...values, [key]: val ? val : event.target.value })
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3, display: "flex", alignItems: 'center', justifyContent: "space-between", flexWrap: "wrap" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled variant='contained' onClick={uploadImage}>
                  Add
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>

          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' value={values.name} placeholder='' onChange={handleChange("name")} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Domain' value={values.domain} placeholder='' onChange={handleChange("domain")} />
          </Grid>



          <Grid item xs={12}>

            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => {
              console.log(values)
              if (data._id) {
                update()
              } else {

                upload()
              }
            }} >
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent >
  )
}

export default AddExchange
