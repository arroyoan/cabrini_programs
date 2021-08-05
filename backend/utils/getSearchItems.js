const getSearchItems = (query)=>{
  // if keyword exists create a text search filter
  const keyword  = query.keyword
    ? {
        $text: {
          $search: query.keyword
        }
    }
    : {}
    
  const program = query.program 
    ? {
        categories: query.program.split(',')
    } 
    :{}

  const location = query.partner 
    ? query.partner.split(',')
    : []

  return [{...keyword, ...program},[...location]]
}

export default getSearchItems