import React, { useRef, useEffect, useState } from 'react'
import type { MutableRefObject } from 'react'
import { createPortal } from 'react-dom'

interface ClientOnlyPortalProps {
  selector: string;
}

const ClientOnlyPortal: React.FC<ClientOnlyPortalProps> = ({ children, selector }) => {
  const ref = useRef() as MutableRefObject<HTMLElement>
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // @ts-ignore
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}

export default ClientOnlyPortal
