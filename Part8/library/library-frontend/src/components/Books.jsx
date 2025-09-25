import { useQuery } from '@apollo/client/react'
import { GET_ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(GET_ALL_BOOKS)

  if (!props.show) {
    return null
  }
  console.log('result', result)
  if (!result.data) {
    return <div>...loading</div>
  }

  console.log('result.data', result.data)

  const books = result.data.allBooks
  if (!books) {
    return <div>...books are undefined</div>
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
