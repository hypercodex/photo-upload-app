import React, { useContext } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'

import { StateContext } from '../containers/StateContainer'

import style from './Search.module.scss'


const Search: React.FC = () => {
  const { state, stateActions } = useContext(StateContext)

  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    stateActions.handleSetSearch(e.target.value)
  }

  const handleEscKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      stateActions.handleClearSearch()
    }
  }
  
  return (
    <form 
      className={style.searchForm}
      onSubmit={handleSubmit}
    >
      <input
        className={style.searchInput}
        id='search'
        value={state.searchQuery}
        type='text'
        onChange={handleChange}
        onKeyDown={handleEscKey}
        placeholder='Search documents...'
      />
    </form>
  );
}

export default Search
