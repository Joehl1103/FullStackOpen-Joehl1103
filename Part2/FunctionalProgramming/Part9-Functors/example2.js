/*Functors are objects that have a map method.

map is not the functor. The object that is implementing the map method is the functor.
Generic equivalent of an array having a map method.

Category theory is the subset of math that functors come from.

Map functions take the content of the functor and uses the callback passed to map
to transform it.

They are meant to be generic containers for anything.


*/
const dragons = [
    {name: 'Fluffykins',health:70},
    {name: 'Death Lord',health:6500},
    {name:'Little Pizza',health:2}
]

const nameLengths = dragons 
                        .map(dragon => dragon.name)
                        .map(dragonName => dragonName.length)

console.log(nameLengths)
