// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import API, { } from 'src/helpers/services/API'
import { useAtom } from 'jotai'
import { detailsAtom, detailsCountAtom, exchangeDataAtom, userDataAtom, userModalAtom } from 'src/helpers/jotai/atom'
import toast from 'react-hot-toast'
import { FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material'

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

const LevelEnums = {
  EMAIL: "email_verified",
  BANK: "bank_verified",
  UPI: "upi",
  QR: "qr_code",
  VERIFIED: "verified",
  TRUSTED: "trusted",
}
const _LevelEnums = {
  "email_verified": "EMAIL",
  "bank_verified": "BANK",
  "upi": "UPI",
  "qr_code": "QR",
  "verified": "VERIFIED",
  "trusted": "TRUSTED",
}

const { EMAIL,
  BANK,
  UPI,
  QR,
  VERIFIED,
  TRUSTED, } = LevelEnums;

const profileLevels = [EMAIL,
  BANK,
  UPI,
  QR,
  VERIFIED,
  TRUSTED,]

const EditUser2 = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [unitList, setUnitList] = useState("")
  const [categoryList, setCategoryList] = useState("")
  const [storeList, setStoreList] = useState("")
  const [details, setDetails] = useAtom(detailsAtom)
  const [detailCount, setDetailCount] = useAtom(detailsCountAtom)
  const [imgList, setImageList] = useState([])
  const [image, setImage] = useState("")
  const [changed, setChanged] = useState(false)
  const [data, setData] = useAtom(userDataAtom)
  const [imgSrc, setImgSrc] = useState("http://localhost:4000/public/avatars/" + data.avatar)
  const [open, setOpen] = useAtom(userModalAtom)
  const [level, setLevel] = useState("")


  const [values, setValues] = useState({
    name: data?.name,
    username: data?.username,
    avatar: data?.avatar,
    email: data?.email,
    email_verified: data?.email_verified,
    phone: data?.phone,
    payment_methods: data?.payment_methods,
    user_type: data?.user_type,
    sys_user: data?.sys_user,
    level: data?.level,
    profile_completed: data?.profile_completed ?? [],
  })

  useEffect(() => {
    setImgSrc(imgSrc)
    setUnitList(unitList)
    setCategoryList(categoryList)
    setImageList(imgList)
    setImage(image)

    setValues(values)
  }, [changed, data])

  useEffect(() => {
    console.log('data', data)
    setValues({
      _id: data?._id,
      name: data?.name,
      username: data?.username,
      avatar: data?.avatar,
      email: data?.email,
      email_verified: data?.email_verified,
      phone: data?.phone,
      payment_methods: data?.payment_methods,
      user_type: data?.user_type,
      sys_user: data?.sys_user,
      level: data?.level,
      profile_completed: data?.profile_completed ?? [],
    })
    console.log('values', values)
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
    API.updateUser({ body: values }, (d) => {
      // toast.success(d.message)
      API.userDataById({
        params: {
          user_id: data?._id,
        }
      },)

    })
  }

  let intList = ["price", "quantity", "discount", "unit_value"]

  const handleChange = (key, val) => event => {
    setValues({ ...values, [key]: val ? val : event.target.value })
  }

  return (
    <CardContent sx={{ margin: 5 }}  >
      {
        values._id
          ?

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

              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Name' value={values.name} placeholder='' onChange={handleChange("name")} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Username' value={values.username} placeholder='' onChange={handleChange("username")} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Email' value={values.email} placeholder='' onChange={handleChange("email")} />
              </Grid>

              <Grid item xs={3} sm={3}>
                <div className='switch-toggle'>

                  <lable className='lab-action'>Email Verified</lable>{' '}
                  <Switch checked={values.email_verified} name='loading' color='primary' onChange={(e) => {

                    setValues({ ...values, ["email_verified"]: e.target.checked })
                  }} />
                </div>
              </Grid>
              <Grid item xs={3} sm={3}>
                <div className='switch-toggle'>

                  <lable className='lab-action'>is System User?</lable>{' '}
                  <Switch checked={values.sys_user} name='loading' color='primary' onChange={(e) => {

                    setValues({ ...values, ["sys_user"]: e.target.checked })
                  }} />
                </div>
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Phone' value={values.phone} placeholder='' onChange={handleChange("phone")} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{"User Type"}</InputLabel>
                  <Select label='User Type' value={values.user_type} onChange={handleChange("user_type")}>
                    {
                      ["normal", "trusted", "verified"].map(c => {
                        return (<MenuItem value={c ?? ""}>{c ?? ""}</MenuItem>)
                      })
                    }

                  </Select>

                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Profile Level' value={values.level} placeholder='' onChange={handleChange("level")} />
              </Grid>

              <Grid item xs={3} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>{"Profile Completed"}</InputLabel>
                  <Select label='Category' onChange={(e) => {
                    setLevel(e.target.value)
                    // handleChange("profile_completed", [...values.profile_completed, e.target.value])
                    // setChanged(!changed)

                  }}>
                    {
                      Object.keys(LevelEnums).filter(f => {
                        return !values.profile_completed.includes(LevelEnums[f])
                      }).map(c => {
                        return (<MenuItem value={LevelEnums[c] ?? ""}>{c ?? ""}</MenuItem>)
                      })
                    }

                  </Select>

                </FormControl>
              </Grid>

              <Grid item xs={1} sm={1}>
                <Button variant='contained' sx={{}} onClick={() => {
                  setValues({ ...values, ["profile_completed"]: [...values.profile_completed, level] })
                }} >
                  ADD
                </Button>
              </Grid>

              <Grid item xs={1} sm={1}>
                <Button variant='contained' sx={{}} onClick={() => {

                }} >
                  REMOVE
                </Button>
              </Grid>



              <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }} >
                {
                  values.profile_completed.length
                    ?
                    values.profile_completed.map(d => {
                      return <p style={{ marginRight: 10 }} >{_LevelEnums[d]}</p>
                    })
                    : ""
                }
              </Grid>







              <Grid item xs={12}>

                <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => {
                  console.log(values)
                  if (data._id) {
                    update()
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
          : ""
      }
    </CardContent >
  )
}

export default EditUser2
