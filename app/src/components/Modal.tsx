import React from 'react'
import { useState } from 'react'

import ClientOnlyPortal from './ClientOnlyPortal'
import ModalHead from './ModalHead'
import Button from './Button'

import style from './Modal.module.scss'


const Modal: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        clickHandler={() => setOpen(true)}
        extraClass={style.button}
      >
        Upload
      </Button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className={ style.backdrop }>
            <div className={ style.modal }>
              <ModalHead clickHandler={() => setOpen(false)} />
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  )
}

export default Modal
