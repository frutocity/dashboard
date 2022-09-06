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
import { detailsAtom, detailsCountAtom, productDataAtom } from 'src/helpers/jotai/atom'
import toast from 'react-hot-toast'

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

const UpdateProduct = ({ }) => {
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
  const [val, setVal] = useAtom(productDataAtom)

  const [values, setValues] = useState({
    _id: val?._id,
    name: val?.name,
    description: val.description,
    photo: [...imgList, ...val?.photo],
    price: val?.price,
    unit: val?.unit,
    unit_value: val?.unit_value,
    weight: val?.weight,
    category: val?.category._id,
    quantity: val?.quantity,
    details: [...details, val?.details],
    discount: val?.discount,
    store: val?.store._id,
    status: val?.status,
  })



  useEffect(() => {
    setImgSrc(imgSrc)
    setUnitList(unitList)
    setCategoryList(categoryList)
    setImageList(imgList)
    setImage(image)

    setValues(values)
    console.log('[...imgList, ...val.photo]', [...imgList, ...val.photo])

    setValues(p => { return { ...p, photo: [...imgList, ...val.photo], } })
  }, [changed])




  useEffect(() => {
    API.unitList({}, (d) => {
      setUnitList(d.data)
    })
    API.categoryList({}, (d) => {
      setCategoryList(d.data)
    })
    API.storeList({}, (d) => {
      setStoreList(d.data)
    })

  }, [])

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
    uploadProductImg(image, (d) => {
      imgList.push(d.data)
      setImageList(imgList)
      setChanged(!changed)
    })
  }

  const uploadProdct = () => {
    API.updateProduct({ body: values }, (d) => {
      toast.success(d.message)
    })
  }

  let intList = ["price", "quantity", "discount", "unit_value"]
  const handleChange = (key, val) => event => {
    setValues({ ...values, [key]: val ? val : intList.includes(key) ? parseFloat(event.target.value) : event.target.value })
  }

  const handleImageDeleteImgList = i => () => {
    setImageList(imgList.filter(f => f != i))

    setChanged(!changed)

  }

  const handleImageDeleteValPhoto = i => () => {
    let _v = val.photo.filter(f => f != i)
    setVal(v => { return { ...v, photo: _v } })
    setChanged(!changed)

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
                  Update New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                {
                  image ?
                    <ResetButtonStyled variant='contained' onClick={uploadImage}>
                      Add
                    </ResetButtonStyled>
                    : ""
                }
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', overflowX: "scroll" }}>
              {
                imgList.map((i) => {

                  return <ImgStyled src={i} alt='Profile Pic' onClick={handleImageDeleteImgList(i)} />
                })
              }
              {
                val.photo.map((i) => {

                  return <ImgStyled src={i} alt='Profile Pic' onClick={handleImageDeleteValPhoto(i)} />
                })
              }


            </Box>
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' placeholder='Tomato' onChange={handleChange("name")} value={values.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>{categoryList.length ? "Category" : "No category added in list"}</InputLabel>
              {
                categoryList.length ?
                  <Select label='Category' onChange={handleChange("category")} value={values.category} >
                    {
                      categoryList.map(c => {
                        return (<MenuItem value={c?._id ?? ""}>{c?.name ?? ""}</MenuItem>)
                      })
                    }

                  </Select> :
                  ""
              }

            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <TextField
              fullWidth
              multiline
              label='Description'
              minRows={2}
              value={values.description}
              onChange={handleChange("description")}
              placeholder='Description'

            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Price per Unit'
              value={values.price}
              onChange={handleChange("price")}
              placeholder='0.00'

            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Unit'
              value={values.unit_value}
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
                    value={values.unit}
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
              value={values.weight}
              onChange={handleChange("weight")}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Discount (in %)'
              placeholder='0'
              value={values.discount}
              onChange={handleChange("discount")}

            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='number'
              label='Stock Left (in Unit)'
              placeholder='0'
              value={values.quantity}
              onChange={handleChange("quantity")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' onChange={handleChange("status")} value={values.status} >
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
                  <Select label='Store' onChange={handleChange("store")} value={values.store} >
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

          {/* {openAlert ? (
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
          ) : null} */}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => {
              console.log(values)
              uploadProdct()
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

export default UpdateProduct
