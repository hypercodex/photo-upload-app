import React from 'react'

import Search from './Search'
import Button from './Button'
import Stats from './Stats'

import style from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={ style.header }>
      <div className={style.wrapper} >
        <Search />
        <Button extraClass={style.button}>
          Upload
        </Button>
      </div>
      <Stats count={6} aggSize={'600kb'} />
    </header>
  )
}

export default Header
