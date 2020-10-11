import React, { useMemo, useReducer } from 'react'


interface StateInterface {
  searchQuery: string;
  fileCount: number;
  totalSize: number;
}

type Action = 
  | { type: 'SET_SEARCH', query: string } 
  | { type: 'CLEAR_SEARCH' } 
  | { type: 'SET_STATS', count: number, size: number }

interface ReducerInterface {
  (state: StateInterface, action: Action): StateInterface;
}

export type ClearSearchAction = () => void;
export type SetSearchAction = (query: string) => void;
export type SetStatsAction = (count: number, size: number) => void;

interface StateActions {
  handleClearSearch: ClearSearchAction;
  handleSetSearch: SetSearchAction;
  setStats: SetStatsAction;
}

export const initialState: StateInterface = {
  searchQuery: '',
  fileCount: 0,
  totalSize: 0,
}

export const StateContext = React.createContext<{
  state: StateInterface;
  dispatch: React.Dispatch<Action>;
  stateActions: StateActions 
}>({
  state: initialState,
  dispatch: () => null,
  stateActions: {
      handleSetSearch: () => null,
      handleClearSearch: () => null,
      setStats: () => null 
  }
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
