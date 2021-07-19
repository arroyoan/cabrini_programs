import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styles from './SingleProgramScreen.module.css'

import {getSingleProgram}  from '../../actions/programActions'

const SingleProgramScreen = ({match}) => {
  const dispatch = useDispatch();
  
  const programId = match.params['programId']
  const singleProgram = useSelector(state => state.singleProgram)
  const {loading, error, program} = singleProgram

  useEffect(()=>{
    dispatch(getSingleProgram(programId))
  },[dispatch,programId])

  return (
    <div className={styles.singleProgram} >
      {loading && <h1>Loading...</h1> }
      {error && <h1>{error.message}</h1> }
      {(program !== undefined && program.programName) &&
        <div className={styles.programContent}>
          {console.log(program)}
          <div className={styles.aboutProgram}>
            <div className={styles.programName}>
              <h2>{program.programName}</h2>
            </div>
            {/* <div className="programAffil"></div> */}
            <div className={styles.programBlurb}> <p>{program.description.blurb}</p></div>
            <div className="programDetails">
              {/* this is a tempory div to show program mission */}
              {program.description.mission && <div>{program.description.mission}</div> }
              {program.description.services && <div>{program.description.services}</div> }
              {program.description.whoWeServed && <div>{program.description.whoWeServed}</div> }
            </div>
            {/* eventually add tags for program */}
          </div>
          <div className="programInfo">
            <div className="generalInfo">
              <h3>General Information</h3>
              {program.programEmail && <p>{program.programEmail}</p> }
              {program.programPhoneNumber && <p>{program.programPhoneNumber}</p>}
              {program.programWebsite&& <p>{program.programWebsite}</p>}
            </div>
            <div className="partnerInfo">
              <h3>Partnership Information</h3>
              {program.partnershipInfo.partnerName && <p>{program.partnershipInfo.partnerName}</p> }
              {program.partnershipInfo.partnerEmail && <p>{program.partnershipInfo.partnerEmail}</p> }
              {program.partnershipInfo.partnerPhone && <p>{program.partnershipInfo.partnerPhone}</p> }
              {program.partnershipInfo.partnerWebsite && <p>{program.partnershipInfo.partnerWebsite}</p> }
            </div>
            <div className="campusAffilInfo">
              <h3>Campus Affiliation</h3>
              {program.campusAffiliation.campusBranchName && <p>{program.campusAffiliation.campusBranchName}</p> }
              {program.campusAffiliation.campusBranchWebsite && <p>{program.campusAffiliation.campusBranchWebsite}</p> }
              {program.campusAffiliation.campusStreetAddress && <p>{program.campusAffiliation.campusStreetAddress}</p> }
            </div>
            <div className="programLocations"></div>
          </div>
        </div>
      }
    </div>
  )
}

export default SingleProgramScreen
