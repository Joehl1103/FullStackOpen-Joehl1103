function add(getX, getY,cb){
    const x,y;
    getX(function(xVal){
        x = xVal;
        if (y != undefined){
            cb(x + y);
        }
    });
    getY(function(yVal){
        y = yVal;
        if(x != undefined){
            cb(x+y)
        }
    });

}

add(fetchX,fetchY,function(sum){
    console.log(sum)
})
