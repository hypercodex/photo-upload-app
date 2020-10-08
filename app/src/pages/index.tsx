import React from 'react'

import GrapQlProvider from '../containers/GraphQlProvider'
import Home from '../components/Home' 

const Index: React.FC = () => {
  return (
    <GrapQlProvider>
      <Home />
    </GrapQlProvider>
  )
}

export default Index
