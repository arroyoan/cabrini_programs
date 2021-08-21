import React from 'react'
import styles from './FilterItem.module.css'
import { useHistory } from 'react-router'

const FilterItem = ({filters,filterName,filterContent}) => {
  let history =useHistory()

  const click = (e)=>{
    e.preventDefault() 
    let newUrl = ''

    if(filterName === 'Keyword')
      filters['keyword'] = ''

    // if(filterName === 'Inter')
    //   filters['program'] = ''

    if(filterName === 'Partner')
      filters['partner'] = ''

    if(filterName === 'Internship')
      filters['internship'] = ''

    if(filterName === 'Volunteer')
      filters['volunteer'] = ''

    if(filters['keyword'] ==='' && /*filters['program'] === '' &&*/ filters['partner'] === '' && filters['internship'] === '' && filters['volunteer'] === ''){
      history.push('/programs/maplist')
    } else{
      // newUrl = `/programs/maplist?keyword=${filters['keyword'] ? filters['keyword']:''}&program=${filters['program'] ? filters['program']:''}&partner=${filters['partner'] ? filters['partner']:''}`      
      newUrl = `/programs/maplist?keyword=${filters['keyword'] ? filters['keyword']:''}&partner=${filters['partner'] ? filters['partner']:''}&internship=${filters['internship'] ? filters['internship']:''}&volunteer=${filters['volunteer'] ? filters['volunteer']:''}`  
      history.push(newUrl)
    }
    
    
  }

  return (
    <div className={styles.filterItem}>
      {filterName}: {filterContent} <i className="fas fa-times" onClick={click}></i>
    </div>
  )
}

export default FilterItem
