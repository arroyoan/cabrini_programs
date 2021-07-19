import React from 'react'

const ProgramContactCard = ({title, info}) => {

  return (
    <div>
      <h3>{title}</h3>
      {console.log(info)}
      {info.contact&& <p>{info.contact}</p> }
      {info.email&& <p>{info.email}</p> }
      {info.phoneNumber&& <p>{info.phoneNumber}</p> }
      {info.website&& <p>{info.website}</p> }
      {info.address&& <p>{info.address}</p> }
    </div>
  )
}

export default ProgramContactCard
