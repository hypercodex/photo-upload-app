import React from 'react'

import Header from './Header' 
import Footer from './Footer'
import Files from './Files'

import style from './Home.module.scss'


const Home: React.FC = () => {
  return (
    <div className={ style.wrapper }>
      <Header />
      <Files />
      <Footer />
    </div>
  )
} 

export default Home
