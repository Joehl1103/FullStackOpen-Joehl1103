/*Promises are more powerful than callback because they are composable
It is not a value but the promise of a value.
 */

// Basic Promise
export default function loadImage(url){
    console.log("initializing the loadImage function")
    return new Promise((resolve,reject) => {
   
        let image = new Image()
        console.log("New image created",image.src)

        image.onload = function(){
            resolve(image)
        }

        image.onerror = function(){
            console.log("There is an error")
            let msg = 
                'Could not load image at ' + url
            reject(new Error(msg))
    
        }

        image.src = url
    })
}

