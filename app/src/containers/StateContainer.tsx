import React, { useMemo, useReducer } from 'react'



interface StateInterface {
  searchQuery: string;
  fileCount: number | null;
  totalSize: number | null;
}

type Action = 
  | { type: 'SET_SEARCH', query: string } 
  | { type: 'CLEAR_SEARCH' } 
  | { type: 'SET_STATS', count: number, size: number }


interface ReducerInterface {
  (state: StateInterface, action: Action): StateInterface;
}

export interface StateActionsFunc {
  (...args: any[]): void
}

interface StateActions {
  handleClearSearch: StateActionsFunc;
  handleSetSearch: StateActionsFunc;
  setStats: StateActionsFunc;
}

export const initialState: StateInterface = {
  searchQuery: '',
  fileCount: null,
  totalSize: null,
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
          searchQuery: action.query
        }
      case 'CLEAR_SEARCH':
        return {
          ...state,
          searchQuery: '' 
        }
      case 'SET_STATS':
        return {
          ...state,
          fileCount: action.count,
          totalSize: action.size
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
      },
      setStats: (count: number, size: number) => {
        dispatch({type: 'SET_STATS', count, size})
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
