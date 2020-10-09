import React, { useContext } from 'react'
import type { SyntheticEvent } from 'react'

import { StateContext } from '../containers/StateContainer'

import style from './Search.module.scss'


const Search: React.FC = () => {
  const { state, stateActions } = useContext(StateContext)
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  }
  
  const handleChange = (e: SyntheticEvent) => {
    // @ts-ignore
    stateActions?.handleSetSearch(e.target.value)
  }
  
  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <input
        className={style.searchInput}
        id='search'
        value={state.searchQuery}
        type='text'
        onChange={handleChange}
        placeholder='Search documents...'
      />
    </form>
  );
}

export default Search
