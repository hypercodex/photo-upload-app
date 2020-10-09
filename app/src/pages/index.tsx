import React from 'react'

import GrapQlProvider from '../containers/GraphQlProvider'
import StateContainer from '../containers/StateContainer'
import Home from '../components/Home' 


const Index: React.FC = () => {
  return (
    <GrapQlProvider>
      <StateContainer>
        <Home />
      </StateContainer>
    </GrapQlProvider>
  )
}

export default Index
