import React from 'react'

import Search from './Search'
import Button from './Button'

import style from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={ style.header }>
      <Search />
      <Button extraClass={style.buttonClass}>
        Upload
      </Button>
    </header>
  )
}

export default Header
