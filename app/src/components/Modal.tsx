import React, { useState } from 'react'

import ModalHead from './ModalHead'
import Button from './Button'
import ClientOnlyPortal from '../containers/ClientOnlyPortal'
import UploadForm from '../containers/UploadForm'

import style from './Modal.module.scss'


const Modal: React.FC = () => {
  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen(prevState => !prevState)

  return (
    <>
      <Button
        clickHandler={toggleModal}
        extraClass={style.button}
      >
        Upload
      </Button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className={ style.backdrop }>
            <div className={ style.modal }>
              <div className={ style.formWrapper }>
                <ModalHead clickHandler={toggleModal} />
                <UploadForm handleCloseModal={toggleModal}/>
              </div>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  )
}

export default Modal
