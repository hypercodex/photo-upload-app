import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render():JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          {/* Here we will mount our modal portal */}
          <div id="modal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
