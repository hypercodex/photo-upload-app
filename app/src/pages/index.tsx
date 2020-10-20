import React, { useEffect } from 'react'

import GrapQlProvider from '../containers/GraphQlProvider'
import StateContainer from '../containers/StateContainer'
import App from '../containers/App' 


const Index: React.FC = () => {
  return (
    <GrapQlProvider>
      <StateContainer>
        <App />
      </StateContainer>
    </GrapQlProvider>
  )
}

export default Index
