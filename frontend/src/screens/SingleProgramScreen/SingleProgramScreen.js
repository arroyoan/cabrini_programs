import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styles from './SingleProgramScreen.module.css'

import ProgramDetailCard from '../../components/ProgramDetailCard/ProgramDetailCard'
import ProgramContactCard from '../../components/ProgramContactCard/ProgramContactCard'
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
          <div className={styles.aboutProgram}>
            <div className={styles.programName}>
              <h2>{program.programName}</h2>
            </div>
            {/* <div className="programAffil"></div> */}
            <div className={styles.programBlurb}> <p>{program.description.blurb}</p></div>
            <div className="programDetails">
              {/* this is a tempory div to show program mission */}
              {program.description.mission && <ProgramDetailCard title="Mission" content={program.description.mission}/> }
              {program.description.services && <ProgramDetailCard title="Services" content={program.description.services}/> }
              {program.description.whoWeServed && <ProgramDetailCard title="Who We Serve" content={program.description.whoWeServed}/> }
              
            </div>
            {/* eventually add tags for program */}
          </div>
          <div className="programInfo">
            <ProgramContactCard 
              title="General Information" 
              info={{
                email:program.programEmail,
                phoneNumber:program.programPhoneNumber,
                website:program.programWebsite
              }}/>

            <ProgramContactCard 
              title="Partnership Information" 
              info={{
                contact:program.partnershipInfo.partnerName,
                email:program.partnershipInfo.partnerEmail,
                phoneNumber:program.partnershipInfo.partnerPhone,
                website:program.partnershipInfo.partnerWebsite
              }}/>
              
            <ProgramContactCard 
              title="Partnership Information"
              info={{
                contact:program.campusAffiliation.campusBranchName,
                website:program.campusAffiliation.campusBranchWebsite,
                address:program.campusAffiliation.campusStreetAddress
              }}/>
            
            <div className="programLocations">
              
            </div>

          </div>
        </div>
      }
    </div>
  )
}

export default SingleProgramScreen
