import React, { useContext, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import { StateContext } from '../containers/StateContainer'
import type { StateActionsFunc } from '../containers/StateContainer'

import Header from '../components/Header' 
/* import Footer from './Footer' */
import FileSet from '../components/FileSet'




interface setFileStatsInterface {
  files: any[];
  setStatAction: StateActionsFunc;
}

const computeFileStats = (files: any, setStatAction: any) => {
  if (!files || files.length < 1) return
  const totalSize = files.reduce((a:any, v:any) => {
    return a + v.size
  }, 0)
  setStatAction(files.length, totalSize)
}

interface QueryResultProps {
  loading: boolean;
  error: any;
  files: any;
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
      id
      filename
      size
      url
      title
    }
  }
`

const AllFileSet: React.FC = () => {
  const { loading, error, data } = useQuery(ALL_FILES)
  const files = data?.allFiles
  return <QueryResult loading={loading} error={error} files={files} />
}

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

const SearchFileSet: React.FC<{searchQuery: string}> = ({ searchQuery }) => {
  const { loading, error, data } = useQuery(
    SEARCH_FILES,
    { variables: { input: { search: searchQuery } } }
  );
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
