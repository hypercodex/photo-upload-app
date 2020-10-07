import React from 'react'

import style from './Button.module.scss'

interface ButtonProps {
  extraClass?: string;
}

const Button: React.FC<ButtonProps> = ({ children, extraClass }) => {
  return (
    <button className={`${style.buttonBase} ${extraClass}`}>
      { children }
    </button>
  )
}

export default Button
