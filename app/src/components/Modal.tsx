import React from 'react'
import { useState } from 'react'

import ClientOnlyPortal from './ClientOnlyPortal'
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
              <button type="button" onClick={() => setOpen(false)}>
                Close Modal
              </button>
            </div>
            <style jsx>{`

            `}</style>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  )
}

export default Modal
