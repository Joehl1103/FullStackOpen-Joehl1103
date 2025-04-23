function outer(){
    let getY
    // declares a new block scope
    {
        const y = 6
        getY = () => y
    }
    console.log(typeof y) // returns undefined because y is not in scope
    console.log(getY()) // returns 6 because getY is in scope
}

outer()