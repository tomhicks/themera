import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {Provider} from "jotai"
import {useAtomValue} from "jotai/utils"
import {AppProps} from "next/dist/next-server/lib/router/router"
import React from "react"
import {chakraColorAtom} from "../src/atom"
import "../styles/global.css"

function MyApp({Component, pageProps}: AppProps) {
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
