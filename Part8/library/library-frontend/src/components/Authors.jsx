import { useQuery } from '@apollo/client/react'
import { GET_ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm.jsx'

const Authors = (props) => {
  const result = useQuery(GET_ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (!result.data) {
    return <div>...loading</div>
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set author birth year</h3>
      <BirthYearForm />
    </div>
  )
}

export default Authors
