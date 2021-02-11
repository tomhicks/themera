import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {Provider} from "jotai"
import {useAtomValue} from "jotai/utils"
import {AppProps} from "next/app"
import {useRouter} from "next/router"
import React, {useEffect} from "react"
import {chakraColorAtom} from "../atom"
import "../styles/global.css"
import * as gtag from "../utils/gtag"

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider>
      <WithChakra>
        <Component {...pageProps} />
      </WithChakra>
    </Provider>
  )
}

function WithChakra(props: {children: React.ReactNode}) {
  const colorOverrides = useAtomValue(chakraColorAtom)

  return (
    <ChakraProvider
      theme={extendTheme({
        colors: colorOverrides,
      })}
    >
      {props.children}
    </ChakraProvider>
  )
}

export default MyApp
