import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/global.scss'


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default App
