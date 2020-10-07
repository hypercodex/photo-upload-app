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
        <Button extraClass={style.buttonClass}>
          Upload
        </Button>
      </div>
      <Stats docCount={6} aggDocSize={'600kb'} />
    </header>
  )
}

export default Header
