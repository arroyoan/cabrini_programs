import React, {useEffect} from 'react'
import styles from './Filters.module.css'
import {useDispatch,useSelector} from 'react-redux'

import SearchBar from '../SearchBar/SearchBar'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import {
  getCategories
} from '../../actions/categoryActions'

const Filters = () => {
  const dispatch = useDispatch()

  let programCats = []
  let locationCats = []

  const categoryList = useSelector(state => state.categoryList)
  //eslint-disable-next-line
  const {loading, error, categories} = categoryList

  // retrieves the categories from the database
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  if(categories !== undefined && categories.length !== 0){
    categories.forEach(category => {
      if(category.categoryType === 'program')
        programCats.push(category)
      else if(category.categoryType === 'location')
        locationCats.push(category)
    });
  }

  return (
    <div className={styles.filters}>
      <SearchBar/>
      <DropdownMenu menuTitle={'Programs'} cats={programCats}/>
      <DropdownMenu menuTitle={'Partners'} cats={locationCats}/>
    </div>
  )
}

export default Filters
