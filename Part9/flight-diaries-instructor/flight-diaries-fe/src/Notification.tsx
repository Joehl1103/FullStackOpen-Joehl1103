import type { MessageType } from "./types";

function Notification({ message, type, setNotificationVisibility }: { message: string, type: MessageType | string, setNotificationVisibility: React.Dispatch<React.SetStateAction<boolean>> }) {
  const messageStyle = {
    color: type === 'Error' ? 'red' : 'green'
  }
  return (
    <div style={messageStyle}>
      <p>{message}</p>
      <button
        onClick={() => setNotificationVisibility(false)}
      >dismiss</button>
    </div >
  )
};

export default Notification;
