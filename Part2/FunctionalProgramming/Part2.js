const animals = [
    {name: "fluffykins",species:"rabbit"},
    {name: "Caro",species:"dog"},
    {name: "Hamilton",species:"dog"},
    {name: "Harold",species:"fish"},
    {name: "Ursula",species:"cat"},
    {name: "Jimmy",species:"fish"},
]
// const names = []
// for (let i = 0;i<animals.length;i++){
//     names.push(animals[i].name)
// }

const names = animals.map((x) => x.name )

console.log(names)