type Fish = { swim: () => void }

let salmon: Fish = { swim: () => console.log('swimming') }

console.log(salmon as Fish)
