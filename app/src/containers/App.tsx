import React, {
  useContext,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import {
  gql,
  useQuery,
  useLazyQuery,
  useMutation,
  MutationFunction,
  RefetchQueriesFunction
} from '@apollo/client'
import { computeFileStats } from '../lib'
import { StateContext } from '../containers/StateContainer'
import Header from '../components/Header' 
import FileSet from '../components/FileSet'

/* import Footer from '../components/Footer' */


const ALL_FILES = gql`
  query AllFiles {
    allFiles {
      id
      size
      url
    }
  }
`

const SEARCH_FILES = gql`
  query SearchFiles($input: SearchFileInput!) {
    searchFiles(input: $input) {
      id
      size
      url
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


// There are likely better types from Apollo for these
type MutateHandlerDefault = (fileId: string) => void
type RefetchDefault = () => void


export const GraphQLContext = React.createContext<{
  handleDelete: MutationFunction | MutateHandlerDefault;
  refetch?: RefetchQueriesFunction | RefetchDefault; 
}>({
  handleDelete: (async () => null),
  refetch: () => null,
})

const App: React.FC = () => {

  const { state, stateActions } = useContext(StateContext)

  const [mutate] = useMutation(MUTATION)
  
  // All files
  const {
    loading: allLoading,
    error: allError,
    data: allData,
    refetch: allRefetch
  } = useQuery(
    ALL_FILES, {
      fetchPolicy: 'network-only'
    }
  )

  // Search
  const [search,
    {
      loading: searchLoading,
      error: searchError,
      data: searchData,
      refetch: searchRefetch
    }
  ] = useLazyQuery(SEARCH_FILES, {fetchPolicy: 'network-only'});

  interface SearchArguments {
    variables: {
      input: {
        search: string;
      }
    }
  }

  // The useLazyQuery query function `search` is currently not idempotentent due to bug in apollo
  const searchCallback = useCallback(( searchArgs: SearchArguments ) => {
      search(searchArgs)
  }, [search])

  // Search logic
  const searchActive = state.searchQuery.length > 0 ? true : false

  useEffect(() => {
    if (!state.searchQuery) {
      allRefetch()
    }
    if (searchActive) {
      searchCallback({ variables: { input: { search: state.searchQuery } }})
    } 
  }, [searchActive, state.searchQuery, searchCallback, allRefetch])

  const getQueryState = (searchActive: boolean) => {
    if (!searchActive) {
      return {
        loading: allLoading,
        error: allError,
        files: allData?.allFiles,
        refetch: allRefetch
      }
    } else {
      return {
        loading: searchLoading,
        error: searchError,
        files: searchData?.searchFiles ,
        refetch: searchRefetch
      }
    }
  }

  const { loading, error, files, refetch } = getQueryState(searchActive)
 
  useEffect(() => {
    computeFileStats(files, stateActions.setStats)
  }, [files, stateActions.setStats])
 
  const contextValue = useMemo(() => {
    return {
      handleDelete: (fileId: string) => {
        mutate({ variables: { input: { id: fileId }}})
      },
      refetch,
    }
  }, [mutate, refetch])

  return (
    <>
      <GraphQLContext.Provider value={contextValue}>
        <Header />
        <>
          {loading ? 
            ( <p></p> ) :
           error ?
            ( <p></p> ) :
            (<FileSet files={files} />)
          }
        </>
        {/* <Footer /> */}
      </GraphQLContext.Provider>
    </>
  )
} 

export default App
