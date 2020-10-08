import React from 'react'

import Button from './Button'

import style from './ModalHead.module.scss'

interface Handler {
  ():void
}

interface ModalHeadProps {
  clickHandler: Handler;
}

const ModalHead: React.FC<ModalHeadProps> = ({ clickHandler }) => {
  return (
    <div className={style.wrapper}>
      <p>
        This modal is rendered using{' '}
        <a
          href="https://reactjs.org/docs/portals.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          portals
        </a>
        .
      </p>
      <Button  clickHandler={clickHandler}>
        Close Modal
      </Button>
    </div>
  )
}

export default ModalHead
