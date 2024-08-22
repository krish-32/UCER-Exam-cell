import React from 'react'
import './search.css'
import searchBtn from '../../../assets/Search.svg'

const Search = () => {
  return (
    <div className="date-selection">
      <div className="date-input" style={{backgroundColor : '#D9D9D9'}}>
        <input type="date" name="date" id="date" />
      </div>
      <div className="search">
        <img src={searchBtn} alt="search" />
      </div>
    </div>
  )
}

export default Search