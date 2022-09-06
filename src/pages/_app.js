import '../../styles/globals.css'
// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import { useEffect, useState } from 'react'
import SplashScreen from 'src/views/onboarding/SplashScreen'

import JotaiNexus, { readAtom, writeAtom } from "jotai-nexus";


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const [user, setUser] = useState("")
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props


  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  useEffect(() => {
    if (router.pathname.startsWith("/pages/login")) {
      setUser("something")
      return;
    }
    let access = localStorage.getItem("user")
    if (!access) {

      return router.push("/pages/login").then(() => {
        return setUser("something")

      })
    }
    setUser(access)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>

          {user ? ({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          } : ({ settings }) => {
            return <SplashScreen />
          }}
        </SettingsConsumer>
        <JotaiNexus />
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
