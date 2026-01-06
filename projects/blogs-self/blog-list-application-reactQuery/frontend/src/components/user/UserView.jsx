import '../../styles/table.css'
import '../../styles/general.css'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../../hooks/useUser'

const UserView = () => {
  const response = useGetUsersQuery()

  if (response.isPending) {
    return <div>...loading user data</div>
  }
  const users = response.data.filter(u => u.blogs.length >= 1)

  const headerValues = ["User", "Blogs Created"]
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            {headerValues.map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const blogCount = user.blogs.length
            console.log(`userId: ${user._id}`)
            return (
              <tr key={user._id}>
                <td><Link className="link" to={`/users/${user._id}`}>{user.name}</Link></td>
                <td className="blogCreated">{blogCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}

export default UserView
