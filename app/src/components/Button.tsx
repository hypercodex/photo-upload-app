import React from 'react'

import style from './Button.module.scss'

interface Handler {
  ():void
}

interface ButtonProps {
  extraClass?: string;
  clickHandler: Handler;
}

const Button: React.FC<ButtonProps> = ({
  children,
  extraClass,
  clickHandler
}) => {
  return (
    <button
      type='button'
      className={`${style.buttonBase} ${extraClass}`}
      onClick={clickHandler}
    >
      { children }
    </button>
  )
}

export default Button
