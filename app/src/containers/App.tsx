import React, { useContext, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import { StateContext } from '../containers/StateContainer'
import type { StateActionsFunc } from '../containers/StateContainer'
import type { File } from '../../../api/src/types'

import Header from '../components/Header' 
/* import Footer from './Footer' */
import FileSet from '../components/FileSet'




interface SetFileStatsInterface {
  (
    files: File[],
    setStatAction: StateActionsFunc
  ): void
}

const computeFileStats: SetFileStatsInterface = (
  files,
  setStatAction
) => {
  if (!files) return
  const totalSize = files.reduce((a: number, v: File) => {
    return a + v.size
  }, 0)
  setStatAction(files.length, totalSize)
}

interface QueryResultProps {
  loading: boolean;
  error: any;
  files: File[];
}

const QueryResult: React.FC<QueryResultProps> = ({loading, error, files}) => {
  const { stateActions } = useContext(StateContext)
  useEffect(() => {
    computeFileStats(files, stateActions?.setStats)
  }, [files, stateActions?.setStats])

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
      __typename
      id
      filename
      size
      url
      title
    }
  }
`

const AllFileSet: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(ALL_FILES, { })
  const files = data?.allFiles
  return <QueryResult loading={loading} error={error} files={files} />
}

const SEARCH_FILES = gql`
  query SearchFiles($input: SearchFileInput!) {
    searchFiles(input: $input) {
      __typename
      id
      filename
      size
      url
      title
  }
}
`

const SearchFileSet: React.FC<{searchQuery: string}> = ({ searchQuery }) => {
  const { loading, error, data } = useQuery(SEARCH_FILES, {
    variables: { input: { search: searchQuery } },
  });
  const files = data?.searchFiles
  return <QueryResult loading={loading} error={error} files={files} />
}

const App: React.FC = () => {

  const { state } = useContext(StateContext)
  const { searchQuery } = state
  const searchActive = searchQuery !== ''

  return (
    <>
      <Header />
      {searchActive ?
        <SearchFileSet searchQuery={searchQuery} /> 
        :
        <AllFileSet />
      }
    </>
  )
} 

export default App
