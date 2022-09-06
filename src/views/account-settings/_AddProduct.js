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
import { detailsAtom, detailsCountAtom } from 'src/helpers/jotai/atom'
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
  const [loading, setLoading] = useState(true)
  function handleClick() {
    setLoading(true)
  }
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [unitList, setUnitList] = useState('')
  const [categoryList, setCategoryList] = useState('')
  const [storeList, setStoreList] = useState('')
  const [details, setDetails] = useAtom(detailsAtom)
  const [detailCount, setDetailCount] = useAtom(detailsCountAtom)
  const [imgList, setImageList] = useState([])
  const [image, setImage] = useState('')
  const [changed, setChanged] = useState(false)
  const [values, setValues] = useState({
    name: '',
    description: '',
    photo: imgList,
    price: 0,
    unit: '',
    unit_value: 0,
    weight: '',
    category: '',
    quantity: 0,
    details: details,
    discount: 0,
    store: '',
    status: true
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
    // API.unitList({}, (d) => {
    //   setUnitList(d.data)
    // })
    // API.categoryList({}, (d) => {
    //   setCategoryList(d.data)
    // })
    // API.storeList({}, (d) => {
    //   setStoreList(d.data)
    // })
  }, [])

  const onChange = file => {
    if (imgList.length == 3) {
      return
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
    uploadProductImg(image, d => {
      imgList.push(d.data)
      setImageList(imgList)
      setChanged(!changed)
    })
  }

  const uploadProdct = () => {
    uploadProduct({ body: values }, d => {
      toast.success(d.message)
    })
  }

  let intList = ['price', 'quantity', 'discount', 'unit_value']
  const handleChange = (key, val) => event => {
    setValues({
      ...values,
      [key]: val ? val : intList.includes(key) ? parseFloat(event.target.value) : event.target.value
    })
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: 4.8,
              marginBottom: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
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
            <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'scroll' }}>
              {imgList.map(i => {
                return <ImgStyled src={i} alt='Profile Pic' />
              })}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' placeholder='Name' onChange={handleChange('name')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Domain' placeholder='Domain' onChange={handleChange('name')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className='switch-toggle'>
              {' '}
              <lable className='lab-action'>ACTION</lable>{' '}
              <Switch checked={loading} onChange={() => setLoading(!loading)} name='loading' color='primary' />
            </div>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Price per Unit'
              onChange={handleChange("price")}
              placeholder='0.00'

            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Unit'
              onChange={handleChange("unit_value")}

              placeholder='1'
              defaultValue={1}

            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>{unitList.length ? "Unit Type" : "No category added in list"}</InputLabel>
              {
                unitList.length ?
                  <Select label='Unit-Type'
                    onChange={handleChange("unit")}

                  >
                    {
                      unitList.map(c => {
                        return (<MenuItem value={c?._id ?? ""}>{c?.name ?? ""}</MenuItem>)
                      })
                    }

                  </Select> :
                  ""
              }

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>he</p>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type='text'
              label='Weight'
              placeholder='20g - 30g'
              onChange={handleChange("weight")}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Discount (in %)'
              placeholder='0'
              onChange={handleChange("discount")}

            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Stock Left (in Unit)'
              placeholder='0'
              onChange={handleChange("quantity")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' onChange={handleChange("status")}>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>{storeList.length ? "Store" : "No category added in list"}</InputLabel>
              {
                storeList.length ?
                  <Select label='Store' onChange={handleChange("store")}>
                    {
                      storeList.map(c => {
                        return (<MenuItem value={c?._id ?? ""}>{c?.name ?? ""}</MenuItem>)
                      })
                    }

                  </Select> :
                  ""
              }

            </FormControl>
          </Grid>

          <div className='ProductDetailListDiv' >
            <div className='ProductDetailListDiv_heading' >
              <Grid item xs={10}>
                <p>Extra Details</p>
              </Grid>
              <Grid item xs={10}>
                <Button variant='contained' sx={{ height: 40 }} onClick={() => {
                  let a = details;
                  a.push({ title: "", description: "" })
                  setDetails(a)
                  setDetails(a)
                  setChanged(!changed)


                }} >
                  ADD More
                </Button>

              </Grid>

            </div>

            {

              details.map((d, i) => {
                return (
                  <div className='ProductDetailListDivIn'>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        type='text'
                        label='Title'
                        placeholder='Nutrition'
                        defaultValue={""}
                        value={d?.title}
                        onChange={e => {
                          let a = [...details].map((m, j) => {
                            if (i === j) {
                              return {
                                ...m,
                                title: e.target.value
                              }
                            }
                          })
                          setDetails(a);
                        }}
                      />
                    </Grid>
                    <Grid xs={12} marginX={2} >
                      <TextField
                        fullWidth
                        multiline
                        label='Description'
                        placeholder='150 kcal'
                        value={d?.description}
                        defaultValue={""}
                        onChange={e => {
                          let a = [...details].map((m, j) => {
                            if (i === j) {
                              return {
                                ...m,
                                description: e.target.value
                              }
                            }
                          })
                          setDetails(a);
                        }}
                      />
                    </Grid>
                    <Grid item >
                      <Button variant='outlined' color="error" xs={5} sx={{ width: 40, height: 40, marginX: 1 }} onClick={() => {
                        let a = [...details].filter((m, j) => {
                          return i != j
                        })
                        setDetails(a);
                      }} >
                        <DeleteCircle />
                      </Button>

                    </Grid>
                  </div>
                )
              })
            }


          </div>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button
              variant='contained'
              sx={{ marginRight: 3.5 }}
              onClick={() => {
                console.log(values)
                uploadProdct()
              }}
            >
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default AddExchange
