import React from 'react'

import Header from './Header' 
import Footer from './Footer'
import FileSet from './FileSet'

import style from './Home.module.scss'


const Home: React.FC = () => {
  return (
    <div className={ style.wrapper }>
      <Header />
      <FileSet />
      <Footer />
    </div>
  )
} 

export default Home
