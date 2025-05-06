// Recursion: when a function calls itself until it doesn't
// you can always use a loop when doing recursion

let countDownFrom = (num) => {
    if(num=== 0) return
    console.log(num)
    countDownFrom(num-1)
    
}

countDownFrom(10)

