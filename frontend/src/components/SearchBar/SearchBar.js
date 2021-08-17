import React, {useState} from 'react'
import styles from './SearchBar.module.css'
import {useLocation,useHistory} from 'react-router-dom'

const SearchBar = () => {
  const [input, setInput] = useState('')

  const location = useLocation();
  const history = useHistory()


  // let keyword,program,partner;

  // if(location.search){
  //   let [kW,pG,pT] = location.search.replace('?','').split('&')
  //   keyword = kW.split('=')[1] || ''
  //   program = pG.split('=')[1] || ''
  //   partner = pT.split('=')[1] || ''
  // } 

  let keyword,partner,internship,volunteer;

  if(location.search){
    let [kW,pT,iT,vL] = location.search.replace('?','').split('&')
    keyword = kW.split('=')[1] || ''
    partner = pT.split('=')[1] || ''
    internship = iT.split('=')[1] || ''
    volunteer = vL.split('=')[1] || ''
  } 

  // helper functions for the form
  const submitSearch= (e)=>{
    e.preventDefault()
    keyword = input
    setInput('')
    history.push(`/programs/maplist?keyword=${keyword}&partner=${partner ? partner : ''}&internship=${internship ? internship : ''}&volunteer=${volunteer ? volunteer : ''}`)

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
