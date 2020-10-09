import React, { useMemo, useReducer } from 'react'





interface StateInterface {
  searchActive: boolean;
  searchQuery: string;
  searchFiles: any[];
  searchTotalSize: number | null;
  totalSize: number | null;
  files: any[];
}

type Action = 
  | { type: 'SET_SEARCH', query: string } 
  | { type: 'CLEAR_SEARCH' } 


interface ReducerInterface {
  (state: StateInterface, action: Action): StateInterface;
}

interface StateActionsFunc {
  (...args: any[]): void
}

interface StateActions {
  handleClearSearch: StateActionsFunc;
  handleSetSearch: StateActionsFunc;
}

const initialState: StateInterface = {
  searchActive: false,
  searchQuery: '',
  searchFiles: [],
  searchTotalSize: null,
  totalSize: null,
  files: [],
}

export const StateContext = React.createContext<{
  state: StateInterface;
  dispatch: React.Dispatch<any>;
  stateActions?: StateActions 
}>({
  state: initialState,
  dispatch: () => null,
  stateActions: undefined
})

const StateContainer: React.FC = ({ children }) => {


  const reducer: ReducerInterface = (state, action) => {
    switch (action.type) {
      case 'SET_SEARCH':
        return {
          ...state,
          searchActive: true,
          searchQuery: action.query
        }
      case 'CLEAR_SEARCH':
        return {
          ...state,
          searchActive: false,
          searchQuery: '' 
        }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const stateActions = useMemo(() => {
    return {
      handleSetSearch: (query: string) => {
        dispatch({type: 'SET_SEARCH', query})
      },
      handleClearSearch: () => {
        dispatch({type: 'CLEAR_SEARCH'})
      }
    }
  }, [dispatch])


  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      stateActions
    }
  }, [state, dispatch, stateActions])

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContainer
