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

  const categoryList = useSelector(state => state.categoryList)
  //eslint-disable-next-line
  const {loading, error, categories} = categoryList

  // retrieves the categories from the database
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className={styles.filters}>
      <SearchBar/>
      <DropdownMenu/>
      <DropdownMenu/>
    </div>
  )
}

export default Filters
