import React, { useState } from 'react'
import type { SyntheticEvent } from 'react'

import style from './Search.module.scss'


const Search: React.FC = () => {
  const [value, setValue] = useState('');
  
  
  const handleSubmit = (e: SyntheticEvent) => {
    alert(`You submitted ${value}`)
    e.preventDefault();
  }
  
  const handleChange = (e: SyntheticEvent) => {
    // @ts-ignore
    setValue(e.target.value);
  }
  
  
  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <input
        className={style.searchInput}
        id='search'
        value={value}
        type='text'
        onChange={handleChange}
        placeholder='Search documents...'
      />
    </form>
  );
}

export default Search
