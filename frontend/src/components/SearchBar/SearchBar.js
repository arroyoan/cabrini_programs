import React, {useState} from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const [input, setInput] = useState('')

  // helper functions for the form
  const submitSearch= (e)=>{
    e.preventDefault()
    console.log('We submited');
    console.log(input);
  }
  
  return (
    
    <div className={styles.searchbar} >
      <form onSubmit={(e)=>submitSearch(e)}>
        <input 
          placeholder="Search By Keyword..." 
          type="text" 
          value={input} 
          onChange={(e)=>setInput(e.target.value)} />
          <button className={styles.icon}>
            <span>
              <i className="fas fa-search"></i>
            </span>
          </button>
        </form>
    </div>
  )
}

export default SearchBar
