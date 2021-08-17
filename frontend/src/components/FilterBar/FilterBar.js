import React from 'react'
import {useLocation} from 'react-router-dom'
import styles from './FilterBar.module.css'
import {useSelector} from 'react-redux'

import FilterItem from '../FilterItem/FilterItem'

const CurrentFilters = () => {
  let location = useLocation()

  // gets categories from the state 
  const categoryList = useSelector(state => state.categoryList)
  const {categories} = categoryList

  // variables for the function
  let query = location.search

  let showFilters = false

  let filters;

  const currFilters = {}

  const cats = {}

  // create a dictionary of cats where key is the catId and the val is category name
  if(categories){
    categories.forEach(category=>{
      cats[category._id] = category.categoryName
    })
  }

  // checks for the existance of any filters
  if(query !== ""){
    showFilters= true
    filters = query.replace('?','').split("&")
    // creates a dictionary where key is the filterType and the filter itself
    filters.forEach(filter =>{
      filter=filter.split('=')
      currFilters[filter[0]] = filter[1] 
    })
  }
  
  return (
    <>
      {showFilters 
        ? 
        <div className={styles.content}>
          <div className={styles.filters}>
            {currFilters['keyword'] !== "" && <FilterItem filters = {currFilters} filterName='Keyword' filterContent={ currFilters['keyword']} />}
            {/* {currFilters['program'] !== "" && <FilterItem filters = {currFilters} filterName='Program' filterContent={cats[currFilters['program']]}/>} */}
            {currFilters['partner'] !== "" && <FilterItem filters = {currFilters} filterName='Partner' filterContent={cats[currFilters['partner']]}/>}
            {currFilters['internship'] !== "" && <FilterItem filters = {currFilters} filterName='Internship' filterContent={currFilters['internship']}/>}
            {currFilters['volunteer'] !== "" && <FilterItem filters = {currFilters} filterName='Volunteer' filterContent={currFilters['volunteer']}/>}

          </div> 
        </div>
        : <div className=""></div> }
      
    </>
  )
}

export default CurrentFilters
