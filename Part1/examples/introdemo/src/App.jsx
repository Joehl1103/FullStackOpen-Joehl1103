// defines a component called App
const App = () => {
  const friends = [
    {name: 'Peter',age: 4},
    {name: 'Maya',age: 10}
  ]
  return (
    <>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </>
  )
}

// never remove this line of code
export default App