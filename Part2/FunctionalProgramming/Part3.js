const orders = [
    {amount: 250},
    {amount: 400},
    {amount: 100},
    {amount: 325}
]

// let totalAmount = 0
// for (let i = 0;i<orders.length;i++){
//     totalAmount += orders[i].amount
// }

const totalAmount = orders.reduce((x,order)=>{
    console.log("hello",x,order)
    return x + order.amount
},0)

console.log(totalAmount)
