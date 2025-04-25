import fs from 'fs'

const output = fs.readFileSync('data.txt','utf8')
    .trim()
    .split('\n')
    .map(line => line.replace(/\r/g,''))
    .map(line => line.split('\t'))
    .reduce((customers,line)=>{
        // customers is an object; for each item in the object (name is line[0]) assign a blank array as the value
        // or, if the array with that customer name already exists, keep it and push a new object to it
        customers[line[0]] = customers[line[0]] || []
        customers[line[0]].push({
            name: line[1],
            price: line[2],
            quantity: line[3]
        })
        return customers
    },{})

console.log('output',JSON.stringify(output,null,2))