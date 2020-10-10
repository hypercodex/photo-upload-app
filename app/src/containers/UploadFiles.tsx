import React from 'react'
import { gql, useMutation } from '@apollo/client';

import UploadTrigger from '../components/UploadTrigger'


const MUTATION = gql`
  mutation PostFile($input: PostFileInput!) {
    postFiles(input: $input) {
      __typename
      id
      filename
      title
    }
  }
`

interface Handler {
  (): void;
}

interface UploadFilesProps {
  handleSuccess: Handler; 
  files: File[] | null;
}

const UploadFiles: React.FC<UploadFilesProps> = ({files, handleSuccess}) => {
  const [mutate] = useMutation(MUTATION, {
    update(cache, { data: { postFiles } }) {
      cache.modify({
        fields: {
          files(existingFiles = []) {
            const newFileRef = cache.writeFragment({
              data: postFiles,
              fragment: gql`
                fragment NewFile on File {
                  __typename
                  id
                  filename
                  title
                }
              `
            });
            return [...existingFiles, newFileRef];
          }
        }
      })
    }
  })

  
  const handleMutate = () => {
    if (files && files.length > 0)  {
      const filesPayload = files.map(file => ({file, size: file.size}))
      mutate({ variables: { input: { files: filesPayload }}}).then(res => {
        handleSuccess()
      })
    }
  }

  return <UploadTrigger clickHandler={handleMutate}>Upload</UploadTrigger>
}

export default UploadFiles
