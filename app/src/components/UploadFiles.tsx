import React from 'react'
import { gql, useMutation } from '@apollo/client';

import Button from './Button'

const MUTATION = gql`
  mutation PostFile($input: PostFileInput!) {
    postFiles(input: $input) {
      __typename
      id
      name
    }
  }
`

interface UploadFilesProps {
  files: File[] | null;
}

const UploadFiles: React.FC<UploadFilesProps> = ({files}) => {
  const [mutate] = useMutation(MUTATION);
  
  const handleMutate = () => {
    console.log(files)
    if (files && files.length > 0)  {
      mutate({ variables: { input: { files }}})
    }
  }

  return <Button clickHandler={handleMutate}>Upload</Button>
}

export default UploadFiles
