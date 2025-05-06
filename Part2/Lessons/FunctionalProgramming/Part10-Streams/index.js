/* a stream of things that you apply functions to
combo of arrays and promises

A way of modelling a flow of values that can arrive at any time.

common use case: processing a very large amount of data that cannot fit in memory
 read one row at a time
 attach a handler at the end of each stream

*/

const stupidNumberStream = {
    each: (callback) => {
        setTimeout(() => callback(1),1000)
        setTimeout(() => callback(2),2000)
        setTimeout(() => callback(3),3000)
    }
}

stupidNumberStream.each(console.log)
