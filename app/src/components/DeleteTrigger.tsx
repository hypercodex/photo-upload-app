import React from 'react'

import Button from './Button'



interface Handler {
  (): void;
}

interface DeleteTriggerProps {
  clickHandler: Handler;
  extraClass: string;
}

const DeleteTrigger: React.FC<DeleteTriggerProps> = ({clickHandler, extraClass}) => {
  return (
    <Button
      clickHandler={clickHandler}
      extraClass={extraClass}
    >
      Delete
    </Button>
  )
}

export default DeleteTrigger
