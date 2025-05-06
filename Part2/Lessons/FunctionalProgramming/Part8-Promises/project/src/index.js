import loadImage from "./loadImage.js";

// takes an image url as input
let addImg = (src) => {
    // create an image element
    let imgElement =
        document.createElement('img')
    // access the image's src property and assign the input url value to it
    imgElement.src = src    
    // append the image element to the document body
    document.body.appendChild(imgElement)
}
Promise.all([
    loadImage('/cat1.jpg'),
    loadImage('/cat2.jpg')
]).then((images) => {
    console.log(images)
    images.forEach(img => addImg(img.src))
}).catch((error) => {
    console.log("error")
})