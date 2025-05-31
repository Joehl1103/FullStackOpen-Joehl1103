import _ from 'lodash'

(async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    const characters = data.results
    useLodash(characters)
    // console.log('Characters',characters)

})()

// // _.keyBy => returns the objects with the property as the key
// function useLodash(data){
//     console.log(
//     _.keyBy(data,"_id")
// )
// }

// _.groupBy

// function useLodash(data){
//     const characters = _.groupBy(data,(character) => character.created)
//     console.log(Object.keys(characters))
// }

// _partition

// function useLodash(data){
//     const characters = _.partition(data,['origin.name','Earth (C-137)'])
//     console.log(characters)
// }

// _.uniqBy

// function useLodash(data){
//     const characters = _.uniqBy(data,'origin.name')
//     console.log(characters.length)
// }

// _.sortBy

function useLodash(data){
    const characters = _.sortBy(data,['name','id'])
    console.log(characters.map(({ id, name}) => ({id,name})))
}