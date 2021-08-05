const filter = (programs,locationFilters) => {
  // checks if the locations filters is empty and returns all programs passed in
  if(locationFilters.length < 1)
    return programs

  const filterResults = []

  // iterates through programs
  for(let i = 0;i<programs.length;++i){
    let locations = programs[i].locations

    // iteratees throught programs location array
    for(let j = 0; j< locations.length;++j){
      let categories = locations[j].categories

      // this will determine if the rest of the locations for this programs should be skipped
      let skip = false

      // iterates through locations categories
      for(let k = 0;k < categories.length;++k){

        // checks if the category for this location is in the filter list, adds program to filteredResults if it is
        if(locationFilters.includes(String(categories[k]))){
          filterResults.push(programs[i])
          skip=true
          break;
        }
      }

      // if true then a program was added to the results array
      if(skip)
        break;
    }
  }

  return filterResults
}

export default filter