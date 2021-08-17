const getLocationItems = (query)=>{
  // if keyword exists create a text search filter
  const keyword  = query.keyword
    ? {
        locationName : {$regex:query.keyword,$options:'i'}
    }
    : {}
    
  const location = query.partner 
    ? {
        categories: {$all : query.partner.split(',')}
    } 
    :{}

  const internship = query.internship 
    ? {internship:true}
    : []
  const volunteer = query.volunteer
    ? {volunteer:true}
    : []

  return [{...keyword, ...location, ...internship,...volunteer}]
}

export default getLocationItems