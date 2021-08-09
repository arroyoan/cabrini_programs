import React, {useEffect} from 'react'
import styles from './DropdownMenu.module.css'
import {Link,useLocation} from 'react-router-dom'

const DropdownMenu = ({menuTitle, cats}) => {
  // console.log('INSIDE OF DROWPDOWNMENU');
  const location = useLocation();
  let keyword,program,partner;
  // const queryParams = window.location.href.split('?')
  // console.log(queryParams);
  // if(queryParams.length > 1){
  //   console.log(queryParams[1].split('&'));
  // }
  // console.log(params);
  if(location.search){
    //console.log(location.search.replace('?','').split('&'))
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

  useEffect(() => {

  }, [location])

  return (
    <div className={styles.dropdown}>
      {/* <div className={styles.dropdown__content}> */}
        <h2>{menuTitle}</h2>
        <ul className={styles.dropdown__items}>
          {cats.map(category=>{
            return ( 
              menuTitle === 'Programs' 
                ? <Link 
                    key={category._id} 
                    to={`/programs/maplist?keyword=${keyword ? keyword : ''}&program=${category._id}&partner=${partner ? partner : ''}`}>
                  <li>{category.categoryName}</li>
                  </Link>
                : <Link 
                    key={category._id} 
                    to={`/programs/maplist?keyword=${keyword ? keyword : ''}&program=${program ? program : ''}&partner=${category._id}`}>
                  <li>{category.categoryName}</li>
                  </Link>
              
            )
          })}
        </ul>
    </div>
  )
}

export default DropdownMenu
