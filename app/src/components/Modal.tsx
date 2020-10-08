import React, { useState } from 'react'

import Button from './Button'
import ClientOnlyPortal from './ClientOnlyPortal'
import ModalHead from './ModalHead'
import UploadForm from './UploadForm'

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
              <div className={ style.formWrapper }>
                <ModalHead clickHandler={() => setOpen(false)} />
                <UploadForm />
              </div>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  )
}

export default Modal
