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
import { BannerDataAtom, bannerModalAtom, detailsAtom, detailsCountAtom, exchangeDataAtom, exchangeModalAtom, productDataAtom, productModalAtom } from 'src/helpers/jotai/atom'
import toast from 'react-hot-toast'
import { Switch } from '@mui/material'
import { categoryListAtom, storeListAtom, unitListAtom } from 'src/helpers/jotai/apiAtoms'

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

const AddProduct = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [unitList, setUnitList] = useAtom(unitListAtom)
  const [categoryList, setCategoryList] = useAtom(categoryListAtom)
  const [storeList, setStoreList] = useAtom(storeListAtom)

  const [detailCount, setDetailCount] = useAtom(detailsCountAtom)
  const [imgList, setImageList] = useState([])
  const [image, setImage] = useState("")
  const [changed, setChanged] = useState(false)
  const [data, setData] = useAtom(productDataAtom)
  const [open, setOpen] = useAtom(productModalAtom)
  const [options, setOptions] = useState(data?.options ? data?.options : [{

    price: "",
    title: "",
  }])

  const [details, setDetails] = useState(data?.details ? data?.details : [{

    title: "",
    description: ""
  }])

  const [divId, setdivId] = useState(1)


  const [values, setValues] = useState({
    name: data?.name,
    description: data?.description,
    photo: data?.photo,
    price: data?.price,
    unit: data?.unit?._id,
    unit_value: data?.unit_value,
    weight: data?.weight,
    category: data?.category?._id,
    quantity: data?.quantity,
    details: details || [],
    options: options || [],
    discount: data?.discount,
    store: data?.store?._id,
    active: data?.active,
  })



  useEffect(() => {
    console.log(data)
    console.log("🚀 ~ file: AddProduct.js ~ line 114 ~ useEffect ~ data", data);
    if (data._id) {
      setValues({ ...values, ["_id"]: data._id })
      if (data?.details.length) {
        setDetails([...data?.details])
      }
      if (data?.options.length) {
        setOptions([...data?.options])

      }
      setImageList([...data?.photo])
    }


  }, [data])

  useEffect(() => {
    API.categoryList({})
    API.unitList({})
    API.storeList({})
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
    API.uploadFile(image, (d) => {
      imgList.push(d.data)
      setImageList(imgList)
      setValues({ ...values, ["photo"]: imgList })
      setChanged(!changed)

    })
  }

  const upload = () => {
    // return console.log('values.details', values.details)

    API.addProduct({ body: values }, (d) => {

      setOpen(false)
    })
  }

  const update = () => {
    // return console.log('values.details', values.details)
    API.updateProduct({ body: values }, (d) => {

      setOpen(false)

    })
  }

  let intList = ["price", "quantity", "discount", "unit_value"]

  const handleChange = (key, val) => event => {
    setValues({ ...values, [key]: val ? val : event.target.value })
  }

  const handleImageDeleteImgList = i => () => {
    setImageList(imgList.filter(f => f != i))

    setChanged(!changed)

  }

  const handleDivInputChange = (i, e) => {
    let newFormValues = [...details];
    newFormValues[i][e.target.name] = e.target.value;
    setDetails(newFormValues);
    setValues({ ...values, ["details"]: newFormValues });
  }

  const handleDivInputChange_opt = (i, e) => {
    let newFormValues = [...options];
    newFormValues[i][e.target.name] = e.target.value;
    setOptions(newFormValues);
    setValues({ ...values, ["options"]: newFormValues });
  }


  let addFormFields = () => {
    setDetails([...details, { title: "", description: "" }])
  }

  let addFormFields_opt = () => {
    setOptions([...options, { title: "", price: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...details];
    newFormValues.splice(i, 1);
    setDetails(newFormValues)
    setValues({ ...values, ["details"]: newFormValues });
  }

  let removeFormFields_opt = (i) => {
    let newFormValues = [...options];
    newFormValues.splice(i, 1);
    setOptions(newFormValues)
    setValues({ ...values, ["options"]: newFormValues });
    console.log(values)
  }

  const handleImageDeleteValPhoto = i => () => {
    let _v = data.photo.filter(f => f != i)
    setData(v => { return { ...v, photo: _v } })
    setChanged(!changed)

  }



  return (
    <CardContent>
      <form>
        <Grid container spacing={7}  >

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
            <Box sx={{ display: 'flex', alignItems: 'center', overflowX: "scroll" }}>

              {
                imgList.map((i) => {

                  return <ImgStyled src={i} alt='Profile Pic' onClick={handleImageDeleteImgList(i)} />
                })
              }
              {/* {
                data.photo ?
                  data?.photo?.map((i) => {

                    return <ImgStyled src={i} alt='Profile Pic' onClick={handleImageDeleteValPhoto(i)} />
                  })

                  : ""
              } */}
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
            <p></p>
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
              <Select label='Status' onChange={handleChange("active")} value={values.active} >
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
                <p>Options</p>
              </Grid>
              <Grid item xs={10}>
                <Button variant='contained' sx={{ height: 40 }} onClick={addFormFields_opt} >
                  ADD
                </Button>

              </Grid>

            </div>

            {

              options.map((d, i) => {
                return (
                  <div className='ProductDetailListDivIn'>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        type='text'
                        label='Weight'
                        name="title"
                        placeholder='Weight'
                        defaultValue={""}
                        value={d.title || ""}
                        onChange={(e) => handleDivInputChange_opt(i, e)}
                      />
                    </Grid>
                    <Grid xs={12} marginX={2} >
                      <TextField
                        fullWidth
                        multiline
                        label='Price'
                        placeholder='150'
                        name="price"
                        value={d.price || ""}
                        defaultValue={""}
                        onChange={(e) => handleDivInputChange_opt(i, e)}
                      />
                    </Grid>
                    <Grid item >
                      <Button variant='outlined' color="error" xs={5} sx={{ width: 40, height: 40, marginX: 1 }} onClick={() => {

                        removeFormFields_opt(i)
                      }} >
                        <DeleteCircle />
                      </Button>

                    </Grid>
                  </div>
                )
              })
            }




          </div>


          <div className='ProductDetailListDiv' >
            <div className='ProductDetailListDiv_heading' >
              <Grid item xs={10}>
                <p>Extra Details</p>
              </Grid>
              <Grid item xs={10}>
                <Button variant='contained' sx={{ height: 40 }} onClick={addFormFields} >
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
                        name="title"
                        placeholder='Nutrition'
                        defaultValue={""}
                        value={d.title || ""}
                        onChange={(e) => handleDivInputChange(i, e)}
                      />
                    </Grid>
                    <Grid xs={12} marginX={2} >
                      <TextField
                        fullWidth
                        multiline
                        label='Description'
                        placeholder='150 kcal'
                        name="description"
                        value={d.description || ""}
                        defaultValue={""}
                        onChange={(e) => handleDivInputChange(i, e)}
                      />
                    </Grid>
                    <Grid item >
                      <Button variant='outlined' color="error" xs={5} sx={{ width: 40, height: 40, marginX: 1 }} onClick={() => {

                        removeFormFields(i)
                      }} >
                        <DeleteCircle />
                      </Button>

                    </Grid>
                  </div>
                )
              })
            }

            {/* {

              data.photo.length ?

                data.photo.map((d, i) => {
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
                            let a = [...data.photo].map((m, j) => {
                              if (i === j) {
                                return {
                                  ...m,
                                  title: e.target.value
                                }
                              }
                            })
                            setData(v => { return { ...v, photo: a } })
                            setChanged(!changed)

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
                            let a = [...data.photo].map((m, j) => {
                              if (i === j) {
                                return {
                                  ...m,
                                  description: e.target.value
                                }
                              }
                            })
                            setData(v => { return { ...v, photo: a } })
                            setChanged(!changed)


                          }}
                        />
                      </Grid>
                      <Grid item >
                        <Button variant='outlined' color="error" xs={5} sx={{ width: 40, height: 40, marginX: 1 }} onClick={() => {
                          let a = [...data.photo].filter((m, j) => {
                            return i != j
                          })
                          setData(v => { return { ...v, photo: a } })
                          setChanged(!changed)

                        }} >
                          <DeleteCircle />
                        </Button>

                      </Grid>
                    </div>
                  )
                })
                : ""
            } */}


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

              console.log("🚀 ~ file: AddProduct.js ~ line 659 ~ AddProduct ~ data._id", data._id);
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

export default AddProduct
