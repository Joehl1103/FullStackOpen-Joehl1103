const counter = (function(){
    let privateCounter = 0
    function changeBy(val){
        privateCounter += val
    }
    
    return {
        increment(){
            changeBy(1)
        },
        decrement(){
            changeBy(-1)
        },
        getValue(){
            return privateCounter
        }
    }
})() // IIFE; anonymous function run as soon as it is declaret aka initialized

console.log('Get initial value: ', counter.getValue())

counter.increment()
counter.increment()
console.log('Get value after 2 increments: ',counter.getValue())

counter.decrement()
console.log('Get value after 1 decrement: ', counter.getValue())