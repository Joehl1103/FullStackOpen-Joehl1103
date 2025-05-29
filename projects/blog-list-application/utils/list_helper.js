const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    let sum = 0;
    const likesArray = blogs.map(blog => blog.likes)
    if(likesArray.length === 1){
        return sum = likesArray[0]
    }
    function sumReducer(sum,item){
        return sum + item
    }
    return sum = likesArray.reduce(sumReducer,sum)
}

module.exports = {
    dummy,
    totalLikes
}