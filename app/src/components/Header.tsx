import React from 'react'

import Search from './Search'
import Stats from './Stats'
import Modal from './Modal'

import style from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={ style.header }>
      <div className={style.wrapper} >
        <Search />
        <Modal />
      </div>
      <Stats />
    </header>
  )
}



export default Header
