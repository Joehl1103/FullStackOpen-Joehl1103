/**
 * Notes: I will need to display the date on which the comment what made using toLocaleDateString()
 */
import { useGetUserById } from "../../../hooks/useUser"
import { MinorContainerDiv } from "../../../styles/styledComponent"

const Comment = ({ comment }) => {
  const { content, date, likes, user } = comment
  const dateAsDate = new Date(date)
  const { data: userObject, isLoading, error } = useGetUserById(user)
  console.log('user Object in Comment', userObject)
  if (isLoading) {
    return <div>...loading</div>
  }

  if (error) {
    return <div>...an error occurred while loading the user</div>
  }

  const { username } = userObject
  console.log('username', username)
  return (
    <div>
      <MinorContainerDiv>
        <q>{content}</q>
        <div style={{fontSize: "13px",color: "gray"}}>
          <i>Added on: {dateAsDate.toLocaleDateString()} by {username}</i>
        </div>
        </MinorContainerDiv>
    </div >
  )
}


export default Comment
