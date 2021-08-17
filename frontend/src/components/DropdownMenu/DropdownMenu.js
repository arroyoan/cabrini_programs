import React, {useEffect} from 'react'
import styles from './DropdownMenu.module.css'
import {Link,useLocation} from 'react-router-dom'

const DropdownMenu = ({menuTitle, cats}) => {
  const location = useLocation();
  // let keyword,program,partner;
  let keyword,partner,internship,volunteer;
  // const queryParams = window.location.href.split('?')
  // console.log(queryParams);
  // if(queryParams.length > 1){
  //   console.log(queryParams[1].split('&'));
  // }
  // console.log(params);
  if(location.search){
    //console.log(location.search.replace('?','').split('&'))
    let [kW,pT,iT,vL] = location.search.replace('?','').split('&')
    keyword = kW.split('=')[1] || ''
    partner = pT.split('=')[1] || ''
    internship = iT.split('=')[1] || ''
    volunteer = vL.split('=')[1] || ''
    // let [kW,pG,pT] = location.search.replace('?','').split('&')
    // // console.log(kW)
    // // console.log(pG)
    // // console.log(pT)
    // // console.log()
    // keyword = kW.split('=')[1] || ''
    // program = pG.split('=')[1] || ''
    // partner = pT.split('=')[1] || ''
    // // console.log(keyword)
    // // console.log(program)
    // // console.log(partner)
    // // console.log()
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
              menuTitle === 'Partners' 
                ? <Link 
                    key={category._id} 
                    to={`/programs/maplist?keyword=${keyword ? keyword : ''}&partner=${category._id}&internship=${internship ? internship: ''}&volunteer=${volunteer ? volunteer : ''}`}>
                  <li>{category.categoryName}</li>
                </Link>
                : menuTitle === 'Internship'
                  ? <Link 
                    key={category._id} 
                    to={`/programs/maplist?keyword=${keyword ? keyword : ''}&partner=${partner ? partner : ''}&internship=${category.categoryName}&volunteer=${volunteer ? volunteer : ''}`}>
                    <li>{category.categoryName}</li>
                  </Link>
                  : <Link 
                    key={category._id} 
                    to={`/programs/maplist?keyword=${keyword ? keyword : ''}&partner=${partner ? partner : ''}&internship=${internship ? internship : ''}&volunteer=${category.categoryName}`}>
                    <li>{category.categoryName}</li>
                  </Link>
              
            )
          })}
        </ul>
    </div>
  )
}

export default DropdownMenu
