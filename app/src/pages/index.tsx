import React, { useEffect } from 'react'

import GrapQlProvider from '../containers/GraphQlProvider'
import StateContainer from '../containers/StateContainer'
import App from '../containers/App' 
import AppBody from '../components/AppBody'


const Index: React.FC = () => {
  return (
    <GrapQlProvider>
      <StateContainer>
        <AppBody>
          <App />
        </AppBody>
      </StateContainer>
    </GrapQlProvider>
  )
}

export default Index
