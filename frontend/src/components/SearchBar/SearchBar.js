import React, {useState} from 'react'
import styles from './SearchBar.module.css'
import {useLocation,useHistory} from 'react-router-dom'

const SearchBar = () => {
  // console.log('INSIDE OF SEACHBAR');
  const [input, setInput] = useState('')

  const location = useLocation();
  const history = useHistory()


  let keyword,program,partner;

  if(location.search){
    let [kW,pG,pT] = location.search.replace('?','').split('&')
    // console.log(kW)
    // console.log(pG)
    // console.log(pT)
    // console.log()
    keyword = kW.split('=')[1] || ''
    program = pG.split('=')[1] || ''
    partner = pT.split('=')[1] || ''
    // console.log(keyword)
    // console.log(program)
    // console.log(partner)
    // console.log()
  } 

  // helper functions for the form
  const submitSearch= (e)=>{
    e.preventDefault()
    // console.log('We submited');
    keyword = input
    // console.log(keyword ? keyword: '');
    // console.log(program ? program: '');
    // console.log(partner ? partner: '');
    setInput('')
    history.push(`/programs/maplist?keyword=${keyword}&program=${program ? program : ''}&partner=${partner ? partner : ''}`)

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
