import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
  const [search, setSearch] = useState('')

  

  return (
    <div className="search--bar__body">
      <div className="search--bar__container">
        <div className="search--bar__wrapper">
          <input type="text" className="search--bar__input" placeholder="Search" />
          <FontAwesomeIcon icon="magnifying-glass" className="search--bar__icon" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar