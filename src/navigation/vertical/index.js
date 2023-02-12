// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ViewCarouselOutline from 'mdi-material-ui/ViewCarouselOutline'
import ImageIcon from "mdi-material-ui/Image";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Category } from '@mui/icons-material'
import { faCarrot, faCoffee, faStore, faWeightHanging, faGears, faUsers } from '@fortawesome/free-solid-svg-icons'




const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Main'
    },
    {
      title: 'Products',
      icon: faCarrot,
      path: '/product',
      diff: true,
    },
    {
      title: 'Units',
      icon: faWeightHanging,
      path: '/unit',
      diff: true,

    },
    {
      title: 'Category',
      icon: Category,
      path: '/category'
    },

    {
      title: 'Stores',
      icon: faStore,
      path: '/store'
      , diff: true
    },

    {
      sectionTitle: 'Users'
    },
    {
      title: 'User',
      icon: PersonIcon,
      path: '/user'
    },
    {
      title: 'Banners',
      icon: ImageIcon,
      path: '/banners'
    },
    {
      title: 'Settings',
      icon: faGears,
      path: '/settings',
      diff: true,
    },
    {
      sectionTitle: 'Employee'
    },
    {
      title: 'List',
      icon: faUsers,
      path: '/employee',
      diff: true,
    },
    {
      title: 'Roles',
      icon: faGears,
      path: '/role',
      diff: true,
    },
    {
      sectionTitle: 'Orders'
    },
    {
      title: 'List',
      icon: faUsers,
      path: '/orders',
      diff: true,
    },

  ]
}

export default navigation
