let categories = [
    {id: 'animals','parent':null},
    {id: 'mammals','parent':'animals'},
    {id: 'cats','parent':'mammals'},
    {id: 'dogs','parent':'mammals'},
    {id: 'chihuaha','parent':'dogs'},
    {id: 'labrador','parent':'dogs'},
    {id: 'persian','parent':'cats'},
    {id: 'siamese','parent':'cats'},
]

let makeTree = (categories,parent) => {
    console.log("Parent: ",parent)
    let node = {}
    let filteredCategory = categories
        .filter(c => c.parent === parent)
    console.log("Filtered category: ",filteredCategory)
    if(Array.isArray(filteredCategory) && filteredCategory.length === 0){
        node[parent] = null
    }
    filteredCategory.forEach(c => {
        console.log("c.id: ",c.id)
        node[c.id] = makeTree(categories,c.id)
        })
        
    
    return node

}

console.log(
    JSON.stringify(
    makeTree(categories,null)
    ,null,2)
)
/*}
{
    animals: {
        mammals: {
            dogs: {
                chihuaha: null,
                labradoe: null
            }
        }
    }
}*/