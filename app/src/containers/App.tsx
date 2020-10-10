import React, { useContext, useEffect, useMemo, useState } from 'react'
import { gql, useQuery, useMutation} from '@apollo/client'

import type { File } from '../../../api/src/types'
import { computeFileStats } from '../lib'
import { StateContext } from '../containers/StateContainer'
import Header from '../components/Header' 
import FileSet from '../components/FileSet'

/* import Footer from '../components/Footer' */


type Refetch = () => void

interface QueryResultProps {
  loading: boolean;
  error: any;
  files: File[];
  refetch: Refetch; 
}

const QueryResult: React.FC<QueryResultProps> = ({
  loading,
  error,
  files,
  refetch
}) => {
  const { stateActions } = useContext(StateContext)
  const { setRefetch } = useContext(GraphQLContext)
  
  useEffect(() => {
    setRefetch(() => refetch)
    computeFileStats(files, stateActions.setStats)
  }, [setRefetch, refetch, files, stateActions.setStats])

  return (
    <>
    {loading ? 
      ( <p>Loading...</p> ) :
     error ?
      ( <p>Error...</p> ) :
      (<FileSet files={files} />)
    }
    </>
  )
}

const ALL_FILES = gql`
  query AllFiles {
    allFiles {
      id
      filename
      size
      url
      title
    }
  }
`

const SEARCH_FILES = gql`
  query SearchFiles($input: SearchFileInput!) {
    searchFiles(input: $input) {
      id
      filename
      size
      url
      title
  }
}
`

const MUTATION = gql`
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      id
    }
  }
`

const AllFileSet: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(
    ALL_FILES, {
      fetchPolicy: 'cache-and-network'
    }
  )
  const files = data?.allFiles
  return (
    <QueryResult
      loading={loading}
      error={error}
      files={files}
      refetch={refetch}
      />
  )
}

const SearchFileSet: React.FC<{searchQuery: string}> = ({ searchQuery }) => {
  const { loading, error, data, refetch } = useQuery(SEARCH_FILES, {
    variables: { input: { search: searchQuery } },
    fetchPolicy: 'network-only'
  });
  const files = data?.searchFiles
  return (
    <QueryResult
      loading={loading}
      error={error}
      files={files}
      refetch={refetch}
      />
  )
}

interface MutateHandler {
  (fileId: string): void;
}

export const GraphQLContext = React.createContext<{
  handleDelete: MutateHandler;
  refetch: Refetch;
  setRefetch: React.SetStateAction<any>;
}>({
  handleDelete: () => null,
  refetch: () => null,
  setRefetch: () => null
})

const App: React.FC = () => {
  
  const { state } = useContext(StateContext)
  const { searchQuery } = state
  const searchActive = searchQuery !== ''

  const [refetch, setRefetch] = useState(() => () => null)
  const [mutate] = useMutation(MUTATION)

  const contextValue = useMemo(() => {
    return {
      handleDelete: (fileId: string) => {
        mutate({ variables: { input: { id: fileId }}})
      },
      refetch,
      setRefetch
    }
  }, [mutate, refetch])

  return (
    <>
      <GraphQLContext.Provider value={contextValue}>
        <Header />
        {searchActive ?
          <SearchFileSet searchQuery={searchQuery} /> 
          :
          <AllFileSet />
        }
        {/* <Footer /> */}
      </GraphQLContext.Provider>
    </>
  )
} 

export default App
