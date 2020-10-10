import React from 'react'
import { gql, useMutation } from '@apollo/client';

import DeleteTrigger from '../components/DeleteTrigger'


const MUTATION = gql`
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      id
    }
  }
`


interface UploadFilesProps {
  fileId: string;
  extraClass: string;
}

const DeleteFile: React.FC<UploadFilesProps> = ({fileId, extraClass, children}) => {
  const [mutate] = useMutation(MUTATION)

  
  const handleMutate = () => {
    mutate({ variables: { input: { id: fileId }}})
  }

  return <DeleteTrigger clickHandler={handleMutate} extraClass={extraClass} />
}

export default DeleteFile
