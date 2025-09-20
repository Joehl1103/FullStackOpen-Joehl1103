const args = {
  author: 'some author',
  genre: 'some genre'
}

function main(){
  console.log('running main function')
  const isEmpty = Object.keys(args).length === 0
  switch (true){
    case isEmpty:
      console.log('nothing in args')
    break
    case "author" in args && !("genre" in args):
      console.log('there is an author')
    break
    case "author" in args && "genre" in args:
      console.log('there is an author and a genre in args')
      break
    default:
      console.log('default hit')
      return null
  }
}

main()
