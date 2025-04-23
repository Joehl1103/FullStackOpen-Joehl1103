const animals = [
    {name: "fluffykins",species:"rabbit"},
    {name: "Caro",species:"dog"},
    {name: "Hamilton",species:"dog"},
    {name: "Harold",species:"fish"},
    {name: "Ursula",species:"cat"},
    {name: "Jimmy",species:"fish"},
]

// const dogs = []
// for (let i = 0; i<animals.length;i++){
//     if(animals[i].species === "dog"){
//         dogs.push(animals[i])
//     }
// }

const isDog = function(animal){
    return animal.species === 'dog'
}

const dogs = animals.filter(isDog)

console.log(dogs)
console.log(otherAnimals)