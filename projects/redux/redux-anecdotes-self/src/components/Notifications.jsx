import { useDispatch, useSelector } from "react-redux"
const Notification = () => {
  const dispatch = useDispatch()
  const notificationValue = useSelector(state => state.notificationValue)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notificationValue === '') {
    return null
  }
  return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification
