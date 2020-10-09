import React from 'react'
import { gql, useMutation } from '@apollo/client';

import UploadTrigger from '../components/UploadTrigger'


const MUTATION = gql`
  mutation PostFile($input: PostFileInput!) {
    postFiles(input: $input) {
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
    console.log(files)
    if (files && files.length > 0)  {
      mutate({ variables: { input: { files }}}).then(res => {
        handleSuccess()
        // change with working cache config
        location.reload()
      })
    }
  }

  return <UploadTrigger clickHandler={handleMutate}>Upload</UploadTrigger>
}

export default UploadFiles
